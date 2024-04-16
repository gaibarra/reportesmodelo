# Generated by Django 5.0.2 on 2024-03-07 19:17

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_empleado', models.CharField(default=None, max_length=30)),
                ('campus', models.CharField(default=None, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('fecha_creacion', models.DateTimeField(default=django.utils.timezone.now)),
                ('fecha_resolucion', models.DateTimeField(blank=True, null=True)),
                ('foto_inicial', models.ImageField(blank=True, null=True, upload_to='fotos/')),
                ('foto_final', models.ImageField(blank=True, null=True, upload_to='fotos/')),
                ('campus', models.CharField(default='Montejo', max_length=100)),
                ('done', models.BooleanField(default=False)),
                ('reportado_por', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reportes_creados', to=settings.AUTH_USER_MODEL)),
                ('resuelto_por', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reportes_resueltos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.TextField()),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('empleado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='eventos', to='tasks.empleado')),
                ('reporte', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='eventos', to='tasks.task')),
            ],
        ),
    ]