from django.urls import path
from .views import DeveloperList, DeveloperDetail

urlpatterns = [
    path("", DeveloperList.as_view()),
    path("<int:pk>/", DeveloperDetail.as_view()),
]