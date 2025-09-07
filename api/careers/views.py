from rest_framework import viewsets, filters
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ["created_datetime", "id", "username"]
    ordering = ["-created_datetime"]
    search_fields = ["title", "content", "username"]