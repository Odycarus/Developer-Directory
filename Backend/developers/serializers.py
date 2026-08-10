from django.contrib.auth.models import User

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Developer


class DeveloperSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = "__all__"
        read_only_fields = ["owner"]


    def validate(self, attrs):

        request = self.context.get("request")

        if (
            request
            and request.method == "POST"
            and request.user.is_authenticated
        ):

            user = request.user


            if (
                not user.is_staff
                and not user.is_superuser
                and Developer.objects.filter(
                    owner=user
                ).exists()
            ):

                raise serializers.ValidationError(
                    {
                        "detail":
                        "You already have a developer profile."
                    }
                )


        return attrs


    def to_representation(self, instance):

        data = super().to_representation(instance)

        data["skills"] = (
            [
                skill.strip()
                for skill in instance.skills.split(",")
            ]
            if instance.skills
            else []
        )

        return data


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )


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


class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["username"] = user.username

        token["is_admin"] = (
            user.is_staff
            or user.is_superuser
        )

        return token