# Generated by Django 2.2.4 on 2019-12-13 02:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20191004_0017'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='randompost',
            options={'ordering': ('-created',)},
        ),
    ]
