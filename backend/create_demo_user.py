#!/usr/bin/env python3
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models import db, User
from app.main import create_app

def create_demo_user():
    app = create_app()
    
    with app.app_context():
        # Check if demo user already exists
        existing_user = User.query.filter_by(email='demo@example.com').first()
        if existing_user:
            print("Demo user already exists")
            print(f"Email: {existing_user.email}")
            print(f"Username: {existing_user.username}")
            print(f"Role: {existing_user.role}")
            print(f"Verified: {existing_user.is_verified}")
            return
        
        # Create demo user
        demo_user = User(
            username='demo',
            email='demo@example.com',
            role='farmer',
            first_name='Demo',
            last_name='User',
            phone_number='+1234567890'
        )
        demo_user.set_password('Demo123!')
        demo_user.is_verified = True
        
        db.session.add(demo_user)
        db.session.commit()
        
        print("Demo user created successfully!")
        print("Email: demo@example.com")
        print("Password: Demo123!")
        print("Role: farmer")

if __name__ == '__main__':
    create_demo_user()
