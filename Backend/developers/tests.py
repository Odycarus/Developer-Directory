from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse


class DeveloperAPITest(TestCase):

    def test_developer_endpoint_exists(self):
        response = self.client.get("/api/developers/")

        self.assertNotEqual(response.status_code, 404)

    def test_developer_endpoint_is_public(self):
        response = self.client.get("/api/developers/")

        self.assertEqual(response.status_code, 200)
