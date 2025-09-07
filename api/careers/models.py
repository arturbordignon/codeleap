from django.db import models

class Post(models.Model):
    username = models.CharField(max_length=100)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=140)
    content = models.TextField()

    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return f"{self.id} - {self.username}"