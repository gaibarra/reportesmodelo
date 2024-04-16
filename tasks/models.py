from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_resolucion = models.DateTimeField(default=None)
    foto_inicial = models.ImageField(upload_to="fotos/", null=True, blank=True)
    foto_final = models.ImageField(upload_to="fotos/", null=True, blank=True)
    reportado_por = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="reportes_creados"
    )
    resuelto_por = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reportes_resueltos",
    )
    campus = models.CharField(
        max_length=100, default="Montejo"
    )  # Puedes cambiar esto por un modelo Campus si necesitas mÃ¡s detalles del campus

    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Empleado(models.Model):
<<<<<<< HEAD
    nombre_empleado = models.CharField(max_length=30, default=None)
=======
    nombre_empleado = models.CharField(max_length=50, default=None)
>>>>>>> a8b3cde (160424)
    campus = models.CharField(max_length=30, default=None)

    def __str__(self):
        return self.nombre_empleado  

class Evento(models.Model):
    descripcion = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    reporte = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='eventos')
    empleado = models.ForeignKey(Empleado, on_delete=models.PROTECT, related_name='eventos')
    def __str__(self):
        return self.descripcion