# Generated by Django 5.0.1 on 2024-01-27 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0002_usuario_asignatura_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='email',
            field=models.EmailField(default=None, max_length=254, unique=True),
        ),
    ]