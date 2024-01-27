from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import AsignaturaSerializer, NotaSerializer, FechaImportanteSerializer, UsuarioRegisterSerializer, UsuarioLoginSerializer, UsuarioSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password, validate_username
from .models import Asignatura, Nota, FechaImportante

# Create your views here.
class UsuarioRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UsuarioRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            usuario = serializer.create(clean_data)
            if usuario:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UsuarioLogin(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    
    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UsuarioLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            usuario = serializer.check_user(data)
            login(request, usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UsuarioLogout(APIView):
    def post(self, request):                                                                                                                                                            
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UsuarioView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		serializer = UsuarioSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class AsignaturaView(viewsets.ModelViewSet):
    serializer_class = AsignaturaSerializer
    queryset = Asignatura.objects.all()
    
class NotaView(viewsets.ModelViewSet):
    serializer_class = NotaSerializer
    queryset = Nota.objects.all()
    
class FechaImportanteView(viewsets.ModelViewSet):
    serializer_class = FechaImportanteSerializer
    queryset = FechaImportante.objects.all()
