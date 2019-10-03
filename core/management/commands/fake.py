from faker import Faker
from django.core.management.base import BaseCommand, CommandError
from core.models import Post, Comment, Tag, RandomPost
from random import randint
import time


fake = Faker()


def create_fake_comments(number=10):
    Comment.objects.all().delete()
    for i in range(number):
        instance = Comment(
            name=fake.name(),
            email=fake.email(),
            content=fake.text()
        )
        instance.save()


def create_fake_tags(number=10):
    Tag.objects.all().delete()
    for i in range(number):
        instance = Tag(name=fake.name())
        instance.save()


def create_fake_random_posts(number=10):
    RandomPost.objects.all().delete()
    for i in range(number):
        instance = RandomPost(body=fake.sentence(), active=True, public=True)
        instance.save()
        time.sleep(2)
        print("random post %s added" % i)


def get_random_comments(number=1):
    id_list = Comment.objects.values_list('id', flat=True)
    obj_list = []
    for i in range(number):
        if len(id_list) != 0:
            random_index = randint(0, len(id_list)-1)
            obj_list.append(id_list[random_index])
    return obj_list


def get_random_tags(number=1):
    id_list = Tag.objects.values_list('id', flat=True)
    obj_list = []
    for i in range(number):
        if len(id_list) != 0:
            random_index = randint(0, len(id_list)-1)
            obj_list.append(id_list[random_index])
    return obj_list


def create_fake_posts(number=10):
    Post.objects.all().delete()
    for i in range(number):
        instance = Post(title=fake.sentence(),
                        abstract=fake.text(),
                        body=fake.text(),
                        public=True)
        instance.save()
        instance.comments.set(get_random_comments(i))
        instance.tags.set(get_random_tags(i))
        time.sleep(2)
        print("post %s added" % i)


class Command(BaseCommand):
    help = 'Generate fake data'

    def add_arguments(self, parser):
        parser.add_argument('comments', type=int,
                            help='the number of fake comments')
        parser.add_argument('tags', type=int, help='the number of fake tags')
        parser.add_argument('posts', type=int, help='the number of fake posts')
        parser.add_argument('random', type=int,
                            help='the number of fake random posts')

    def handle(self, *args, **kwargs):
        comments = kwargs['comments']
        tags = kwargs['tags']
        posts = kwargs['posts']
        random = kwargs['random']

        create_fake_comments(comments)
        self.stdout.write("comments added")
        create_fake_random_posts(random)
        self.stdout.write("random posts added")
        create_fake_tags(tags)
        self.stdout.write("tags added")
        create_fake_posts(posts)
        self.stdout.write("posts added")
