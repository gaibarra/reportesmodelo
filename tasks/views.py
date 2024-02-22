from rest_framework import viewsets
from .serializer import TaskSerializer, EmpleadoSerializer
from .models import Task, Empleado
from django.shortcuts import render

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class EmpleadoView(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer