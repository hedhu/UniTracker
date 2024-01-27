from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    username = data['username'].strip()
    password = data['password'].strip()
    email = data['email'].strip()
    
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Eliga otro correo')
    ##
    if not password or len(password) < 8:
        raise ValidationError('Eliga otra contraseña, min 8 caracteres')
    ##
    if not username:
        raise ValidationError('Eliga otro username')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Se necesita un correo')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Nombre ya existente, eliga otro')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Se necesita una contraseña')
    return True