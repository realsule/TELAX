#!/usr/bin/env python3
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models import db, User
from app.main import create_app

def create_admin_user():
    app = create_app()
    
    with app.app_context():
        # Check if admin user already exists
        existing_admin = User.query.filter_by(email='admin@telax.com').first()
        if existing_admin:
            print("Admin user already exists")
            print(f"Email: {existing_admin.email}")
            print(f"Username: {existing_admin.username}")
            print(f"Role: {existing_admin.role}")
            print(f"Verified: {existing_admin.is_verified}")
            return
        
        # Create admin user
        admin_user = User(
            username='admin',
            email='admin@telax.com',
            role='super_admin',
            first_name='System',
            last_name='Administrator',
            phone_number='+1234567890'
        )
        admin_user.set_password('Admin123!')
        admin_user.is_verified = True
        
        db.session.add(admin_user)
        db.session.commit()
        
        print("Admin user created successfully!")
        print("Email: admin@telax.com")
        print("Password: Admin123!")
        print("Role: super_admin")

if __name__ == '__main__':
    create_admin_user()
