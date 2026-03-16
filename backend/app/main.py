# --- FILE: app/main.py ---
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.models import db
from app.routes.auth import auth_bp, interest_bp
from config import get_config
from datetime import timedelta

def create_app(config_object=None):
    """
    Application factory pattern for creating Flask app instances.
    """
    app = Flask(__name__)
    
    # Load configuration
    if config_object:
        if isinstance(config_object, dict):
            # Handle dictionary configuration (for tests)
            app.config.update(config_object)
        else:
            # Handle configuration object
            app.config.from_object(config_object)
    else:
        # Use environment-based configuration
        config = get_config()
        app.config.from_object(config)
    
    # Initialize extensions
    initialize_extensions(app)
    
    # Register blueprints
    register_blueprints(app)
    
    # Register error handlers
    register_error_handlers(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

def configure_app(app):
    """
    Configure application settings.
    """
    # Basic Flask configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Database configuration
    database_url = os.environ.get('DATABASE_URL', 'sqlite:///telax.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # JWT configuration
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config['JWT_ALGORITHM'] = 'HS256'
    
    # CORS configuration - Allow specific local development origins
    if app.config.get('DEBUG', False):
        # Development: Allow specific local origins with full preflight support
        allowed_origins = [
            'http://localhost:5173',
            'http://localhost:5174', 
            'http://localhost:5175',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174',
            'http://127.0.0.1:5175'
        ]
        CORS(app, 
             origins=allowed_origins,
             supports_credentials=True,
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
             methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
             expose_headers=['Content-Type', 'Authorization'])
    else:
        # Production: Restrict to specific origins
        cors_origins = app.config.get('CORS_ORIGINS', ['http://localhost:5173'])
        CORS(app, 
             origins=cors_origins,
             supports_credentials=True,
             allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
             methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
             expose_headers=['Content-Type', 'Authorization'])
    
    # Development/Production settings
    app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    app.config['TESTING'] = os.environ.get('FLASK_TESTING', 'False').lower() == 'true'

def initialize_extensions(app):
    """
    Initialize Flask extensions.
    """
    # Initialize SQLAlchemy
    db.init_app(app)
    
    # Initialize JWT Manager
    jwt = JWTManager(app)
    
    # JWT error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {'error': 'Token has expired'}, 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {'error': 'Invalid token'}, 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {'error': 'Authorization token is required'}, 401
    
    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return {'error': 'Fresh token required'}, 401
    
    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return {'error': 'Token has been revoked'}, 401

def register_blueprints(app):
    """
    Register application blueprints.
    """
    app.register_blueprint(auth_bp)
    app.register_blueprint(interest_bp)
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        return {
            'status': 'ok',
            'message': 'TELAX API is running',
            'version': '1.0.0'
        }

def register_error_handlers(app):
    """
    Register application error handlers.
    """
    
    @app.errorhandler(400)
    def bad_request(error):
        return {'error': 'Bad request'}, 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        return {'error': 'Unauthorized'}, 401
    
    @app.errorhandler(403)
    def forbidden(error):
        return {'error': 'Forbidden'}, 403
    
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return {'error': 'Method not allowed'}, 405
    
    @app.errorhandler(422)
    def unprocessable_entity(error):
        return {'error': 'Unprocessable entity'}, 422
    
    @app.errorhandler(500)
    def internal_server_error(error):
        app.logger.error(f"Internal server error: {error}")
        return {'error': 'Internal server error'}, 500
    
    @app.errorhandler(Exception)
    def handle_exception(error):
        app.logger.error(f"Unhandled exception: {error}")
        return {'error': 'An unexpected error occurred'}, 500

# Create app instance with environment-based configuration
app = create_app()

if __name__ == '__main__':
    # Development server configuration
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', 'localhost')  # Explicitly listen on localhost
    
    print(f"🌱 TELAX Agricultural Marketplace API")
    print(f"🚀 Starting server on http://{host}:{port}")
    print(f"🔧 Debug mode: {debug_mode}")
    print(f"📊 Database: {app.config['SQLALCHEMY_DATABASE_URI']}")
    
    app.run(
        host=host,
        port=port,
        debug=debug_mode,
        use_reloader=debug_mode
    )
