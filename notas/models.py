from django.db import models

# Create your models here.
class Asignatura(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    
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