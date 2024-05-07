# Generated by Django 5.0.1 on 2024-04-25 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0006_empleado_celular_empleado_email_empleado_puesto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empleado',
            name='celular',
            field=models.CharField(default='', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='empleado',
            name='email',
            field=models.EmailField(default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='empleado',
            name='puesto',
            field=models.CharField(default='', max_length=50, null=True),
        ),
    ]
