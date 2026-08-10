from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Anyone can view developers
        if request.method in SAFE_METHODS:
            return True

        # Admins can edit/delete any developer
        if request.user.is_staff or request.user.is_superuser:
            return True

        # Regular users can only edit/delete their own developer
        return obj.owner == request.user