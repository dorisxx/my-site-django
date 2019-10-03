from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register('quote', views.QuoteViewSet)
router.register('posts', views.PostViewSet)
router.register('tags', views.TagViewSet)
router.register('comments', views.CommentViewSet)
router.register('random', views.RandomPostViewSet)

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
    path('portkey', views.ManageUserView.as_view(), name='login'),
    path('portus', views.CreateTokenView.as_view(), name='create-token')
]
