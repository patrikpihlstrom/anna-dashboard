# Generated by Django 2.0.2 on 2019-02-22 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='job_id',
            field=models.IntegerField(default=0),
        ),
    ]
