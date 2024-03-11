from rest_framework import serializers
from .models import Task, Empleado, Evento

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        #fields = ('id', 'title', 'description',  'done')
        fields = '__all__'
        
        
class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'      
        

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['id', 'descripcion', 'fecha', 'reporte', 'empleado']

    def create(self, validated_data):
        empleado = validated_data.pop('empleado')
        if not isinstance(empleado, Empleado):
           raise serializers.ValidationError("empleado must be an Empleado instance.")
        return Evento.objects.create(empleado=empleado, **validated_data)