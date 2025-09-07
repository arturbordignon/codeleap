from django.apps import AppConfig

class CareersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "careers"

    def ready(self):
        from .keepalive import start_keepalive
        start_keepalive()