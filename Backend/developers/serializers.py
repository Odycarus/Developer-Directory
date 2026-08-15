from django.contrib.auth.models import User

from rest_framework import serializers

from rest_framework_simplejwt.tokens import RefreshToken

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


    def validate_email(self, value):

        if User.objects.filter(
            email__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value


    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


class LoginSerializer(serializers.Serializer):

    username_or_email = serializers.CharField()
    password = serializers.CharField(
        write_only=True
    )


    def validate(self, attrs):

        identifier = attrs.get(
            "username_or_email"
        )

        password = attrs.get("password")


        user = User.objects.filter(
            username=identifier
        ).first()


        if user is None:

            user = User.objects.filter(
                email__iexact=identifier
            ).first()


        if user is None or not user.check_password(password):

            raise serializers.ValidationError(
                "Invalid username or email or password."
            )


        refresh = RefreshToken.for_user(user)


        refresh["username"] = user.username

        refresh["is_admin"] = (
            user.is_staff or user.is_superuser
        )


        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class CurrentUserSerializer(serializers.ModelSerializer):

    class Meta:
            model = User

            fields = [
                "id",
                "username",
                "email",
                "is_staff",
                "is_superuser",
        ]