from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Developer
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    DeveloperSerializer,
    RegisterSerializer,
    LoginSerializer,
    CurrentUserSerializer,
)


class DeveloperList(generics.ListCreateAPIView):

    queryset = Developer.objects.all()

    serializer_class = DeveloperSerializer

    permission_classes = [
        IsAuthenticatedOrReadOnly
    ]

    def perform_create(self, serializer):

        serializer.save(
            owner=self.request.user
        )


class DeveloperDetail(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Developer.objects.all()

    serializer_class = DeveloperSerializer

    permission_classes = [
        IsOwnerOrReadOnly
    ]


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class LoginView(generics.CreateAPIView):

    serializer_class = LoginSerializer

    def post(
        self,
        request,
        *args,
        **kwargs
    ):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data
        )


class CurrentUserView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        serializer = CurrentUserSerializer(
            request.user
        )

        return Response(
            serializer.data
        )


class AdminUserListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        if not (
            request.user.is_staff
            or request.user.is_superuser
        ):

            return Response(
                {
                    "detail":
                    "Only administrators can view users."
                },
                status=403
            )

        users = User.objects.all()

        serializer = CurrentUserSerializer(
            users,
            many=True
        )

        return Response(
            serializer.data
        )


class AdminDeleteUserView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(
        self,
        request,
        user_id
    ):

        if not (
            request.user.is_staff
            or request.user.is_superuser
        ):

            return Response(
                {
                    "detail":
                    "Only administrators can delete users."
                },
                status=403
            )

        try:

            user = User.objects.get(
                id=user_id
            )

        except User.DoesNotExist:

            return Response(
                {
                    "detail":
                    "User not found."
                },
                status=404
            )

        if user.id == request.user.id:

            return Response(
                {
                    "detail":
                    "Administrators cannot delete their own account."
                },
                status=400
            )

        user.delete()

        return Response(
            {
                "detail":
                "User deleted successfully."
            },
            status=204
        )