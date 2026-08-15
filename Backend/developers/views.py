from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from .models import Developer
from .serializers import DeveloperSerializer, RegisterSerializer, LoginSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CurrentUserSerializer


class DeveloperList(generics.ListCreateAPIView):

    queryset = Developer.objects.all()
    serializer_class = DeveloperSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


    def perform_create(self, serializer):

        serializer.save(owner=self.request.user)


class DeveloperDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Developer.objects.all()
    serializer_class = DeveloperSerializer
    permission_classes = [IsOwnerOrReadOnly]


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.CreateAPIView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

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