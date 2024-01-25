from rest_framework import viewsets
from .serializer import AsignaturaSerializer, NotaSerializer, FechaImportanteSerializer
from .models import Asignatura, Nota, FechaImportante

# Create your views here.
class AsignaturaView(viewsets.ModelViewSet):
    serializer_class = AsignaturaSerializer
    queryset = Asignatura.objects.all()
    
class NotaView(viewsets.ModelViewSet):
    serializer_class = NotaSerializer
    queryset = Nota.objects.all()
    
class FechaImportanteView(viewsets.ModelViewSet):
    serializer_class = FechaImportanteSerializer
    queryset = FechaImportante.objects.all()
