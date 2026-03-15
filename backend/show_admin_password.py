#!/usr/bin/env python3
"""
TELAX Admin Password Display/Reset Script
"""

import sys
import os
import secrets

# Add the app directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.models import db, User
from app.main import create_app


def show_admin_info():
    """Show admin user information and reset password if needed."""
    app = create_app()
    
    with app.app_context():
        # Check if admin user exists
        admin_user = User.query.filter_by(email='admin@telax.com').first()
        
        if not admin_user:
            print("❌ Admin user not found!")
            return
        
        print("🌱 TELAX Agricultural Marketplace - Admin Information")
        print("=" * 60)
        print(f"📧 Email:    {admin_user.email}")
        print(f"👤 Username: {admin_user.username}")
        print(f"🔑 Role:     {admin_user.role}")
        print(f"✅ Verified: {admin_user.is_verified}")
        print(f"📅 Created:  {admin_user.created_at}")
        print()
        
        # Generate a new secure password
        new_password = secrets.token_urlsafe(16)
        admin_user.set_password(new_password)
        db.session.commit()
        
        print("🔐 NEW PASSWORD GENERATED:")
        print("=" * 40)
        print(f"🔑 Password: {new_password}")
        print("=" * 40)
        print("⚠️  Save this password securely!")
        print("🌐 You can now login at: http://localhost:5175/admin-secure-portal")


if __name__ == '__main__':
    show_admin_info()
