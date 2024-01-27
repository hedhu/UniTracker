from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from . import views 
 
# api versioning
router = routers.DefaultRouter()
router.register(r'asignaturas', views.AsignaturaView, 'asignaturas')
router.register(r'notas', views.NotaView, 'notas')
router.register(r'fechas', views.FechaImportanteView, 'fechas')
 
urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', views.UsuarioRegister.as_view(), name='register'),
    path('login/', views.UsuarioLogin.as_view(), name='login'),
    path('logout/', views.UsuarioLogout.as_view(), name='logout'),
    path('user/', views.UsuarioView.as_view(), name='user'),
    path('docs/', include_docs_urls(title = 'UniTracker API')),
]
