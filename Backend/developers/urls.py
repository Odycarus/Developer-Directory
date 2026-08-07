from django.urls import path
from .views import (
    DeveloperList,
    DeveloperDetail,
    RegisterView,
    LoginView,
)

urlpatterns = [
    path("", DeveloperList.as_view()),
    path("<int:pk>/", DeveloperDetail.as_view()),

    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
]