#!/usr/bin/env python3
"""
TELAX Admin Seed Script

This script creates a default admin user for the TELAX Agricultural Marketplace.
It checks if an admin user already exists before creating a new one.
"""

import sys
import os
import secrets

# Add the app directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models import db, User
from app.main import create_app


def generate_secure_password():
    """Generate a secure random password."""
    return secrets.token_urlsafe(16)


def seed_admin_user():
    """Create admin user if it doesn't exist."""
    app = create_app()
    
    with app.app_context():
        # Check if admin user already exists
        existing_admin = User.query.filter_by(email='admin@telax.com').first()
        
        if existing_admin:
            print("✅ Admin user already exists:")
            print(f"   Email: {existing_admin.email}")
            print(f"   Username: {existing_admin.username}")
            print(f"   Role: {existing_admin.role}")
            print(f"   Verified: {existing_admin.is_verified}")
            print(f"   Created: {existing_admin.created_at}")
            return existing_admin
        
        # Generate secure password
        admin_password = generate_secure_password()
        
        # Create new admin user
        admin_user = User(
            username='admin',
            email='admin@telax.com',
            role='super_admin',  # Using super_admin as per the existing enum
            first_name='Super',
            last_name='Admin',
            phone_number='+254700000000',  # Default Kenya phone number
            is_verified=True,
            is_deleted=False
        )
        
        # Set secure password
        admin_user.set_password(admin_password)
        
        # Save to database
        db.session.add(admin_user)
        db.session.commit()
        
        print("🌱 Admin user created successfully!")
        print("=" * 50)
        print(f"📧 Email:    admin@telax.com")
        print(f"🔑 Password: {admin_password}")
        print(f"👤 Role:     super_admin")
        print(f"✅ Verified: True")
        print("=" * 50)
        print("⚠️  IMPORTANT: Save this password securely!")
        print("🔐 Store it in a password manager or secure location.")
        print()
        print("🚀 You can now access the admin portal at:")
        print("   http://localhost:5175/admin-secure-portal")
        
        return admin_user


def main():
    """Main function to run the admin seed script."""
    print("🌱 TELAX Agricultural Marketplace - Admin Seed Script")
    print("=" * 60)
    
    app = create_app()
    
    try:
        with app.app_context():
            admin_user = seed_admin_user()
            
            if admin_user:
                print("\n✅ Admin seeding completed successfully!")
                
                # Verify the admin user can be retrieved
                verify_admin = User.query.filter_by(email='admin@telax.com').first()
                if verify_admin and verify_admin.role == 'super_admin':
                    print("✅ Admin user verification passed!")
                else:
                    print("❌ Admin user verification failed!")
                    sys.exit(1)
            else:
                print("ℹ️  Admin user already exists, no action needed.")
            
    except Exception as e:
        print(f"❌ Error seeding admin user: {str(e)}")
        sys.exit(1)


if __name__ == '__main__':
    main()
