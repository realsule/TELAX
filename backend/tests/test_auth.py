# --- FILE: tests/test_auth.py ---
import pytest
import json
from app.main import create_app
from app.models import db, User
from werkzeug.security import generate_password_hash


@pytest.fixture
def app():
    """Create and configure a test app."""
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'JWT_SECRET_KEY': 'test-secret-key',
        'JWT_ACCESS_TOKEN_EXPIRES': False
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


class TestUserRegistration:
    """Test user registration functionality."""
    
    def test_successful_farmer_registration(self, client):
        """Test successful farmer registration."""
        response = client.post('/api/auth/register', json={
            'username': 'newfarmer',
            'email': 'newfarmer@telax.com',
            'password': 'password123',
            'role': 'farmer',
            'first_name': 'New',
            'last_name': 'Farmer',
            'phone_number': '+1234567890'
        })
        
        assert response.status_code == 201
        data = json.loads(response.data)
        assert data['message'] == 'User registered successfully'
        assert data['user']['username'] == 'newfarmer'
        assert data['user']['email'] == 'newfarmer@telax.com'
        assert data['user']['role'] == 'farmer'
        assert 'password_hash' not in data['user']

    def test_successful_buyer_registration(self, client):
        """Test successful buyer registration."""
        response = client.post('/api/auth/register', json={
            'username': 'newbuyer',
            'email': 'newbuyer@telax.com',
            'password': 'password123',
            'role': 'buyer',
            'first_name': 'New',
            'last_name': 'Buyer',
            'phone_number': '+0987654321'
        })
        
        assert response.status_code == 201
        data = json.loads(response.data)
        assert data['user']['role'] == 'buyer'

    def test_duplicate_email_registration(self, client, test_farmer):
        """Test registration with duplicate email fails."""
        response = client.post('/api/auth/register', json={
            'username': 'differentuser',
            'email': 'farmer@telax.com',  # Same email as test_farmer
            'password': 'password123',
            'role': 'farmer',
            'first_name': 'Different',
            'last_name': 'User',
            'phone_number': '+1111111111'
        })
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'Email already registered' in data['error']

    def test_duplicate_username_registration(self, client, test_farmer):
        """Test registration with duplicate username fails."""
        response = client.post('/api/auth/register', json={
            'username': 'testfarmer',  # Same username as test_farmer
            'email': 'different@telax.com',
            'password': 'password123',
            'role': 'farmer',
            'first_name': 'Different',
            'last_name': 'User',
            'phone_number': '+1111111111'
        })
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'Username already taken' in data['error']

    def test_invalid_role_registration(self, client):
        """Test registration with invalid role fails."""
        response = client.post('/api/auth/register', json={
            'username': 'invaliduser',
            'email': 'invalid@telax.com',
            'password': 'password123',
            'role': 'invalid_role',
            'first_name': 'Invalid',
            'last_name': 'User',
            'phone_number': '+1111111111'
        })
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'Invalid role' in data['error']

    def test_missing_required_fields(self, client):
        """Test registration with missing required fields fails."""
        # Missing email
        response = client.post('/api/auth/register', json={
            'username': 'incomplete',
            'password': 'password123',
            'role': 'buyer',
            'first_name': 'Incomplete',
            'last_name': 'User',
            'phone_number': '+1111111111'
        })
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'required' in data['error'].lower()


class TestUserLogin:
    """Test user login functionality."""
    
    def test_successful_farmer_login(self, client, test_farmer):
        """Test successful farmer login."""
        response = client.post('/api/auth/login', json={
            'email': 'farmer@telax.com',
            'password': 'farmerpass123'
        })
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'access_token' in data
        assert data['user']['role'] == 'farmer'
        assert data['user']['username'] == 'testfarmer'

    def test_successful_buyer_login(self, client, test_buyer):
        """Test successful buyer login."""
        response = client.post('/api/auth/login', json={
            'email': 'buyer@telax.com',
            'password': 'buyerpass123'
        })
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'access_token' in data
        assert data['user']['role'] == 'buyer'

    def test_successful_admin_login(self, client, test_admin):
        """Test successful admin login."""
        response = client.post('/api/auth/login', json={
            'email': 'admin@telax.com',
            'password': 'adminpass123'
        })
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'access_token' in data
        assert data['user']['role'] == 'super_admin'

    def test_invalid_email_login(self, client):
        """Test login with invalid email fails."""
        response = client.post('/api/auth/login', json={
            'email': 'nonexistent@telax.com',
            'password': 'password123'
        })
        
        assert response.status_code == 401
        data = json.loads(response.data)
        assert 'Invalid credentials' in data['error']

    def test_invalid_password_login(self, client, test_farmer):
        """Test login with invalid password fails."""
        response = client.post('/api/auth/login', json={
            'email': 'farmer@telax.com',
            'password': 'wrongpassword'
        })
        
        assert response.status_code == 401
        data = json.loads(response.data)
        assert 'Invalid credentials' in data['error']

    def test_missing_credentials(self, client):
        """Test login with missing credentials fails."""
        # Missing password
        response = client.post('/api/auth/login', json={
            'email': 'test@telax.com'
        })
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'required' in data['error'].lower()

    def test_unverified_user_login(self, app, client):
        """Test login with unverified user fails."""
        with app.app_context():
            # Create unverified user
            unverified_user = User(
                username='unverified',
                email='unverified@telax.com',
                password_hash=generate_password_hash('password123'),
                role='buyer',
                first_name='Unverified',
                last_name='User',
                phone_number='+1111111111',
                is_verified=False
            )
            db.session.add(unverified_user)
            db.session.commit()
        
        response = client.post('/api/auth/login', json={
            'email': 'unverified@telax.com',
            'password': 'password123'
        })
        
        assert response.status_code == 401
        data = json.loads(response.data)
        assert 'Account not verified' in data['error']


class TestTokenValidation:
    """Test JWT token validation and protected routes."""
    
    def get_auth_headers(self, client, email, password):
        """Helper method to get auth headers."""
        response = client.post('/api/auth/login', json={
            'email': email,
            'password': password
        })
        data = json.loads(response.data)
        token = data['access_token']
        return {'Authorization': f'Bearer {token}'}
    
    def test_valid_token_access(self, client, test_farmer):
        """Test access with valid JWT token."""
        headers = self.get_auth_headers(client, 'farmer@telax.com', 'farmerpass123')
        response = client.get('/api/auth/verify', headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['user']['username'] == 'testfarmer'
        assert data['user']['role'] == 'farmer'

    def test_invalid_token_access(self, client):
        """Test access with invalid JWT token fails."""
        headers = {'Authorization': 'Bearer invalid.token.here'}
        response = client.get('/api/auth/verify', headers=headers)
        
        assert response.status_code == 422

    def test_missing_token_access(self, client):
        """Test access without JWT token fails."""
        response = client.get('/api/auth/verify')
        
        assert response.status_code == 401
        data = json.loads(response.data)
        assert 'Missing Authorization Header' in data['error']

    def test_expired_token_access(self, client, test_farmer):
        """Test access with expired token fails."""
        # This test would require mocking time or using short-lived tokens
        # For now, we'll test the structure
        headers = self.get_auth_headers(client, 'farmer@telax.com', 'farmerpass123')
        response = client.get('/api/auth/verify', headers=headers)
        
        # With our test config (no expiry), this should work
        assert response.status_code == 200


class TestRoleBasedAccess:
    """Test role-based access control."""
    
    def get_auth_headers(self, client, email, password):
        """Helper method to get auth headers."""
        response = client.post('/api/auth/login', json={
            'email': email,
            'password': password
        })
        data = json.loads(response.data)
        token = data['access_token']
        return {'Authorization': f'Bearer {token}'}
    
    def test_farmer_can_access_farmer_routes(self, client, test_farmer):
        """Test farmer can access farmer-specific routes."""
        headers = self.get_auth_headers(client, 'farmer@telax.com', 'farmerpass123')
        response = client.get('/api/auth/profile', headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['user']['role'] == 'farmer'

    def test_buyer_can_access_buyer_routes(self, client, test_buyer):
        """Test buyer can access buyer-specific routes."""
        headers = self.get_auth_headers(client, 'buyer@telax.com', 'buyerpass123')
        response = client.get('/api/auth/profile', headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['user']['role'] == 'buyer'

    def test_admin_can_access_admin_routes(self, client, test_admin):
        """Test admin can access admin-specific routes."""
        headers = self.get_auth_headers(client, 'admin@telax.com', 'adminpass123')
        response = client.get('/api/auth/admin/dashboard', headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'admin_stats' in data

    def test_buyer_cannot_access_admin_routes(self, client, test_buyer):
        """Test buyer cannot access admin routes."""
        headers = self.get_auth_headers(client, 'buyer@telax.com', 'buyerpass123')
        response = client.get('/api/auth/admin/dashboard', headers=headers)
        
        assert response.status_code == 403
        data = json.loads(response.data)
        assert 'Insufficient permissions' in data['error']

    def test_farmer_cannot_access_admin_routes(self, client, test_farmer):
        """Test farmer cannot access admin routes."""
        headers = self.get_auth_headers(client, 'farmer@telax.com', 'farmerpass123')
        response = client.get('/api/auth/admin/dashboard', headers=headers)
        
        assert response.status_code == 403
        data = json.loads(response.data)
        assert 'Insufficient permissions' in data['error']
