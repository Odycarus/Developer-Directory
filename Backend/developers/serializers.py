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