from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Allow anyone to view
        if request.method in SAFE_METHODS:
            return True

        # Only owner can edit/delete
        return obj.owner == request.user