from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Developer


class DeveloperSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = "__all__"

    def to_representation(self, instance):

        data = super().to_representation(instance)

        data["skills"] = (
            [skill.strip() for skill in instance.skills.split(",")]
            if instance.skills
            else []
        )

        return data


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user