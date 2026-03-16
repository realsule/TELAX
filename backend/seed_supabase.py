#!/usr/bin/env python3
"""
TELAX Supabase Database Seeder
Populates the Supabase PostgreSQL database with realistic Kenyan agricultural data.

Usage:
    python seed_supabase.py

This script creates:
- 2 Farmer accounts with realistic KES pricing
- 2 Buyer accounts 
- 2 Institution accounts (pending approval)
- 1 Super Admin account
- 8 realistic product listings with KES pricing
- Sample orders and reviews
- Categories and other supporting data

All financial values are in Kenyan Shillings (KES).
"""

import sys
import os
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

# Add the app directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from app import create_app, db
from app.models import User, Listing, Order, Review, Category, Event, Donation, EventParticipant, DonationClaim

def create_demo_data():
    """Create realistic demo data for TELAX platform"""
    
    app = create_app()
    
    with app.app_context():
        print("🌱 Creating TELAX demo data for Supabase...")
        
        # Clear existing data (optional - uncomment for clean slate)
        # Order.query.delete()
        # Review.query.delete()
        # Listing.query.delete()
        # User.query.filter(User.role != 'super_admin').delete()
        # Category.query.delete()
        # Event.query.delete()
        # Donation.query.delete()
        # EventParticipant.query.delete()
        # DonationClaim.query.delete()
        # db.session.commit()
        
        # Create categories
        categories_data = [
            {'name': 'Vegetables', 'description': 'Fresh vegetables from local farms'},
            {'name': 'Fruits', 'description': 'Seasonal fruits and berries'},
            {'name': 'Dairy & Eggs', 'description': 'Fresh dairy products and eggs'},
            {'name': 'Herbs', 'description': 'Aromatic herbs and spices'},
            {'name': 'Grains', 'description': 'Whole grains and cereals'},
            {'name': 'Poultry', 'description': 'Free-range and organic poultry'},
            {'name': 'Legumes', 'description': 'Beans, peas, and lentils'}
        ]
        
        for cat_data in categories_data:
            existing = Category.query.filter_by(name=cat_data['name']).first()
            if not existing:
                category = Category(**cat_data)
                db.session.add(category)
        
        db.session.commit()
        print("✅ Categories created")
        
        # Create demo users
        users_data = [
            # Farmers
            {
                'username': 'john_farmer',
                'email': 'john@telax.com',
                'password': 'farmerpass123',
                'first_name': 'John',
                'last_name': 'Mwangi',
                'phone_number': '+254712345678',
                'role': 'farmer',
                'is_verified': True,
                'institution_name': None,
                'institution_type': None,
                'institution_address': None,
                'institution_description': None,
                'is_approved': True
            },
            {
                'username': 'mary_farmer',
                'email': 'mary@telax.com',
                'password': 'farmerpass123',
                'first_name': 'Mary',
                'last_name': 'Wanjiru',
                'phone_number': '+254723456789',
                'role': 'farmer',
                'is_verified': True,
                'institution_name': None,
                'institution_type': None,
                'institution_address': None,
                'institution_description': None,
                'is_approved': True
            },
            # Buyers
            {
                'username': 'alice_buyer',
                'email': 'alice@telax.com',
                'password': 'buyerpass123',
                'first_name': 'Alice',
                'last_name': 'Kamau',
                'phone_number': '+254734567890',
                'role': 'buyer',
                'is_verified': True,
                'institution_name': None,
                'institution_type': None,
                'institution_address': None,
                'institution_description': None,
                'is_approved': True
            },
            {
                'username': 'bob_buyer',
                'email': 'bob@telax.com',
                'password': 'buyerpass123',
                'first_name': 'Bob',
                'last_name': 'Ochieng',
                'phone_number': '+254745678901',
                'role': 'buyer',
                'is_verified': True,
                'institution_name': None,
                'institution_type': None,
                'institution_address': None,
                'institution_description': None,
                'is_approved': True
            },
            # Institutions (pending approval)
            {
                'username': 'nairobi_school',
                'email': 'admin@nairobi-school.ac.ke',
                'password': 'schoolpass123',
                'first_name': 'David',
                'last_name': 'Mutiso',
                'phone_number': '+254720123456',
                'role': 'institution',
                'is_verified': True,
                'institution_name': 'Nairobi Primary School',
                'institution_type': 'school',
                'institution_address': 'Moi Avenue, Nairobi, Kenya',
                'institution_description': 'Public primary school focused on agricultural education',
                'is_approved': False  # Pending admin approval
            },
            {
                'username': 'kenya_university',
                'email': 'admin@kenya-university.ac.ke',
                'password': 'unipass123',
                'first_name': 'Grace',
                'last_name': 'Wanjiru',
                'phone_number': '+254730987654',
                'role': 'institution',
                'is_verified': True,
                'institution_name': 'Kenya University',
                'institution_type': 'university',
                'institution_address': 'Kenyatta Avenue, Nairobi, Kenya',
                'institution_description': 'Leading university in agricultural research and education',
                'is_approved': False  # Pending admin approval
            },
            # Super Admin
            {
                'username': 'super_admin',
                'email': 'admin@telax.com',
                'password': 'uUtB8hw_qil1m5BsrJ9KVA',
                'first_name': 'Super',
                'last_name': 'Admin',
                'phone_number': '+254700000000',
                'role': 'super_admin',
                'is_verified': True,
                'institution_name': None,
                'institution_type': None,
                'institution_address': None,
                'institution_description': None,
                'is_approved': True
            }
        ]
        
        created_users = {}
        for user_data in users_data:
            existing = User.query.filter_by(email=user_data['email']).first()
            if not existing:
                password = user_data.pop('password')
                user = User(**user_data)
                user.set_password(password)
                db.session.add(user)
                db.session.flush()  # Get the ID without committing
                created_users[user_data['email']] = user
        
        db.session.commit()
        print("✅ Users created")
        
        # Create realistic listings with KES pricing
        listings_data = [
            # Vegetables
            {
                'title': 'Organic Sukuma Wiki',
                'description': 'Fresh, locally grown sukuma wiki (collard greens) grown without pesticides. Perfect for traditional Kenyan dishes.',
                'price': 50.00,
                'unit': 'bunch',
                'quantity': 100,
                'category': 'Vegetables',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1576072780543-9399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Fresh Kale',
                'description': 'Nutrient-rich kale, perfect for smoothies and healthy meals. Grown using organic farming methods.',
                'price': 60.00,
                'unit': 'bunch',
                'quantity': 80,
                'category': 'Vegetables',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1576072780543-9399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Hydroponic Tomatoes',
                'description': 'Juicy red tomatoes grown using hydroponic technology. No soil, no pesticides, just pure flavor.',
                'price': 120.00,
                'unit': 'kg',
                'quantity': 50,
                'category': 'Vegetables',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1592925014522-bd8d-1f0d-3ad48-bf49ab054e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Fresh Spinach',
                'description': 'Tender spinach leaves, rich in iron and vitamins. Perfect for salads and traditional Kenyan cuisine.',
                'price': 35.00,
                'unit': 'bunch',
                'quantity': 120,
                'category': 'Vegetables',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1576072780543-9399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            # Fruits
            {
                'title': 'Mangoes - Tommy Atkins',
                'description': 'Sweet, juicy mangoes from the famous Tommy Atkins variety. Grown in Embu with perfect ripeness.',
                'price': 80.00,
                'unit': 'kg',
                'quantity': 60,
                'category': 'Fruits',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-15532797125-e4396e53e876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Passion Fruits',
                'description': 'Fresh passion fruits grown in Thika. Sweet and tangy, perfect for juices and desserts.',
                'price': 150.00,
                'unit': 'kg',
                'quantity': 40,
                'category': 'Fruits',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1618894934361-321de326cc97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Bananas - Local Variety',
                'description': 'Sweet bananas from Murang\'a. Grown sustainably without chemical fertilizers.',
                'price': 25.00,
                'unit': 'bunch',
                'quantity': 200,
                'category': 'Fruits',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1543316286-ad9a994ab4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            # Dairy & Eggs
            {
                'title': 'Free-Range Indigenous Chicken',
                'description': 'Locally raised indigenous chicken, free-range and organic feed. Rich flavor and high nutritional value.',
                'price': 800.00,
                'unit': 'piece',
                'quantity': 30,
                'category': 'Poultry',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1567307449-6673-849961a934e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Farm Fresh Eggs',
                'description': 'Fresh eggs from free-range chickens. Collected daily and delivered with care.',
                'price': 450.00,
                'unit': 'dozen',
                'quantity': 50,
                'category': 'Dairy & Eggs',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1518569032508-6a9e4c8a5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Fresh Cow Milk',
                'description': 'Pure, fresh cow milk from local dairy farm. No preservatives or additives.',
                'price': 120.00,
                'unit': 'liter',
                'quantity': 40,
                'category': 'Dairy & Eggs',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1550583845-0eab7-4b4a-a2d0-a8ad2426a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            # Grains & Legumes
            {
                'title': 'Maize - White Corn',
                'description': 'High-quality white maize from Kitale. Perfect for ugali and traditional Kenyan dishes.',
                'price': 45.00,
                'unit': 'kg',
                'quantity': 200,
                'category': 'Grains',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1596475036122-e746c12f6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Green Grams (Ndengu)',
                'description': 'Fresh green grams (ndengu) from Machakos. Rich in protein and essential in Kenyan cuisine.',
                'price': 180.00,
                'unit': 'kg',
                'quantity': 100,
                'category': 'Legumes',
                'farmer_email': 'mary@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1596475036122-e746c12f6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            },
            {
                'title': 'Kidney Beans (Njahi)',
                'description': 'Premium kidney beans from Nakuru. Perfect for githeri and stews.',
                'price': 220.00,
                'unit': 'kg',
                'quantity': 150,
                'category': 'Legumes',
                'farmer_email': 'john@telax.com',
                'is_available': True,
                'image_url': 'https://images.unsplash.com/photo-1596475036122-e746c12f6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MZ&auto=format&fit=crop&w=800&q=80'
            }
        ]
        
        for listing_data in listings_data:
            category = Category.query.filter_by(name=listing_data['category']).first()
            if category:
                # Remove farmer_email from listing_data as it's a relationship
                listing_data_copy = listing_data.copy()
                listing_data_copy.pop('farmer_email')
                
                listing = Listing(
                    farmer_id=created_users[listing_data['farmer_email']].id,
                    category_id=category.id,
                    **listing_data_copy
                )
                db.session.add(listing)
        
        db.session.commit()
        print("✅ Listings created")
        
        # Create sample orders
        orders_data = [
            {
                'buyer_id': created_users['alice@telax.com'].id,
                'farmer_id': created_users['john@telax.com'].id,
                'listing_id': 1,  # Assuming first listing is Organic Sukuma Wiki
                'quantity': 2,
                'total_price': 100.00,
                'status': 'delivered',
                'delivery_address': 'Westlands, Nairobi',
                'notes': 'Delivered on time, very fresh!',
                'payment_method': 'pod'
            },
            {
                'buyer_id': created_users['bob@telax.com'].id,
                'farmer_id': created_users['mary@telax.com'].id,
                'listing_id': 2,  # Assuming second listing is Fresh Kale
                'quantity': 3,
                'total_price': 180.00,
                'status': 'confirmed',
                'delivery_address': 'Kilimani, Nairobi',
                'notes': 'Please deliver after 5 PM',
                'payment_method': 'pod'
            },
            {
                'buyer_id': created_users['alice@telax.com'].id,
                'farmer_id': created_users['john@telax.com'].id,
                'listing_id': 3,  # Assuming third listing is Hydroponic Tomatoes
                'quantity': 1,
                'total_price': 120.00,
                'status': 'pending',
                'delivery_address': 'Kasarani, Nairobi',
                'notes': 'Customer requested ripe tomatoes',
                'payment_method': 'pod'
            }
        ]
        
        for order_data in orders_data:
            order = Order(**order_data)
            db.session.add(order)
        
        db.session.commit()
        print("✅ Orders created")
        
        # Create sample reviews
        reviews_data = [
            {
                'listing_id': 1,  # Organic Sukuma Wiki
                'buyer_id': created_users['alice@telax.com'].id,
                'rating': 5,
                'comment': 'Excellent quality! Very fresh and lasted for over a week. Will definitely order again.'
            },
            {
                'listing_id': 2,  # Fresh Kale
                'buyer_id': created_users['bob@telax.com'].id,
                'rating': 4,
                'comment': 'Good quality kale, but could be fresher. Overall satisfied with the purchase.'
            },
            {
                'listing_id': 3,  # Hydroponic Tomatoes
                'buyer_id': created_users['alice@telax.com'].id,
                'rating': 5,
                'comment': 'Amazing tomatoes! So flavorful and perfectly ripe. Worth every shilling!'
            }
        ]
        
        for review_data in reviews_data:
            review = Review(**review_data)
            db.session.add(review)
        
        db.session.commit()
        print("✅ Reviews created")
        
        # Create sample events for institutions
        if created_users['admin@nairobi-school.ac.ke'] and created_users['admin@kenya-university.ac.ke']:
            events_data = [
                {
                    'institution_id': created_users['admin@nairobi-school.ac.ke'].id,
                    'title': 'Agricultural Workshop for Students',
                    'description': 'Hands-on workshop teaching primary school students about sustainable farming practices and the importance of local agriculture.',
                    'event_type': 'workshop',
                    'date': datetime.utcnow() + timedelta(days=7),
                    'location': 'Nairobi Primary School Grounds',
                    'max_participants': 50,
                    'current_participants': 0,
                    'is_active': True
                },
                {
                    'institution_id': created_users['admin@nairobi-school.ac.ke'].id,
                    'title': 'Farm Visit Day',
                    'description': 'Educational field trip to a local organic farm. Students will learn about crop rotation and sustainable farming.',
                    'event_type': 'school_visit',
                    'date': datetime.utcnow() + timedelta(days=14),
                    'location': 'John\'s Organic Farm, Kiambu',
                    'max_participants': 30,
                    'current_participants': 0,
                    'is_active': True
                },
                {
                    'institution_id': created_users['admin@kenya-university.ac.ke'].id,
                    'title': 'Sustainable Agriculture Conference',
                    'description': 'University-level conference on sustainable agricultural practices and food security in urban areas.',
                    'event_type': 'community_meeting',
                    'date': datetime.utcnow() + timedelta(days=21),
                    'location': 'Kenya University Main Campus',
                    'max_participants': 200,
                    'current_participants': 0,
                    'is_active': True
                }
            ]
            
            for event_data in events_data:
                event = Event(**event_data)
                db.session.add(event)
            
            db.session.commit()
            print("✅ Events created")
        
        # Create sample donations for institutions
        if created_users['admin@nairobi-school.ac.ke'] and created_users['admin@kenya-university.ac.ke']:
            donations_data = [
                {
                    'institution_id': created_users['admin@nairobi-school.ac.ke'].id,
                    'title': 'School Garden Tools Grant',
                    'description': 'Grant available to primary schools for purchasing garden tools and seeds for educational farming projects.',
                    'donation_type': 'grant',
                    'quantity_available': 10000,  # KES 10,000
                    'quantity_claimed': 0,
                    'value': 10000.00,
                    'requirements': 'Must be used for educational purposes only. Application required.',
                    'is_active': True
                },
                {
                    'institution_id': created_users['admin@kenya-university.ac.ke'].id,
                    'title': 'Agricultural Research Equipment',
                    'description': 'Laboratory equipment and research tools for agricultural science departments. Includes microscopes, soil testing kits, and growing chambers.',
                    'donation_type': 'resource',
                    'quantity_available': 20,
                    'quantity_claimed': 0,
                    'value': 50000.00,
                    'requirements': 'Available to universities and research institutions. Pick up required.',
                    'is_active': True
                },
                {
                    'institution_id': created_users['admin@nairobi-school.ac.ke'].id,
                    'title': 'Volunteer Farm Assistants',
                    'description': 'Looking for volunteers to assist with weekend farming activities and student mentorship programs.',
                    'donation_type': 'volunteer',
                    'quantity_available': 15,
                    'quantity_claimed': 0,
                    'value': None,
                    'requirements': 'Must have agricultural background. Weekend availability required.',
                    'is_active': True
                }
            ]
            
            for donation_data in donations_data:
                donation = Donation(**donation_data)
                db.session.add(donation)
            
            db.session.commit()
            print("✅ Donations created")
        
        print("\n🎉 Supabase seeding completed successfully!")
        print("\n📋 Created Accounts:")
        print("   👨‍🌾 Farmers:")
        print("      - john@telax.com / farmerpass123")
        print("      - mary@telax.com / farmerpass123")
        print("   🛍️  Buyers:")
        print("      - alice@telax.com / buyerpass123")
        print("      - bob@telax.com / buyerpass123")
        print("   🏫 Institutions (Pending Approval):")
        print("      - admin@nairobi-school.ac.ke / schoolpass123")
        print("      - admin@kenya-university.ac.ke / unipass123")
        print("   👑 Super Admin:")
        print("      - admin@telax.com / uUtB8hw_qil1m5BsrJ9KVA")
        print("\n💰 All prices are in Kenyan Shillings (KES)")
        print("🖼️  All images use Unsplash URLs for production-ready UI")
        print("\n🌐 Ready for Supabase deployment!")

if __name__ == '__main__':
    try:
        create_demo_data()
    except Exception as e:
        print(f"❌ Error creating demo data: {e}")
        sys.exit(1)
