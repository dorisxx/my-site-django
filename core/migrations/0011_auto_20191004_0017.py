# Generated by Django 2.2.4 on 2019-10-04 00:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20191002_2344'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='author',
        ),
        migrations.RemoveField(
            model_name='randompost',
            name='author',
        ),
    ]