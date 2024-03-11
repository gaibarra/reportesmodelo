from rest_framework.response import Response
from rest_framework import viewsets
from .serializer import TaskSerializer, EmpleadoSerializer, EventoSerializer

from rest_framework.decorators import api_view

from .models import Task, Empleado, Evento
from django.shortcuts import render

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class EmpleadoView(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EventoView(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer  
    
    
@api_view(['GET'])
def task_events(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)

    events = task.events.all()  # Asegúrate de que tu modelo Task tiene una relación con un modelo Event
    serializer = EventoSerializer(events, many=True)  # Asegúrate de tener un serializer para tu modelo Event

    return Response(serializer.data)   