from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient


class DeveloperAPITest(TestCase):
    """
    Tests the Developer API.

    These tests cover:
    - Public developer listing
    - Authentication requirements
    - Creating developer profiles
    - Ownership permissions
    - Updating developers
    - Deleting developers
    - Validation
    """

    def setUp(self):
        """
        Runs before every test.

        We create:
        - an API client
        - two normal users
        - one developer belonging to user1
        """

        self.client = APIClient()

        self.user1 = User.objects.create_user(
            username="user1",
            email="user1@example.com",
            password="password123",
        )

        self.user2 = User.objects.create_user(
            username="user2",
            email="user2@example.com",
            password="password123",
        )

        self.developer = self.create_developer(
            owner=self.user1
        )

    def create_developer(self, owner):
        """
        Helper function used to create developers.

        This keeps us from repeating the same data
        in every test.
        """

        from .models import Developer

        return Developer.objects.create(
            name="John Developer",
            title="Software Developer",
            location="Dubai",
            email="john@example.com",
            phone="0501234567",
            affiliation="Developer Directory",
            description="A test developer.",
            skills="Python,Django,React",
            owner=owner,
        )

    # ---------------------------------------------------------
    # PUBLIC ACCESS
    # ---------------------------------------------------------

    def test_developer_endpoint_exists(self):
        response = self.client.get("/api/developers/")

        self.assertNotEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_developer_list_is_public(self):
        response = self.client.get("/api/developers/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

    def test_developer_detail_is_public(self):
        response = self.client.get(
            f"/api/developers/{self.developer.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

    # ---------------------------------------------------------
    # CREATE / AUTHENTICATION
    # ---------------------------------------------------------

    def test_anonymous_user_cannot_create_developer(self):
        data = {
            "name": "New Developer",
            "title": "Software Developer",
            "location": "Dubai",
            "email": "new@example.com",
            "phone": "0500000000",
            "affiliation": "",
            "description": "New developer",
            "skills": "Python,Django",
        }

        response = self.client.post(
            "/api/developers/",
            data,
            format="json",
        )

        self.assertIn(
            response.status_code,
            [
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )

    def test_authenticated_user_can_create_developer(self):
        self.client.force_authenticate(
            user=self.user2
        )

        data = {
            "name": "New Developer",
            "title": "Software Developer",
            "location": "Dubai",
            "email": "new@example.com",
            "phone": "0500000000",
            "affiliation": "",
            "description": "New developer",
            "skills": "Python,Django",
        }

        response = self.client.post(
            "/api/developers/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            response.data["owner"],
            self.user2.id,
        )

    def test_user_cannot_create_second_developer_profile(self):
        self.client.force_authenticate(
            user=self.user1
        )

        data = {
            "name": "Second Developer",
            "title": "Another Developer",
            "location": "Dubai",
            "email": "second@example.com",
            "phone": "0500000000",
            "affiliation": "",
            "description": "Second profile",
            "skills": "Python",
        }

        response = self.client.post(
            "/api/developers/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # OWNERSHIP / UPDATE
    # ---------------------------------------------------------

    def test_owner_can_update_developer(self):
        self.client.force_authenticate(
            user=self.user1
        )

        data = {
            "name": "Updated Developer",
            "title": "Senior Developer",
            "location": "Dubai",
            "email": "updated@example.com",
            "phone": "0509999999",
            "affiliation": "Updated Affiliation",
            "description": "Updated description",
            "skills": "Python,Django,React",
        }

        response = self.client.put(
            f"/api/developers/{self.developer.id}/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.developer.refresh_from_db()

        self.assertEqual(
            self.developer.name,
            "Updated Developer",
        )

    def test_non_owner_cannot_update_developer(self):
        self.client.force_authenticate(
            user=self.user2
        )

        data = {
            "name": "Hacked Developer",
            "title": "Hacked Title",
            "location": "Dubai",
            "email": "hacked@example.com",
            "phone": "0500000000",
            "affiliation": "Hacked",
            "description": "Should not work",
            "skills": "Hacking",
        }

        response = self.client.put(
            f"/api/developers/{self.developer.id}/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_anonymous_user_cannot_update_developer(self):
        data = {
            "name": "Anonymous Update",
            "title": "Developer",
            "location": "Dubai",
            "email": "anonymous@example.com",
            "phone": "0500000000",
            "affiliation": "",
            "description": "Should not work",
            "skills": "Python",
        }

        response = self.client.put(
            f"/api/developers/{self.developer.id}/",
            data,
            format="json",
        )

        self.assertIn(
            response.status_code,
            [
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )

    # ---------------------------------------------------------
    # OWNERSHIP / DELETE
    # ---------------------------------------------------------

    def test_owner_can_delete_developer(self):
        self.client.force_authenticate(
            user=self.user1
        )

        response = self.client.delete(
            f"/api/developers/{self.developer.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            type(self.developer).objects.filter(
                id=self.developer.id
            ).exists()
        )

    def test_non_owner_cannot_delete_developer(self):
        self.client.force_authenticate(
            user=self.user2
        )

        response = self.client.delete(
            f"/api/developers/{self.developer.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_anonymous_user_cannot_delete_developer(self):
        response = self.client.delete(
            f"/api/developers/{self.developer.id}/"
        )

        self.assertIn(
            response.status_code,
            [
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )

    # ---------------------------------------------------------
    # VALIDATION
    # ---------------------------------------------------------

    def test_invalid_email_is_rejected(self):
        self.client.force_authenticate(
            user=self.user2
        )

        data = {
            "name": "Invalid Email Developer",
            "title": "Developer",
            "location": "Dubai",
            "email": "not-an-email",
            "phone": "0500000000",
            "affiliation": "",
            "description": "Invalid email test",
            "skills": "Python",
        }

        response = self.client.post(
            "/api/developers/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_missing_required_name_is_rejected(self):
        self.client.force_authenticate(
            user=self.user2
        )

        data = {
            "title": "Developer",
            "location": "Dubai",
            "email": "missingname@example.com",
            "phone": "0500000000",
            "affiliation": "",
            "description": "Missing name test",
            "skills": "Python",
        }

        response = self.client.post(
            "/api/developers/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )


class AuthenticationAPITest(TestCase):
    """
    Tests registration, login, token refresh,
    and the current-user endpoint.
    """

    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="password123",
        )

    # ---------------------------------------------------------
    # REGISTRATION
    # ---------------------------------------------------------

    def test_user_can_register(self):
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
        }

        response = self.client.post(
            "/api/developers/register/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            User.objects.filter(
                username="newuser"
            ).exists()
        )

    def test_duplicate_email_is_rejected(self):
        data = {
            "username": "anotheruser",
            "email": "TEST@example.com",
            "password": "password123",
        }

        response = self.client.post(
            "/api/developers/register/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # LOGIN
    # ---------------------------------------------------------

    def test_login_with_username(self):
        data = {
            "username_or_email": "testuser",
            "password": "password123",
        }

        response = self.client.post(
            "/api/developers/login/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn(
            "access",
            response.data,
        )

        self.assertIn(
            "refresh",
            response.data,
        )

    def test_login_with_email(self):
        data = {
            "username_or_email": "test@example.com",
            "password": "password123",
        }

        response = self.client.post(
            "/api/developers/login/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn(
            "access",
            response.data,
        )

        self.assertIn(
            "refresh",
            response.data,
        )

    def test_login_with_wrong_password_is_rejected(self):
        data = {
            "username_or_email": "testuser",
            "password": "wrongpassword",
        }

        response = self.client.post(
            "/api/developers/login/",
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # CURRENT USER
    # ---------------------------------------------------------

    def test_current_user_requires_authentication(self):
        response = self.client.get(
            "/api/developers/me/"
        )

        self.assertIn(
            response.status_code,
            [
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )

    def test_current_user_returns_authenticated_user(self):
        self.client.force_authenticate(
            user=self.user
        )

        response = self.client.get(
            "/api/developers/me/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["username"],
            "testuser",
        )

    # ---------------------------------------------------------
    # TOKEN REFRESH
    # ---------------------------------------------------------

    def test_token_refresh_works(self):
        login_response = self.client.post(
            "/api/developers/login/",
            {
                "username_or_email": "testuser",
                "password": "password123",
            },
            format="json",
        )

        self.assertEqual(
            login_response.status_code,
            status.HTTP_200_OK,
        )

        refresh_token = login_response.data["refresh"]

        response = self.client.post(
            "/api/developers/token/refresh/",
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn(
            "access",
            response.data,
        )