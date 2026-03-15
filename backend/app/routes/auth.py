# --- FILE: app/routes/auth.py ---
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from app.models import db, User
from werkzeug.security import check_password_hash
import re
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
interest_bp = Blueprint('interest', __name__, url_prefix='/api/interest')

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone_number(phone):
    """Validate phone number format (basic validation)."""
    pattern = r'^\+?[\d\s\-\(\)]+$'
    return re.match(pattern, phone) is not None if phone else True

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    Expected payload: {
        username, email, password, role, first_name, last_name, phone_number
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'role', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate phone number if provided
        if data.get('phone_number') and not validate_phone_number(data['phone_number']):
            return jsonify({'error': 'Invalid phone number format'}), 400
        
        # Validate role
        valid_roles = ['farmer', 'buyer', 'super_admin']
        if data['role'] not in valid_roles:
            return jsonify({'error': 'Invalid role. Must be one of: farmer, buyer, super_admin'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already taken'}), 400
        
        # Validate password strength
        password = data['password']
        if len(password) < 8:
            return jsonify({'error': 'Password must be at least 8 characters long'}), 400
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            role=data['role'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone_number=data.get('phone_number')
        )
        user.set_password(password)
        
        # Auto-verify farmers and buyers, admin requires manual verification
        if user.role in ['farmer', 'buyer']:
            user.is_verified = True
        
        db.session.add(user)
        db.session.commit()
        
        # Generate access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        current_app.logger.error(f"Registration error: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    """
    Authenticate user and return JWT token.
    Expected payload: {
        email, password
    }
    """
    # Handle OPTIONS preflight request
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user by email
        user = User.query.filter_by(email=data['email']).first()
        
        # Check if user exists and password is correct
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check if user is verified
        if not user.is_verified:
            return jsonify({'error': 'Account not verified. Please contact support.'}), 401
        
        # Check if user is deleted
        if user.is_deleted:
            return jsonify({'error': 'Account has been deactivated'}), 401
        
        # Generate access token
        access_token = create_access_token(identity=user.id)
        
        # Update last login timestamp
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    """
    Verify JWT token and return current user info.
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if user.is_deleted:
            return jsonify({'error': 'Account has been deactivated'}), 401
        
        if not user.is_verified:
            return jsonify({'error': 'Account not verified'}), 401
        
        return jsonify({
            'message': 'Token is valid',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Token verification error: {str(e)}")
        return jsonify({'error': 'Token verification failed'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """
    Get current user's profile.
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Profile fetch error: {str(e)}")
        return jsonify({'error': 'Failed to fetch profile'}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """
    Update current user's profile.
    Expected payload: {
        first_name, last_name, phone_number
    }
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        
        if 'last_name' in data:
            user.last_name = data['last_name']
        
        if 'phone_number' in data:
            if data['phone_number'] and not validate_phone_number(data['phone_number']):
                return jsonify({'error': 'Invalid phone number format'}), 400
            user.phone_number = data['phone_number']
        
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Profile update error: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to update profile'}), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """
    Change user password.
    Expected payload: {
        current_password, new_password
    }
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Validate required fields
        if not data.get('current_password') or not data.get('new_password'):
            return jsonify({'error': 'Current password and new password are required'}), 400
        
        # Verify current password
        if not user.check_password(data['current_password']):
            return jsonify({'error': 'Current password is incorrect'}), 401
        
        # Validate new password
        new_password = data['new_password']
        if len(new_password) < 8:
            return jsonify({'error': 'New password must be at least 8 characters long'}), 400
        
        # Update password
        user.set_password(new_password)
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'message': 'Password changed successfully'}), 200
        
    except Exception as e:
        current_app.logger.error(f"Password change error: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to change password'}), 500

@auth_bp.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    """
    Admin dashboard with user statistics and monitoring data.
    Only accessible to super_admin role.
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'super_admin':
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        # Get user statistics
        total_users = User.query.filter_by(is_deleted=False).count()
        verified_users = User.query.filter_by(is_verified=True, is_deleted=False).count()
        
        # User counts by role
        farmers_count = User.query.filter_by(role='farmer', is_deleted=False).count()
        buyers_count = User.query.filter_by(role='buyer', is_deleted=False).count()
        admins_count = User.query.filter_by(role='super_admin', is_deleted=False).count()
        
        # Recent registrations (last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_users = User.query.filter(
            User.created_at >= seven_days_ago,
            User.is_deleted == False
        ).count()
        
        # Unverified users
        unverified_users = User.query.filter_by(is_verified=False, is_deleted=False).count()
        
        return jsonify({
            'admin_stats': {
                'total_users': total_users,
                'verified_users': verified_users,
                'farmers_count': farmers_count,
                'buyers_count': buyers_count,
                'admins_count': admins_count,
                'recent_registrations': recent_users,
                'unverified_users': unverified_users
            }
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Admin dashboard error: {str(e)}")
        return jsonify({'error': 'Failed to fetch admin data'}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Logout user (JWT tokens are stateless, but we can track logout if needed).
    """
    try:
        # In a stateless JWT setup, logout is typically handled client-side
        # by removing the token. Here we just return a success message.
        return jsonify({'message': 'Logout successful'}), 200
        
    except Exception as e:
        current_app.logger.error(f"Logout error: {str(e)}")
        return jsonify({'error': 'Logout failed'}), 500

@interest_bp.route('/count', methods=['GET'])
def get_interest_count():
    """
    Get the current interest registration count.
    """
    try:
        import json
        import os
        
        # Simple file-based counter for now
        counter_file = 'interest_counter.json'
        
        if os.path.exists(counter_file):
            with open(counter_file, 'r') as f:
                data = json.load(f)
                count = data.get('count', 0)
        else:
            count = 142  # Starting with a realistic base number
        
        return jsonify({
            'count': count,
            'message': f'{count} people have shown interest!'
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Get interest count error: {str(e)}")
        return jsonify({'error': 'Failed to get interest count'}), 500

@interest_bp.route('/count', methods=['POST'])
def increment_interest_count():
    """
    Increment the interest registration count.
    """
    try:
        import json
        import os
        
        # Simple file-based counter for now
        counter_file = 'interest_counter.json'
        
        # Read current count
        if os.path.exists(counter_file):
            with open(counter_file, 'r') as f:
                data = json.load(f)
                count = data.get('count', 142)
        else:
            count = 142  # Starting with a realistic base number
        
        # Increment count
        count += 1
        
        # Save updated count
        with open(counter_file, 'w') as f:
            json.dump({'count': count, 'last_updated': str(datetime.utcnow())}, f)
        
        return jsonify({
            'count': count,
            'message': f'Interest registered! {count} people have shown interest!'
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"Increment interest count error: {str(e)}")
        return jsonify({'error': 'Failed to register interest'}), 500
