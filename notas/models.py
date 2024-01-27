from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
class Usuario(AbstractUser):
    email = models.EmailField(unique=True, default=None)
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    def __str__(self):
        return self.username
    
    def asignaturas(self):
        return Asignatura.objects.filter(usuario=self)
    
class Asignatura(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    usuario = models.ForeignKey(get_user_model() , on_delete=models.CASCADE, default=None)
    
    def __str__(self):
        return self.nombre

class Nota(models.Model):
    valor = models.FloatField()
    porcentaje = models.FloatField()
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)

    def __str__(self):
        return 'Nota: ' + str(self.valor) + ' - ' + ' Porcentaje: ' +str(self.porcentaje) + '%'


class FechaImportante(models.Model):
    descripcion = models.TextField()
    fecha = models.DateField()
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)

    def __str__(self):
        return 'Descripcion: ' + self.descripcion + ' - ' + 'Fecha: ' + str(self.fecha)
    