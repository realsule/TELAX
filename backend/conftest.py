# --- FILE: conftest.py ---
import pytest
import json
import tempfile
import os
from app.main import create_app
from app.models import db, User, Listing
from werkzeug.security import generate_password_hash


@pytest.fixture(scope='session')
def temp_dir():
    """Create a temporary directory for test files."""
    with tempfile.TemporaryDirectory() as tmpdir:
        yield tmpdir


@pytest.fixture(scope='function')
def app():
    """Create and configure a test app."""
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'JWT_SECRET_KEY': 'test-secret-key',
        'JWT_ACCESS_TOKEN_EXPIRES': False,
        'WTF_CSRF_ENABLED': False
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """A test runner for the app's CLI commands."""
    return app.test_cli_runner()


@pytest.fixture
def test_farmer(app):
    """Create a test farmer user."""
    with app.app_context():
        farmer = User(
            username='testfarmer',
            email='farmer@telax.com',
            password_hash=generate_password_hash('farmerpass123'),
            role='farmer',
            first_name='John',
            last_name='Farmer',
            phone_number='+1234567890',
            is_verified=True
        )
        db.session.add(farmer)
        db.session.commit()
        return farmer


@pytest.fixture
def test_buyer(app):
    """Create a test buyer user."""
    with app.app_context():
        buyer = User(
            username='testbuyer',
            email='buyer@telax.com',
            password_hash=generate_password_hash('buyerpass123'),
            role='buyer',
            first_name='Jane',
            last_name='Buyer',
            phone_number='+0987654321',
            is_verified=True
        )
        db.session.add(buyer)
        db.session.commit()
        return buyer


@pytest.fixture
def test_admin(app):
    """Create a test admin user."""
    with app.app_context():
        admin = User(
            username='testadmin',
            email='admin@telax.com',
            password_hash=generate_password_hash('adminpass123'),
            role='super_admin',
            first_name='Admin',
            last_name='User',
            phone_number='+1122334455',
            is_verified=True
        )
        db.session.add(admin)
        db.session.commit()
        return admin


@pytest.fixture
def auth_headers_farmer(client, test_farmer):
    """Get authentication headers for farmer."""
    response = client.post('/api/auth/login', json={
        'email': 'farmer@telax.com',
        'password': 'farmerpass123'
    })
    token = json.loads(response.data)['access_token']
    return {'Authorization': f'Bearer {token}'}


@pytest.fixture
def auth_headers_buyer(client, test_buyer):
    """Get authentication headers for buyer."""
    response = client.post('/api/auth/login', json={
        'email': 'buyer@telax.com',
        'password': 'buyerpass123'
    })
    token = json.loads(response.data)['access_token']
    return {'Authorization': f'Bearer {token}'}


@pytest.fixture
def auth_headers_admin(client, test_admin):
    """Get authentication headers for admin."""
    response = client.post('/api/auth/login', json={
        'email': 'admin@telax.com',
        'password': 'adminpass123'
    })
    token = json.loads(response.data)['access_token']
    return {'Authorization': f'Bearer {token}'}


@pytest.fixture
def sample_listing(app, test_farmer):
    """Create a sample listing."""
    with app.app_context():
        listing = Listing(
            title='Organic Tomatoes',
            description='Fresh, vine-ripened organic tomatoes',
            price=4.99,
            unit='kg',
            category='vegetables',
            location='Nairobi, Kenya',
            farmer_id=test_farmer.id,
            is_available=True,
            is_organic=True,
            quantity=100,
            image_url='/api/placeholder/300/200'
        )
        db.session.add(listing)
        db.session.commit()
        return listing


@pytest.fixture
def multiple_listings(app, test_farmer):
    """Create multiple sample listings."""
    listings = []
    with app.app_context():
        for i in range(5):
            listing = Listing(
                title=f'Product {i}',
                description=f'Description for product {i}',
                price=10.0 + i,
                unit='kg',
                category='vegetables',
                location='Test Location',
                farmer_id=test_farmer.id,
                is_available=True,
                quantity=50 + i * 10,
                is_organic=i % 2 == 0
            )
            db.session.add(listing)
            listings.append(listing)
        db.session.commit()
    return listings


# Governance testing markers
def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "governance: marks tests for Good Governance compliance"
    )
    config.addinivalue_line(
        "markers", "security: marks tests as security tests"
    )
    config.addinivalue_line(
        "markers", "integration: marks tests as integration tests"
    )
    config.addinivalue_line(
        "markers", "unit: marks tests as unit tests"
    )


# Helper functions for testing
def create_test_user(app, email, role, password='testpass123'):
    """Helper to create a test user."""
    with app.app_context():
        user = User(
            username=email.split('@')[0],
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
            first_name='Test',
            last_name=role.capitalize(),
            phone_number='+1234567890',
            is_verified=True
        )
        db.session.add(user)
        db.session.commit()
        return user


def get_auth_token(client, email, password='testpass123'):
    """Helper to get authentication token."""
    response = client.post('/api/auth/login', json={
        'email': email,
        'password': password
    })
    return json.loads(response.data)['access_token']


def assert_valid_response(response, status_code=200):
    """Helper to validate response structure."""
    assert response.status_code == status_code
    assert response.content_type == 'application/json'
    return json.loads(response.data)


def assert_error_response(response, status_code, error_message=None):
    """Helper to validate error response."""
    assert response.status_code == status_code
    data = json.loads(response.data)
    assert 'error' in data
    if error_message:
        assert error_message.lower() in data['error'].lower()
    return data
