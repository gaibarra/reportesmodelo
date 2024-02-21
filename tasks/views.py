from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task, Empleado
from django.shortcuts import render

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

