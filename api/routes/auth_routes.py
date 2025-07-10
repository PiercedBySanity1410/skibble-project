from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from services import get_user, set_user,delete_file
from werkzeug.security import generate_password_hash, check_password_hash
from googleapiclient.http import MediaIoBaseUpload
from google_drive import drive_service, FOLDER_ID
import uuid

# Define authentication blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def signup():
    """
    Endpoint to handle user registration.
    Accepts form data including email, first name, last name, password, and profile image.
    Uploads profile image to Google Drive and stores user data securely.
    """
    try:
        # Retrieve and validate input fields
        username = request.form.get('username')
        if get_user(username):
            return jsonify({'success': False,'exist':True}), 409

        first = request.form.get('first')
        last = request.form.get('last')
        password = request.form.get('password')
        profile_url = ''

        # Handle profile image upload to Google Drive if provided
        file = request.files.get('profileImage')
        if file:
            file_metadata = {'name': file.filename}
            if FOLDER_ID:
                file_metadata['parents'] = [FOLDER_ID]

            media = MediaIoBaseUpload(file.stream, mimetype=file.content_type)

            uploaded_file = drive_service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id'
            ).execute()

            # Set file permissions to public
            drive_service.permissions().create(
                fileId=uploaded_file.get('id'),
                body={'role': 'reader', 'type': 'anyone'}
            ).execute()

            profile_url = uploaded_file.get('id')

        # Securely hash the password
        hashed_password = generate_password_hash(password)
        user_id = str(uuid.uuid4())

        # Save user to the database
        identity = set_user(user_id, username, first, last, hashed_password, profile_url)
        if not identity:
            if(profile_url!=''):
                delete_file(profile_url)
            return jsonify({'success': False, 'message': 'Failed to create user.'}), 500

        # Generate JWT access token
        access_token = create_access_token(identity=user_id)

        return jsonify({'success': True, 'access_token': access_token,'user_data':{
            'id':user_id,
            'username': username,
            'first': first,
            'last': last,
            'avatar': profile_url,
        }}), 201

    except Exception as e:
        if(profile_url!=''):
                delete_file(profile_url)
        return jsonify({'success': False, 'message': 'An error occurred.'}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint to authenticate users and issue a JWT token.
    Requires email and password.
    """
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = get_user(username)
        if not user:
            return jsonify({'success': False, 'message': 'User does not exists.'}), 401
        if not check_password_hash(user['password'], password):
            return jsonify({'success': False, 'message': 'Incorrect credentials.'}), 401

        access_token = create_access_token(identity=user['id'])
        return jsonify({'success': True, 'access_token': access_token,'user_data':{
            'id':user['id'],
            'username': user['username'],
            'first': user['first'],
            'last': user['last'],
            'avatar': user['profileimg'],
        }}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': 'An error occurred'}), 500


@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """
    Example protected route. Requires a valid JWT token.
    """
    return jsonify({'success': True, 'message': 'Access granted.'}), 200