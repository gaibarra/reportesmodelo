from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks import views
from .views import EmpleadoView

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskView, "tasks")
router.register('empleado', EmpleadoView, basename='empleado')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),
]
