from django.apps import AppConfig

class ListingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.listings'  # This MUST match the name in INSTALLED_APPS