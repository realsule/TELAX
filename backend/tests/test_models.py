# --- FILE: tests/test_models.py ---
import pytest
from datetime import datetime, timedelta
from app.main import create_app
from app.models import db, User, Listing, Order


@pytest.fixture
def app():
    """Create and configure a test app."""
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'JWT_SECRET_KEY': 'test-secret-key'
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


class TestUserModel:
    """Test User model functionality."""
    
    def test_create_user(self, app):
        """Test creating a new user."""
        with app.app_context():
            user = User(
                username='testuser',
                email='test@telax.com',
                password_hash='hashed_password',
                role='farmer',
                first_name='Test',
                last_name='User',
                phone_number='+1234567890'
            )
            db.session.add(user)
            db.session.commit()
            
            retrieved_user = User.query.filter_by(username='testuser').first()
            assert retrieved_user is not None
            assert retrieved_user.email == 'test@telax.com'
            assert retrieved_user.role == 'farmer'
            assert retrieved_user.first_name == 'Test'
            assert retrieved_user.last_name == 'User'
            assert retrieved_user.phone_number == '+1234567890'
            assert retrieved_user.is_verified is False  # Default value
            assert retrieved_user.created_at is not None

    def test_user_repr(self, app):
        """Test User model string representation."""
        with app.app_context():
            user = User(
                username='testuser',
                email='test@telax.com',
                password_hash='hashed_password',
                role='buyer'
            )
            db.session.add(user)
            db.session.commit()
            
            assert repr(user) == f'<User {user.username}>'

    def test_user_to_dict(self, app):
        """Test User model to_dict method."""
        with app.app_context():
            user = User(
                username='testuser',
                email='test@telax.com',
                password_hash='hashed_password',
                role='farmer',
                first_name='Test',
                last_name='User',
                phone_number='+1234567890',
                is_verified=True
            )
            db.session.add(user)
            db.session.commit()
            
            user_dict = user.to_dict()
            assert user_dict['username'] == 'testuser'
            assert user_dict['email'] == 'test@telax.com'
            assert user_dict['role'] == 'farmer'
            assert user_dict['first_name'] == 'Test'
            assert user_dict['last_name'] == 'User'
            assert user_dict['phone_number'] == '+1234567890'
            assert user_dict['is_verified'] is True
            assert 'password_hash' not in user_dict  # Should exclude sensitive data

    def test_user_unique_constraints(self, app):
        """Test user unique constraints on email and username."""
        with app.app_context():
            # Create first user
            user1 = User(
                username='testuser',
                email='test@telax.com',
                password_hash='hashed_password',
                role='farmer'
            )
            db.session.add(user1)
            db.session.commit()
            
            # Try to create user with same email
            user2 = User(
                username='differentuser',
                email='test@telax.com',  # Same email
                password_hash='hashed_password',
                role='buyer'
            )
            db.session.add(user2)
            
            with pytest.raises(Exception):  # Should raise IntegrityError
                db.session.commit()

    def test_user_role_validation(self, app):
        """Test user role validation."""
        with app.app_context():
            # Test valid roles
            valid_roles = ['farmer', 'buyer', 'super_admin']
            for role in valid_roles:
                user = User(
                    username=f'user_{role}',
                    email=f'{role}@telax.com',
                    password_hash='hashed_password',
                    role=role
                )
                db.session.add(user)
                db.session.commit()
                assert user.role == role
                db.session.delete(user)
                db.session.commit()

    def test_user_soft_delete(self, app):
        """Test user soft delete functionality."""
        with app.app_context():
            user = User(
                username='testuser',
                email='test@telax.com',
                password_hash='hashed_password',
                role='farmer'
            )
            db.session.add(user)
            db.session.commit()
            
            # Soft delete
            user.is_deleted = True
            user.deleted_at = datetime.utcnow()
            db.session.commit()
            
            # Check that user is marked as deleted
            deleted_user = User.query.filter_by(username='testuser').first()
            assert deleted_user.is_deleted is True
            assert deleted_user.deleted_at is not None


class TestListingModel:
    """Test Listing model functionality."""
    
    @pytest.fixture
    def test_farmer(self, app):
        """Create a test farmer for listing tests."""
        with app.app_context():
            farmer = User(
                username='testfarmer',
                email='farmer@telax.com',
                password_hash='hashed_password',
                role='farmer',
                first_name='John',
                last_name='Farmer',
                is_verified=True
            )
            db.session.add(farmer)
            db.session.commit()
            return farmer

    def test_create_listing(self, app, test_farmer):
        """Test creating a new listing."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                description='Organic tomatoes from local farm',
                price_per_unit=2.50,
                unit='kg',
                quantity_available=100,
                farmer_id=test_farmer.id,
                category='vegetables',
                is_available=True
            )
            db.session.add(listing)
            db.session.commit()
            
            retrieved_listing = Listing.query.filter_by(title='Fresh Tomatoes').first()
            assert retrieved_listing is not None
            assert retrieved_listing.description == 'Organic tomatoes from local farm'
            assert retrieved_listing.price_per_unit == 2.50
            assert retrieved_listing.unit == 'kg'
            assert retrieved_listing.quantity_available == 100
            assert retrieved_listing.farmer_id == test_farmer.id
            assert retrieved_listing.category == 'vegetables'
            assert retrieved_listing.is_available is True
            assert retrieved_listing.created_at is not None

    def test_listing_repr(self, app, test_farmer):
        """Test Listing model string representation."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            assert repr(listing) == f'<Listing {listing.title}>'

    def test_listing_to_dict(self, app, test_farmer):
        """Test Listing model to_dict method."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                description='Organic tomatoes',
                price_per_unit=2.50,
                unit='kg',
                quantity_available=100,
                farmer_id=test_farmer.id,
                category='vegetables',
                is_available=True
            )
            db.session.add(listing)
            db.session.commit()
            
            listing_dict = listing.to_dict()
            assert listing_dict['title'] == 'Fresh Tomatoes'
            assert listing_dict['description'] == 'Organic tomatoes'
            assert listing_dict['price_per_unit'] == 2.50
            assert listing_dict['unit'] == 'kg'
            assert listing_dict['quantity_available'] == 100
            assert listing_dict['farmer_id'] == test_farmer.id
            assert listing_dict['category'] == 'vegetables'
            assert listing_dict['is_available'] is True

    def test_listing_relationships(self, app, test_farmer):
        """Test Listing model relationships."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            # Test farmer relationship
            assert listing.farmer == test_farmer
            assert listing.farmer.username == 'testfarmer'
            
            # Test orders relationship (should be empty initially)
            assert len(listing.orders) == 0

    def test_listing_availability_toggle(self, app, test_farmer):
        """Test listing availability toggle."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id,
                is_available=True
            )
            db.session.add(listing)
            db.session.commit()
            
            # Toggle availability
            listing.is_available = False
            db.session.commit()
            
            updated_listing = Listing.query.filter_by(title='Fresh Tomatoes').first()
            assert updated_listing.is_available is False

    def test_listing_quantity_update(self, app, test_farmer):
        """Test listing quantity updates."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            # Update quantity
            listing.quantity_available = 50
            db.session.commit()
            
            updated_listing = Listing.query.filter_by(title='Fresh Tomatoes').first()
            assert updated_listing.quantity_available == 50

    def test_listing_soft_delete(self, app, test_farmer):
        """Test listing soft delete functionality."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            # Soft delete
            listing.is_deleted = True
            listing.deleted_at = datetime.utcnow()
            db.session.commit()
            
            # Check that listing is marked as deleted
            deleted_listing = Listing.query.filter_by(title='Fresh Tomatoes').first()
            assert deleted_listing.is_deleted is True
            assert deleted_listing.deleted_at is not None


class TestOrderModel:
    """Test Order model functionality."""
    
    @pytest.fixture
    def test_farmer(self, app):
        """Create a test farmer for order tests."""
        with app.app_context():
            farmer = User(
                username='testfarmer',
                email='farmer@telax.com',
                password_hash='hashed_password',
                role='farmer',
                is_verified=True
            )
            db.session.add(farmer)
            db.session.commit()
            return farmer

    @pytest.fixture
    def test_buyer(self, app):
        """Create a test buyer for order tests."""
        with app.app_context():
            buyer = User(
                username='testbuyer',
                email='buyer@telax.com',
                password_hash='hashed_password',
                role='buyer',
                is_verified=True
            )
            db.session.add(buyer)
            db.session.commit()
            return buyer

    @pytest.fixture
    def test_listing(self, app, test_farmer):
        """Create a test listing for order tests."""
        with app.app_context():
            listing = Listing(
                title='Fresh Tomatoes',
                price_per_unit=2.50,
                unit='kg',
                quantity_available=100,
                farmer_id=test_farmer.id,
                category='vegetables',
                is_available=True
            )
            db.session.add(listing)
            db.session.commit()
            return listing

    def test_create_order(self, app, test_buyer, test_farmer, test_listing):
        """Test creating a new order."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00,
                status='pending',
                delivery_address='123 Farm Road, Agriculture City'
            )
            db.session.add(order)
            db.session.commit()
            
            retrieved_order = Order.query.filter_by(buyer_id=test_buyer.id).first()
            assert retrieved_order is not None
            assert retrieved_order.farmer_id == test_farmer.id
            assert retrieved_order.listing_id == test_listing.id
            assert retrieved_order.quantity == 10
            assert retrieved_order.total_price == 25.00
            assert retrieved_order.status == 'pending'
            assert retrieved_order.delivery_address == '123 Farm Road, Agriculture City'
            assert retrieved_order.created_at is not None

    def test_order_repr(self, app, test_buyer, test_farmer, test_listing):
        """Test Order model string representation."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00
            )
            db.session.add(order)
            db.session.commit()
            
            assert repr(order) == f'<Order {order.id}>'

    def test_order_to_dict(self, app, test_buyer, test_farmer, test_listing):
        """Test Order model to_dict method."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00,
                status='pending',
                delivery_address='123 Farm Road'
            )
            db.session.add(order)
            db.session.commit()
            
            order_dict = order.to_dict()
            assert order_dict['buyer_id'] == test_buyer.id
            assert order_dict['farmer_id'] == test_farmer.id
            assert order_dict['listing_id'] == test_listing.id
            assert order_dict['quantity'] == 10
            assert order_dict['total_price'] == 25.00
            assert order_dict['status'] == 'pending'
            assert order_dict['delivery_address'] == '123 Farm Road'

    def test_order_relationships(self, app, test_buyer, test_farmer, test_listing):
        """Test Order model relationships."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00
            )
            db.session.add(order)
            db.session.commit()
            
            # Test relationships
            assert order.buyer == test_buyer
            assert order.farmer == test_farmer
            assert order.listing == test_listing
            assert order.buyer.username == 'testbuyer'
            assert order.farmer.username == 'testfarmer'
            assert order.listing.title == 'Fresh Tomatoes'

    def test_order_status_transitions(self, app, test_buyer, test_farmer, test_listing):
        """Test order status transitions."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00,
                status='pending'
            )
            db.session.add(order)
            db.session.commit()
            
            # Test status transitions
            valid_statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']
            
            for status in valid_statuses:
                order.status = status
                db.session.commit()
                assert order.status == status

    def test_order_cancellation(self, app, test_buyer, test_farmer, test_listing):
        """Test order cancellation."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00,
                status='pending'
            )
            db.session.add(order)
            db.session.commit()
            
            # Cancel order
            order.status = 'cancelled'
            order.cancelled_at = datetime.utcnow()
            order.cancellation_reason = 'Buyer requested cancellation'
            db.session.commit()
            
            cancelled_order = Order.query.filter_by(id=order.id).first()
            assert cancelled_order.status == 'cancelled'
            assert cancelled_order.cancelled_at is not None
            assert cancelled_order.cancellation_reason == 'Buyer requested cancellation'

    def test_order_delivery_tracking(self, app, test_buyer, test_farmer, test_listing):
        """Test order delivery tracking."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00,
                status='preparing'
            )
            db.session.add(order)
            db.session.commit()
            
            # Mark as ready for delivery
            order.status = 'ready'
            order.ready_for_delivery_at = datetime.utcnow()
            db.session.commit()
            
            # Mark as delivered
            order.status = 'delivered'
            order.delivered_at = datetime.utcnow()
            db.session.commit()
            
            delivered_order = Order.query.filter_by(id=order.id).first()
            assert delivered_order.status == 'delivered'
            assert delivered_order.ready_for_delivery_at is not None
            assert delivered_order.delivered_at is not None

    def test_order_soft_delete(self, app, test_buyer, test_farmer, test_listing):
        """Test order soft delete functionality."""
        with app.app_context():
            order = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=test_listing.id,
                quantity=10,
                total_price=25.00
            )
            db.session.add(order)
            db.session.commit()
            
            # Soft delete
            order.is_deleted = True
            order.deleted_at = datetime.utcnow()
            db.session.commit()
            
            # Check that order is marked as deleted
            deleted_order = Order.query.filter_by(id=order.id).first()
            assert deleted_order.is_deleted is True
            assert deleted_order.deleted_at is not None


class TestModelRelationships:
    """Test cross-model relationships and cascading operations."""
    
    @pytest.fixture
    def test_farmer(self, app):
        """Create a test farmer."""
        with app.app_context():
            farmer = User(
                username='testfarmer',
                email='farmer@telax.com',
                password_hash='hashed_password',
                role='farmer',
                is_verified=True
            )
            db.session.add(farmer)
            db.session.commit()
            return farmer

    @pytest.fixture
    def test_buyer(self, app):
        """Create a test buyer."""
        with app.app_context():
            buyer = User(
                username='testbuyer',
                email='buyer@telax.com',
                password_hash='hashed_password',
                role='buyer',
                is_verified=True
            )
            db.session.add(buyer)
            db.session.commit()
            return buyer

    def test_farmer_listing_relationship(self, app, test_farmer):
        """Test farmer-listing relationship."""
        with app.app_context():
            # Create multiple listings for the farmer
            listing1 = Listing(
                title='Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            listing2 = Listing(
                title='Lettuce',
                price_per_unit=1.50,
                quantity_available=50,
                farmer_id=test_farmer.id
            )
            
            db.session.add(listing1)
            db.session.add(listing2)
            db.session.commit()
            
            # Test relationship
            assert len(test_farmer.listings) == 2
            assert listing1 in test_farmer.listings
            assert listing2 in test_farmer.listings

    def test_buyer_order_relationship(self, app, test_buyer, test_farmer):
        """Test buyer-order relationship."""
        with app.app_context():
            # Create a listing first
            listing = Listing(
                title='Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            # Create multiple orders for the buyer
            order1 = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=listing.id,
                quantity=10,
                total_price=25.00
            )
            order2 = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=listing.id,
                quantity=5,
                total_price=12.50
            )
            
            db.session.add(order1)
            db.session.add(order2)
            db.session.commit()
            
            # Test relationship
            assert len(test_buyer.orders) == 2
            assert order1 in test_buyer.orders
            assert order2 in test_buyer.orders

    def test_listing_order_relationship(self, app, test_farmer, test_buyer):
        """Test listing-order relationship."""
        with app.app_context():
            # Create a listing
            listing = Listing(
                title='Tomatoes',
                price_per_unit=2.50,
                quantity_available=100,
                farmer_id=test_farmer.id
            )
            db.session.add(listing)
            db.session.commit()
            
            # Create multiple orders for the listing
            order1 = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=listing.id,
                quantity=10,
                total_price=25.00
            )
            order2 = Order(
                buyer_id=test_buyer.id,
                farmer_id=test_farmer.id,
                listing_id=listing.id,
                quantity=5,
                total_price=12.50
            )
            
            db.session.add(order1)
            db.session.add(order2)
            db.session.commit()
            
            # Test relationship
            assert len(listing.orders) == 2
            assert order1 in listing.orders
            assert order2 in listing.orders
