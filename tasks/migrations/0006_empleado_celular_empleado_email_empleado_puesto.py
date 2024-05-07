# Generated by Django 5.0.1 on 2024-04-25 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0005_alter_empleado_nombre_empleado'),
    ]

    operations = [
        migrations.AddField(
            model_name='empleado',
            name='celular',
            field=models.CharField(default='0000000000', max_length=10),
        ),
        migrations.AddField(
            model_name='empleado',
            name='email',
            field=models.EmailField(default='email@ejemplo.com', max_length=50),
        ),
        migrations.AddField(
            model_name='empleado',
            name='puesto',
            field=models.CharField(default='puesto', max_length=50),
        ),
    ]