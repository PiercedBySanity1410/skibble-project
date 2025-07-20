from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from utilities import get_user, add_user
from supabase_config import supabase
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import uuid
auth_bp = Blueprint('auth', __name__)

BUCKET_NAME = "avatars"

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
        
        if get_user({"username": username}):
            return jsonify({'success': False, 'exist': True}), 409

        uploaded_file = request.files.get('avatarImg')
        if uploaded_file:
            original_filename = secure_filename(uploaded_file.filename)
            file_ext = uploaded_file.filename.rsplit('.', 1)[-1]
            unique_filename = f"{uuid.uuid4().hex}.{file_ext}"
            res = supabase.storage.from_(BUCKET_NAME).upload(
                unique_filename, uploaded_file
            )
            if res is None:
                avatar_url = supabase.storage.from_(BUCKET_NAME).get_public_url(unique_filename)

        # Hash password securely
        hashed_password = generate_password_hash(password)
        
        # Store user
        user_data = add_user(username, first_name, last_name, hashed_password, avatar_url)
        if user_data is None:
            if avatar_url: response = supabase.storage.from_(BUCKET_NAME).remove([avatar_url])
            return jsonify({'success': False, 'message': 'Failed to create user.'}), 500

        # Generate JWT access token
        access_token = create_access_token(identity=user_data['userId'])

        return jsonify({
            'success': True,
            'sessionUser': {
                'userId': user_data['userId'],
                'username': username,
                'firstName': first_name,
                'lastName': last_name,
                'avatarUrl': avatar_url,
                'accessToken': access_token
            }
        }), 200

    except Exception as error:
        if avatar_url: response = supabase.storage.from_(BUCKET_NAME).remove([avatar_url])
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
    return jsonify({'success': True, 'message': 'Access granted.'}), 200
