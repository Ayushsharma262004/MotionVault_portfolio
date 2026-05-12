import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Contact API tests
class TestContactAPI:
    """Tests for POST /api/contact and GET /api/contacts"""

    def test_create_contact(self):
        payload = {"name": "TEST_User", "email": "test_contact@example.com", "message": "Test message"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "TEST_User"
        assert data["email"] == "test_contact@example.com"
        assert "id" in data

    def test_create_contact_with_optional_fields(self):
        payload = {"name": "TEST_User2", "email": "test_contact2@example.com", "phone": "1234567890", "sport": "cricket", "message": "Hello"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["sport"] == "cricket"
        assert data["phone"] == "1234567890"

    def test_create_contact_missing_name(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"email": "x@x.com", "message": "hi"})
        assert r.status_code == 422

    def test_get_contacts(self):
        r = requests.get(f"{BASE_URL}/api/contacts")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)


# Subscribe API tests
class TestSubscribeAPI:
    """Tests for POST /api/subscribe and GET /api/subscribers"""

    unique_email = f"TEST_sub_{int(time.time())}@example.com"

    def test_subscribe_new_email(self):
        r = requests.post(f"{BASE_URL}/api/subscribe", json={"email": self.unique_email})
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == self.unique_email
        assert "id" in data

    def test_subscribe_duplicate_email(self):
        # Use the same email as above - should return 400
        r = requests.post(f"{BASE_URL}/api/subscribe", json={"email": self.unique_email})
        assert r.status_code == 400
        data = r.json()
        assert "already subscribed" in data.get("detail", "").lower()

    def test_get_subscribers(self):
        r = requests.get(f"{BASE_URL}/api/subscribers")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_subscribe_missing_email(self):
        r = requests.post(f"{BASE_URL}/api/subscribe", json={})
        assert r.status_code == 422
