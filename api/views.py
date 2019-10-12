from rest_framework import viewsets, mixins, status, generics, authentication, permissions
from django.conf import settings
from rest_framework.decorators import action
from core.models import Quote, Tag, Comment, Post, RandomPost
from api import serializers
from api import auth_serializers
from rest_framework.authtoken.views import ObtainAuthToken
from random import randint
from rest_framework.settings import api_settings
from rest_framework.response import Response

POSTS_PER_PAGE = settings.POSTS_PER_PAGE


class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.filter(active=True)
    serializer_class = serializers.QuoteSerializer

    def get_queryset(self):
        queryset = self.queryset
        id_list = queryset.values_list('id', flat=True)

        if len(id_list) != 0:
            random_index = randint(0, len(id_list)-1)
            return queryset.filter(id=id_list[random_index])
        return None


class BasePostViewSet(viewsets.GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin):
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )


class RandomPostViewSet(BasePostViewSet):
    queryset = RandomPost.objects.all()
    serializer_class = serializers.RandomPostSerializer
    num_posts = None

    def get_posts(self):
        page_num = self.request.query_params.get('page', "1")
        queryset = self.queryset
        if self.request.user.is_authenticated:
            queryset = self.queryset
        else:
            queryset = self.queryset.filter(active=True, public=True)
        num_posts = queryset.count()
        self.num_posts = num_posts
        if page_num.isdigit():
            if (int(page_num)-1)*POSTS_PER_PAGE < num_posts:
                page_num = int(page_num)-1
        else:
            page_num = 0
        start_index = int(page_num)*POSTS_PER_PAGE
        end_index = start_index+POSTS_PER_PAGE
        queryset = queryset.order_by(
            '-created')[start_index: end_index]
        return queryset

    def list(self, request, pk=None):
        _to_be_serialized = self.get_posts()
        num_posts = self.num_posts
        pages = (int(num_posts / 5) +
                 1 if int(num_posts) % 5 else int(num_posts/5))
        serializer = self.get_serializer(_to_be_serialized, many=True)
        result_set = serializer.data
        result_set.append({'pages': pages})
        return Response(result_set)

    def delete(self, request, pk):
        instance = self.get_object()
        if instance:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, pk):
        instance = self.get_object()
        if instance:
            serializer = self.get_serializer(
                instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class TagViewSet(BasePostViewSet):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)


class CommentViewSet(BasePostViewSet):
    serializer_class = serializers.CommentSerializer
    permission_classes = (permissions.BasePermission,)
    queryset = Comment.objects.all().order_by('-created')


class PostViewSet(BasePostViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    lookup_field = 'slug'
    num_posts = None

    def get_posts(self):
        page_num = self.request.query_params.get('page', "1")
        queryset = self.queryset
        if not self.request.user.is_authenticated:
            queryset = Post.objects.get_blog()
        else:
            queryset = Post.objects.get_all_blog()
        num_posts = queryset.count()
        self.num_posts = num_posts
        if page_num.isdigit():
            if (int(page_num)-1)*POSTS_PER_PAGE < num_posts:
                page_num = int(page_num)-1
        else:
            page_num = 0
        start_index = page_num*POSTS_PER_PAGE
        end_index = start_index+POSTS_PER_PAGE
        queryset = queryset.order_by(
            '-created')[start_index: end_index]
        return queryset

    def list(self, request, pk=None):
        is_about = self.request.query_params.get('about', False)
        is_now = self.request.query_params.get('now', False)
        _to_be_serialized = None
        if is_about:
            _to_be_serialized = Post.objects.get_about()
            many = False
        elif is_now:
            _to_be_serialized = Post.objects.get_now()
            many = False
        else:
            _to_be_serialized = self.get_posts()
            num_posts = self.num_posts
            pages = (int(num_posts / 5) +
                     1 if int(num_posts) % 5 else int(num_posts/5))
            many = True
        serializer = self.get_serializer(_to_be_serialized, many=many)
        result_set = serializer.data
        if many:
            result_set.append({'pages': pages})
        return Response(result_set)

    def delete(self, request, slug):
        instance = self.get_object()
        if instance:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_serializer_class(self):
        edit = self.request.query_params.get('edit', False)
        update = self.request.query_params.get('update', False)
        if self.action == 'retrieve' or self.action == 'create':
            if edit:
                return serializers.PostDetailEditSerializer
            return serializers.PostDetailSerializer
        if edit and update:
            return serializers.PostDetailEditSerializer
        return self.serializer_class

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, slug):
        instance = self.get_object()
        if instance:
            serializer = self.get_serializer(
                instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

########## Authentication Views ##########


class CreateTokenView(ObtainAuthToken):
    serializer_class = auth_serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = auth_serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
