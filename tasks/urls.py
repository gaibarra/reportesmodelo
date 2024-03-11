from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks import views
from .views import EmpleadoView, EventoView  # Asegúrate de tener una vista llamada EventosView en tu archivo views.py

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskView, "tasks")
router.register('empleados', EmpleadoView, basename='empleado')
router.register('tasks/(?P<taskId>\d+)/eventos', EventoView, basename='eventos')  # Nueva ruta para eventos

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),
    path('tasks/api/v1/tasks/<int:task_id>/events', views.task_events, name='task_events'),
    

]