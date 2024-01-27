from django.contrib import admin
from .models import Usuario, Asignatura, Nota, FechaImportante

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Asignatura)
admin.site.register(Nota)
admin.site.register(FechaImportante)