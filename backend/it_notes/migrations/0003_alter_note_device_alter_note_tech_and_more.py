# Generated by Django 5.1.4 on 2025-01-17 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('it_notes', '0002_alter_note_device_alter_note_tech_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='device',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='tech',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='ticket_number',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='user',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]