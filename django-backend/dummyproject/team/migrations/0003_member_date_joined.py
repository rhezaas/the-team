# Generated by Django 5.0.6 on 2024-07-09 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_member_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='date_joined',
            field=models.DateField(blank=True, null=True),
        ),
    ]