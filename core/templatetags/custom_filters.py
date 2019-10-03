from django import template
from django.conf import settings
from django.contrib.staticfiles import storage

register = template.Library()


@register.inclusion_tag('_enable_hmr.html')
def load_hmr_js(path):
    return {
        'hmr_path': path.replace('.min.js', '.js'),
        'staticfiles_path': storage.staticfiles_storage.url(path),
        'is_debug': settings.DEBUG
    }