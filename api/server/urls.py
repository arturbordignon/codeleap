from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from careers.views import PostViewSet
from django.http import JsonResponse

router = DefaultRouter(trailing_slash=True)
router.register(r"careers", PostViewSet, basename="careers")

def health(_request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health),
    *router.urls
]
