# Generated by Django 5.0.2 on 2024-03-08 17:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evento',
            name='empleado',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='eventos', to='tasks.empleado'),
        ),
    ]