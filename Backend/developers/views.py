from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User

from .models import Developer
from .serializers import DeveloperSerializer, RegisterSerializer

from .permissions import IsOwnerOrReadOnly


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


class LoginView(TokenObtainPairView):

    pass