from django.contrib import admin
from .models import Asignatura, Nota, FechaImportante

# Register your models here.
admin.site.register(Asignatura)
admin.site.register(Nota)
admin.site.register(FechaImportante)