# --- FILE: tests/test_listings.py ---
import pytest
import json
from datetime import datetime
from app.main import create_app
from app.models import db, User, Listing
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


class TestListingsCRUD:
    """Test marketplace listings CRUD operations for Good Governance."""
    
    def test_create_listing_success(self, client, auth_headers_farmer, test_farmer):
        """Test successful listing creation."""
        listing_data = {
            'title': 'Fresh Lettuce',
            'description': 'Crisp, fresh lettuce from organic farm',
            'price': 3.99,
            'unit': 'kg',
            'category': 'vegetables',
            'location': 'Kisumu, Kenya',
            'quantity': 50,
            'is_organic': True,
            'image_url': '/api/placeholder/300/200'
        }
        
        response = client.post('/api/listings', 
                             json=listing_data,
                             headers=auth_headers_farmer)
        
        assert response.status_code == 201
        data = json.loads(response.data)
        
        assert 'listing' in data
        assert 'message' in data
        assert data['listing']['title'] == listing_data['title']
        assert data['listing']['price'] == listing_data['price']
        assert data['listing']['farmer_id'] == test_farmer.id
        assert data['listing']['is_available'] == True
    
    def test_create_listing_validation(self, client, auth_headers_farmer):
        """Test listing creation validation."""
        # Missing required fields
        response = client.post('/api/listings',
                             json={'title': 'Test'},
                             headers=auth_headers_farmer)
        
        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        
        # Invalid price
        response = client.post('/api/listings',
                             json={
                                 'title': 'Test Product',
                                 'description': 'Test Description',
                                 'price': -10.0,  # Negative price
                                 'unit': 'kg',
                                 'category': 'vegetables',
                                 'location': 'Test Location'
                             },
                             headers=auth_headers_farmer)
        
        assert response.status_code == 400
    
    def test_create_listing_unauthorized(self, client):
        """Test listing creation without authentication."""
        listing_data = {
            'title': 'Test Product',
            'description': 'Test Description',
            'price': 10.0,
            'unit': 'kg',
            'category': 'vegetables',
            'location': 'Test Location'
        }
        
        response = client.post('/api/listings', json=listing_data)
        
        assert response.status_code == 401  # Unauthorized
    
    def test_create_listing_wrong_role(self, client, auth_headers_buyer):
        """Test listing creation by non-farmer."""
        listing_data = {
            'title': 'Test Product',
            'description': 'Test Description',
            'price': 10.0,
            'unit': 'kg',
            'category': 'vegetables',
            'location': 'Test Location'
        }
        
        response = client.post('/api/listings',
                             json=listing_data,
                             headers=auth_headers_buyer)
        
        assert response.status_code == 403  # Forbidden
    
    def test_get_all_listings(self, client, sample_listing):
        """Test retrieving all listings."""
        response = client.get('/api/listings')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listings' in data
        assert isinstance(data['listings'], list)
        assert len(data['listings']) >= 1
        
        # Check listing structure
        listing = data['listings'][0]
        assert 'id' in listing
        assert 'title' in listing
        assert 'price' in listing
        assert 'farmer' in listing
    
    def test_get_listing_by_id(self, client, sample_listing):
        """Test retrieving a specific listing."""
        response = client.get(f'/api/listings/{sample_listing.id}')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listing' in data
        assert data['listing']['id'] == sample_listing.id
        assert data['listing']['title'] == sample_listing.title
    
    def test_get_nonexistent_listing(self, client):
        """Test retrieving a non-existent listing."""
        response = client.get('/api/listings/99999')
        
        assert response.status_code == 404
        data = json.loads(response.data)
        assert 'error' in data
    
    def test_update_listing_success(self, client, auth_headers_farmer, sample_listing):
        """Test successful listing update."""
        update_data = {
            'title': 'Updated Organic Tomatoes',
            'price': 5.99,
            'description': 'Updated description'
        }
        
        response = client.put(f'/api/listings/{sample_listing.id}',
                             json=update_data,
                             headers=auth_headers_farmer)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listing' in data
        assert data['listing']['title'] == update_data['title']
        assert data['listing']['price'] == update_data['price']
        assert data['listing']['description'] == update_data['description']
    
    def test_update_listing_unauthorized(self, client, sample_listing):
        """Test listing update without authentication."""
        update_data = {'title': 'Updated Title'}
        
        response = client.put(f'/api/listings/{sample_listing.id}',
                             json=update_data)
        
        assert response.status_code == 401
    
    def test_update_listing_wrong_owner(self, client, auth_headers_buyer, sample_listing):
        """Test listing update by non-owner."""
        update_data = {'title': 'Updated Title'}
        
        response = client.put(f'/api/listings/{sample_listing.id}',
                             json=update_data,
                             headers=auth_headers_buyer)
        
        assert response.status_code == 403
    
    def test_delete_listing_success(self, client, auth_headers_farmer, sample_listing):
        """Test successful listing deletion."""
        response = client.delete(f'/api/listings/{sample_listing.id}',
                                 headers=auth_headers_farmer)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'message' in data
        assert 'deleted' in data['message'].lower()
    
    def test_delete_listing_unauthorized(self, client, sample_listing):
        """Test listing deletion without authentication."""
        response = client.delete(f'/api/listings/{sample_listing.id}')
        
        assert response.status_code == 401
    
    def test_delete_listing_wrong_owner(self, client, auth_headers_buyer, sample_listing):
        """Test listing deletion by non-owner."""
        response = client.delete(f'/api/listings/{sample_listing.id}',
                                 headers=auth_headers_buyer)
        
        assert response.status_code == 403
    
    def test_toggle_listing_availability(self, client, auth_headers_farmer, sample_listing):
        """Test toggling listing availability."""
        # Initially available
        assert sample_listing.is_available == True
        
        # Toggle to unavailable
        response = client.patch(f'/api/listings/{sample_listing.id}/toggle',
                                headers=auth_headers_farmer)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listing' in data
        assert data['listing']['is_available'] == False
        
        # Toggle back to available
        response = client.patch(f'/api/listings/{sample_listing.id}/toggle',
                                headers=auth_headers_farmer)
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['listing']['is_available'] == True
    
    def test_search_listings(self, client, sample_listing):
        """Test searching listings."""
        # Search by title
        response = client.get('/api/listings?search=tomatoes')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listings' in data
        assert len(data['listings']) >= 1
        
        # Search by category
        response = client.get('/api/listings?category=vegetables')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert len(data['listings']) >= 1
    
    def test_filter_listings_by_price(self, client, sample_listing):
        """Test filtering listings by price range."""
        # Filter by minimum price
        response = client.get('/api/listings?min_price=4.0')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        for listing in data['listings']:
            assert listing['price'] >= 4.0
        
        # Filter by maximum price
        response = client.get('/api/listings?max_price=5.0')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        for listing in data['listings']:
            assert listing['price'] <= 5.0
    
    def test_listings_pagination(self, client, app, test_farmer):
        """Test listings pagination."""
        # Create multiple listings
        with app.app_context():
            for i in range(15):
                listing = Listing(
                    title=f'Product {i}',
                    description=f'Description {i}',
                    price=10.0 + i,
                    unit='kg',
                    category='vegetables',
                    location='Test Location',
                    farmer_id=test_farmer.id,
                    is_available=True
                )
                db.session.add(listing)
            db.session.commit()
        
        # Test pagination
        response = client.get('/api/listings?page=1&limit=10')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        assert 'listings' in data
        assert 'pagination' in data
        assert len(data['listings']) <= 10
        assert data['pagination']['page'] == 1
        assert data['pagination']['limit'] == 10
    
    def test_listings_data_integrity(self, client, sample_listing):
        """Test that listing data maintains integrity."""
        response = client.get(f'/api/listings/{sample_listing.id}')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        listing = data['listing']
        
        # Required fields
        required_fields = ['id', 'title', 'description', 'price', 'unit', 
                         'category', 'location', 'farmer_id', 'is_available',
                         'created_at', 'updated_at']
        
        for field in required_fields:
            assert field in listing, f"Missing required field: {field}"
        
        # Data types
        assert isinstance(listing['price'], (int, float))
        assert isinstance(listing['is_available'], bool)
        assert isinstance(listing['quantity'], int)
        
        # Value constraints
        assert listing['price'] >= 0
        assert listing['quantity'] >= 0
        assert len(listing['title']) > 0
        assert len(listing['description']) > 0


class TestListingsSecurity:
    """Security tests for listings functionality."""
    
    def test_listings_sql_injection_protection(self, client, auth_headers_farmer):
        """Test protection against SQL injection in listing operations."""
        malicious_input = "'; DROP TABLE listings; --"
        
        # Should not cause SQL errors
        response = client.get(f'/api/listings?search={malicious_input}')
        assert response.status_code in [200, 400]  # Should handle gracefully
        
        response = client.post('/api/listings',
                             json={
                                 'title': malicious_input,
                                 'description': 'Test',
                                 'price': 10.0,
                                 'unit': 'kg',
                                 'category': 'vegetables',
                                 'location': 'Test'
                             },
                             headers=auth_headers_farmer)
        assert response.status_code in [201, 400]  # Should handle gracefully
    
    def test_listings_xss_protection(self, client, auth_headers_farmer):
        """Test protection against XSS in listing data."""
        xss_payload = '<script>alert("xss")</script>'
        
        response = client.post('/api/listings',
                             json={
                                 'title': xss_payload,
                                 'description': 'Test description',
                                 'price': 10.0,
                                 'unit': 'kg',
                                 'category': 'vegetables',
                                 'location': 'Test'
                             },
                             headers=auth_headers_farmer)
        
        if response.status_code == 201:
            data = json.loads(response.data)
            # Script tags should be escaped or sanitized
            assert '<script>' not in data['listing']['title']
    
    def test_listings_rate_limiting(self, client, auth_headers_farmer):
        """Test rate limiting on listing operations."""
        # This would require implementing rate limiting
        # For now, test that multiple requests work
        for i in range(5):
            response = client.get('/api/listings')
            assert response.status_code == 200
