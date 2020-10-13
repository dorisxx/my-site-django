from django.utils.text import slugify
import random
import string


def get_user_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR", None)
    return ip


def random_str_generator(size=5, chars=string.ascii_lowercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, slug_text=None):
    if slug_text is not None:
        slug = slug_text
    else:
        slug = instance.title.replace(" ", "-")

    # Klass = instance.__class__
    # check_exists = Klass.objects.filter(slug=slug).exists()
    # if check_exists:
    #     new_slug = "{slug}-{randstr}".format(
    #         slug=slug, randstr=random_str_generator()
    #     )
    #     return unique_slug_generator(instance, slug_text=new_slug)
    return slug
