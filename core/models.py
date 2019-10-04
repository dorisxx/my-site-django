from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings
from django.db.models.signals import pre_save
from core.utils import unique_slug_generator


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Quote(models.Model):
    author = models.CharField(max_length=255)
    body = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.author


class PostManager(models.Manager):
    def get_about(self):
        about_page = self.model.objects.filter(active=True, is_about=True)
        if about_page.count() > 0:
            return about_page.first()
        return None

    def get_now(self):
        now_page = self.model.objects.filter(active=True, is_now=True)
        if now_page.count() > 0:
            return now_page.first()
        return None

    def get_blog(self):
        blogs = self.model.objects.filter(
            active=True, public=True, is_about=False, is_now=False)
        return blogs

    def get_all_blog(self):
        blogs = self.model.objects.filter(is_about=False, is_now=False)
        return blogs


class Post(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(blank=True, unique=True)
    abstract = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    body = models.TextField(blank=True, null=True)
    public = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    tags = models.ManyToManyField(Tag, blank=True)
    is_about = models.BooleanField(default=False)
    is_now = models.BooleanField(default=False)

    objects = PostManager()

    def __str__(self):
        return self.title


def post_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)
    if instance.slug != unique_slug_generator(instance):
        instance.slug = unique_slug_generator(instance)


pre_save.connect(post_pre_save_receiver, sender=Post)


class Comment(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    content = models.TextField(null=True)
    active = models.BooleanField(default=True)
    post = models.ForeignKey(
        Post, on_delete=models.PROTECT, related_name='comments', default=152)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.name


class RandomPost(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    body = models.TextField(blank=True, null=True)
    public = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ('-created')

    def __str__(self):
        return self.title
