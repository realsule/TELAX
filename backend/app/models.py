# --- FILE: app/models.py ---
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('farmer', 'buyer', 'institution', 'super_admin', name='user_role'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime, nullable=True)
    
    # Institution-specific fields
    institution_name = db.Column(db.String(200), nullable=True)
    institution_type = db.Column(db.String(50), nullable=True)  # school, ngo, community_center, etc.
    institution_address = db.Column(db.Text, nullable=True)
    institution_description = db.Column(db.Text, nullable=True)
    is_approved = db.Column(db.Boolean, default=False)  # For admin approval
    
    listings = db.relationship('Listing', backref='farmer', lazy='dynamic')
    orders = db.relationship('Order', foreign_keys='Order.buyer_id', backref='buyer', lazy='dynamic')
    farmer_orders = db.relationship('Order', foreign_keys='Order.farmer_id', backref='farmer', lazy='dynamic')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'is_verified': self.is_verified,
            'is_approved': getattr(self, 'is_approved', False),
            'institution_name': getattr(self, 'institution_name', None),
            'institution_type': getattr(self, 'institution_type', None),
            'institution_address': getattr(self, 'institution_address', None),
            'institution_description': getattr(self, 'institution_description', None),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<User {self.username}>'

class Listing(db.Model):
    __tablename__ = 'listings'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price_per_unit = db.Column(db.Numeric(10, 2), nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    quantity_available = db.Column(db.Integer, nullable=False)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    is_available = db.Column(db.Boolean, default=True)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime, nullable=True)
    
    orders = db.relationship('Order', backref='listing', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price_per_unit': float(self.price_per_unit),
            'unit': self.unit,
            'quantity_available': self.quantity_available,
            'farmer_id': self.farmer_id,
            'category': self.category,
            'image_url': self.image_url,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Listing {self.title}>'

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled', name='order_status'), default='pending')
    delivery_address = db.Column(db.Text, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    cancelled_at = db.Column(db.DateTime, nullable=True)
    cancellation_reason = db.Column(db.Text, nullable=True)
    ready_for_delivery_at = db.Column(db.DateTime, nullable=True)
    delivered_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'farmer_id': self.farmer_id,
            'listing_id': self.listing_id,
            'quantity': self.quantity,
            'total_price': float(self.total_price),
            'status': self.status,
            'delivery_address': self.delivery_address,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'cancelled_at': self.cancelled_at.isoformat() if self.cancelled_at else None,
            'delivered_at': self.delivered_at.isoformat() if self.delivered_at else None
        }
    
    def __repr__(self):
        return f'<Order {self.id}>'

class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    event_type = db.Column(db.String(50), nullable=False)  # workshop, school_visit, community_meeting
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    max_participants = db.Column(db.Integer, nullable=True)
    current_participants = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    institution = db.relationship('User', backref='events')
    
    def to_dict(self):
        return {
            'id': self.id,
            'institution_id': self.institution_id,
            'title': self.title,
            'description': self.description,
            'event_type': self.event_type,
            'date': self.date.isoformat() if self.date else None,
            'location': self.location,
            'max_participants': self.max_participants,
            'current_participants': self.current_participants,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Event {self.title}>'

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    donation_type = db.Column(db.String(50), nullable=False)  # grant, resource, volunteer
    quantity_available = db.Column(db.Integer, nullable=True)
    quantity_claimed = db.Column(db.Integer, default=0)
    value = db.Column(db.Float, nullable=True)  # Monetary value if applicable
    requirements = db.Column(db.Text, nullable=True)  # Requirements for claiming
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    institution = db.relationship('User', backref='donations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'institution_id': self.institution_id,
            'title': self.title,
            'description': self.description,
            'donation_type': self.donation_type,
            'quantity_available': self.quantity_available,
            'quantity_claimed': self.quantity_claimed,
            'value': float(self.value) if self.value else None,
            'requirements': self.requirements,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Donation {self.title}>'

class EventParticipant(db.Model):
    __tablename__ = 'event_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), default='registered')  # registered, attended, cancelled
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    event = db.relationship('Event', backref='participants')
    user = db.relationship('User', backref='event_participations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'status': self.status,
            'registered_at': self.registered_at.isoformat() if self.registered_at else None
        }
    
    def __repr__(self):
        return f'<EventParticipant {self.id}>'

class DonationClaim(db.Model):
    __tablename__ = 'donation_claims'
    
    id = db.Column(db.Integer, primary_key=True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id'), nullable=False)
    claimant_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quantity_claimed = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected, completed
    message = db.Column(db.Text, nullable=True)  # Message from claimant
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    donation = db.relationship('Donation', backref='claims')
    claimant = db.relationship('User', backref='donation_claims')
    
    def to_dict(self):
        return {
            'id': self.id,
            'donation_id': self.donation_id,
            'claimant_id': self.claimant_id,
            'quantity_claimed': self.quantity_claimed,
            'status': self.status,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<DonationClaim {self.id}>'
