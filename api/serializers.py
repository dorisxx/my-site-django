from rest_framework import serializers

from core.models import Quote, Post, Comment, Tag, RandomPost


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('id', 'author', 'body')
        read_only_fields = ('id',)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'email': {'write_only': True}
        }
        read_only_fields = ('id',)


class RandomPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomPost
        fields = ('created', 'body', 'public', 'active', 'id')


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Comment.objects.all()
    )
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        exclude = ['body']
        read_only_fields = ('id',)


class PostDetailSerializer(PostSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'body', 'created', 'updated',
                  'public', 'active', 'comments', 'tags')
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)


class PostDetailEditSerializer(PostSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Tag.objects.all(), source='tags')
    comments = None
    tags = TagSerializer(many=True, read_only=True)


class OtherPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'updated', 'body')
