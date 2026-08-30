from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    DeveloperList,
    DeveloperDetail,
    RegisterView,
    LoginView,
    CurrentUserView,
    AdminDeleteUserView,
    AdminUserListView,
)


urlpatterns = [

    path(
        "",
        DeveloperList.as_view(),
    ),

    path(
        "<int:pk>/",
        DeveloperDetail.as_view(),
    ),

    path(
        "register/",
        RegisterView.as_view(),
    ),

    path(
        "login/",
        LoginView.as_view(),
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
    ),

    path(
        "me/",
        CurrentUserView.as_view(),
    ),

    path(
        "admin/users/<int:user_id>/",
        AdminDeleteUserView.as_view(),
    ),

    path(
    "admin/users/",
    AdminUserListView.as_view(),
    ),

]