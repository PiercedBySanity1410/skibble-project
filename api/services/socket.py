from flask_socketio import SocketIO, disconnect, emit
from flask_jwt_extended import decode_token, exceptions as jwt_exceptions
from flask import request

socketio = SocketIO(cors_allowed_origins="*")

user_id_to_session_id = {}
session_id_to_user_id = {}

@socketio.on('connect')
def handle_connect():
    access_token = request.args.get('accessToken')
    
    if not access_token:
        print("Missing access token")
        return disconnect()

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']
        user_id_to_session_id[user_id] = request.sid
        session_id_to_user_id[request.sid] = user_id
        print(f'User {user_id} connected with session ID {request.sid}')
    except jwt_exceptions.JWTDecodeError:
        print("Invalid JWT")
        return disconnect()

@socketio.on('updateFromLog')
def handle_update_from_log(message_data):
    recipient_user_id = message_data['to']
    sender_user_id = message_data['from']
    message_text = message_data['msg']
    
    recipient_session_id = user_id_to_session_id.get(recipient_user_id)
    
    if recipient_session_id:
        emit('updateFromLog', message_data, to=recipient_session_id)
        print("Message emitted to recipient.")
    else:
        print("Recipient session not found:", message_data)

@socketio.on('disconnect')
def handle_disconnect():
    session_id = request.sid
    user_id = session_id_to_user_id.pop(session_id, None)
    
    if user_id:
        user_id_to_session_id.pop(user_id, None)
    
    print(f'User {user_id} disconnected')
