from rest_framework import serializers
from .models import Asignatura, Nota, FechaImportante

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = ('__all__')
        
class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = ('__all__')

class FechaImportanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FechaImportante
        fields = ('__all__')