from django.db import models
from django.contrib.auth.models import User


class Developer(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    location = models.CharField(
        max_length=100,
          blank=True,
            null=True
            )
    affiliation = models.CharField(
        max_length=100,
        blank=True,
        default=""
        )
    description = models.TextField(
    blank=True,
    null=True
)
    skills = models.CharField(
        max_length=255,
        blank=True,
        default=""
        
    )

    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True
    )

    owner = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name="developers"
)

    def __str__(self):
        return self.name

    