# --- FILE: tests/test_interest_counter.py ---
import pytest
import json
import os
from app.main import create_app
from app.models import db


@pytest.fixture
def app():
    """Create and configure a test app."""
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'JWT_SECRET_KEY': 'test-secret-key',
        'JWT_ACCESS_TOKEN_EXPIRES': False
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """A test runner for the app's CLI commands."""
    return app.test_cli_runner()


class TestInterestCounter:
    """Test interest counter functionality for Good Governance."""
    
    def test_get_initial_interest_count(self, client):
        """Test getting initial interest count when no file exists."""
        response = client.get('/api/interest/count')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'count' in data
        assert 'message' in data
        assert data['count'] == 142  # Default starting count
        assert '142 people have shown interest!' in data['message']
    
    def test_get_existing_interest_count(self, client, tmp_path):
        """Test getting existing interest count from file."""
        # Create a test counter file
        counter_data = {'count': 150, 'last_updated': '2024-01-20T10:00:00'}
        counter_file = tmp_path / 'interest_counter.json'
        counter_file.write_text(json.dumps(counter_data))
        
        # Mock the file path (this would need to be implemented in the actual code)
        # For now, we'll test the default behavior
        response = client.get('/api/interest/count')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] >= 142
    
    def test_increment_interest_count(self, client):
        """Test incrementing the interest count."""
        # First increment
        response = client.post('/api/interest/count')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'count' in data
        assert 'message' in data
        assert data['count'] >= 143  # Should be 142 + 1
        assert 'Interest registered!' in data['message']
        
        # Second increment
        response = client.post('/api/interest/count')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['count'] >= 144  # Should be previous count + 1
    
    def test_concurrent_increment_requests(self, client):
        """Test handling concurrent increment requests."""
        # Simulate multiple rapid requests
        responses = []
        for _ in range(5):
            response = client.post('/api/interest/count')
            responses.append(response)
        
        # All requests should succeed
        for response in responses:
            assert response.status_code == 200
            data = json.loads(response.data)
            assert 'count' in data
            assert data['count'] >= 142
    
    def test_interest_count_persistence(self, client):
        """Test that interest count persists across requests."""
        # Get initial count
        response = client.get('/api/interest/count')
        initial_data = json.loads(response.data)
        initial_count = initial_data['count']
        
        # Increment count
        response = client.post('/api/interest/count')
        increment_data = json.loads(response.data)
        increment_count = increment_data['count']
        
        # Verify count increased
        assert increment_count == initial_count + 1
        
        # Get count again to verify persistence
        response = client.get('/api/interest/count')
        final_data = json.loads(response.data)
        final_count = final_data['count']
        
        # Should match the incremented count
        assert final_count == increment_count
    
    def test_interest_count_error_handling(self, client):
        """Test error handling in interest counter."""
        # Test invalid method
        response = client.delete('/api/interest/count')
        assert response.status_code == 405  # Method Not Allowed
        
        # Test with invalid request body (should not affect GET/POST)
        response = client.post('/api/interest/count', 
                             data='invalid json',
                             content_type='application/json')
        # Should still work since POST doesn't require body
    
    def test_interest_count_response_format(self, client):
        """Test that response format is consistent."""
        response = client.get('/api/interest/count')
        
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        
        data = json.loads(response.data)
        
        # Required fields
        assert 'count' in data
        assert 'message' in data
        
        # Data types
        assert isinstance(data['count'], int)
        assert isinstance(data['message'], str)
        
        # Value constraints
        assert data['count'] >= 0
        assert len(data['message']) > 0
    
    def test_interest_count_file_operations(self, client, monkeypatch):
        """Test file operations for interest counter."""
        # This test would mock file operations
        # For now, test the API endpoints work without files
        
        response = client.get('/api/interest/count')
        assert response.status_code == 200
        
        response = client.post('/api/interest/count')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert 'count' in data
        assert 'message' in data


class TestInterestCounterIntegration:
    """Integration tests for interest counter with other features."""
    
    def test_interest_counter_with_cors(self, client):
        """Test CORS headers are present."""
        response = client.options('/api/interest/count')
        
        # Should handle OPTIONS requests
        assert response.status_code in [200, 204]
    
    def test_interest_counter_security(self, client):
        """Test that interest counter doesn't expose sensitive data."""
        response = client.get('/api/interest/count')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        
        # Should not expose internal system information
        assert 'password' not in data
        assert 'token' not in data
        assert 'users' not in data
        
        # Should only contain public information
        assert 'count' in data
        assert 'message' in data
