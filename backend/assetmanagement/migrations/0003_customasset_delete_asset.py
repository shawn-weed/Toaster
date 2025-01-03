# Generated by Django 5.1.4 on 2024-12-23 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assetmanagement', '0002_asset_delete_chromebook'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomAsset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asset_type', models.CharField(max_length=120)),
                ('identifying_number', models.CharField(max_length=40)),
                ('custom_fields', models.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name='Asset',
        ),
    ]
