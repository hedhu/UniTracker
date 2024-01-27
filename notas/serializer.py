from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Asignatura, Nota, FechaImportante, Usuario

class UsuarioRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('__all__')
    
    def create(self, clean_data):
        usuario_obj = Usuario.objects.create_user(username=clean_data['username'], email=clean_data['email'],
            password=clean_data['password'])
        usuario_obj .save()
        return usuario_obj

class UsuarioLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    class Meta:
        model = Usuario
        fields = ('username', 'password')
    
    def check_user(self, clean_data):
        usuario = authenticate(username=clean_data['username'], password=clean_data['password'])
        
        if not usuario:
            raise ValidationError('Usuario no encontrado')
        return usuario
       
class UsuarioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Usuario
		fields = ('username', 'email')
 
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