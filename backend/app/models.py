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
    role = db.Column(db.Enum('farmer', 'buyer', 'super_admin', name='user_role'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime, nullable=True)
    
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
