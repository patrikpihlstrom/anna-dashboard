# Generated by Django 2.0.2 on 2019-02-22 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_auto_20190222_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='job_id',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
