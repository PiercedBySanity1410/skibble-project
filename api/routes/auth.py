from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from services import get_user, set_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import uuid
import os

# Blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

# Configuration
UPLOAD_FOLDER = 'uploads/profile/'  # Ensure this directory exists
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


@auth_bp.route('/register', methods=['POST'])
def register_user():
    """
    Endpoint to register a new user.
    Accepts form data including profile image.
    """
    try:
        username = request.form.get('username')
        first_name = request.form.get('firstName')
        last_name = request.form.get('lastName')
        password = request.form.get('password')
        avatar_url = ''

        # Check if user already exists
        if get_user(username):
            return jsonify({'success': False, 'exist': True}), 409

        # Handle profile image upload
        uploaded_file = request.files.get('avatarImg')
        if uploaded_file:
            original_filename = secure_filename(uploaded_file.filename)
            avatar_url = f"{uuid.uuid4().hex}_{original_filename}"
            saved_file_path = os.path.join(UPLOAD_FOLDER, avatar_url)
            uploaded_file.save(saved_file_path)

        # Hash password securely
        hashed_password = generate_password_hash(password)

        # Generate unique user ID
        user_id = str(uuid.uuid4())

        # Store user
        is_saved = set_user(user_id, username, first_name, last_name, hashed_password, avatar_url)
        if not is_saved:
            if avatar_url and os.path.exists(saved_file_path):
                os.remove(saved_file_path)
            return jsonify({'success': False, 'message': 'Failed to create user.'}), 500

        # Generate JWT access token
        access_token = create_access_token(identity=user_id)

        return jsonify({
            'success': True,
            'sessionUser': {
                'userId': user_id,
                'username': username,
                'firstName': first_name,
                'lastName': last_name,
                'avatarUrl': avatar_url,
                'accessToken': access_token
            }
        }), 200

    except Exception as error:
        if avatar_url and os.path.exists(saved_file_path):
            os.remove(saved_file_path)
        return jsonify({'success': False, 'message': 'An error occurred.'}), 500


@auth_bp.route('/login', methods=['POST'])
def login_user():
    """
    Endpoint to authenticate users and issue a JWT token.
    Expects JSON with 'username' and 'password'.
    """
    try:
        credentials = request.get_json()
        username = credentials.get('username')
        password = credentials.get('password')

        # Retrieve user from local DB
        user_data = get_user(username)
        if not user_data:
            return jsonify({'success': False, 'message': 'User does not exist.'}), 401

        if not check_password_hash(user_data['passwordHash'], password):
            return jsonify({'success': False, 'message': 'Incorrect credentials.'}), 401
        
        # Create JWT token
        access_token = create_access_token(identity=user_data['userId'])
        return jsonify({
            'success': True,
            'sessionUser': {
                'userId': user_data['userId'],
                'username': user_data['username'],
                'firstName': user_data['firstName'],
                'lastName': user_data['lastName'],
                'avatarUrl': user_data['avatarUrl'],
                'accessToken': access_token,
            }
        }), 200

    except Exception as error:
        return jsonify({'success': False, 'message': 'An error occurred.'}), 500


@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    """
    Sample protected endpoint that requires JWT authentication.
    """
    return jsonify({'success': True, 'message': 'Access granted.'}), 200
