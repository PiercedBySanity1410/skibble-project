from flask_socketio import SocketIO, disconnect, emit
from flask_jwt_extended import decode_token, exceptions as jwt_exceptions
from flask import request
import json
from .config import USER_DB_FILE
from services.time import get_iso_time
socketio = SocketIO(cors_allowed_origins="*", async_mode="eventlet", transports=['websocket'])  # ✅ Changed

user_id_to_session_id = {}
session_id_to_user_id = {}
user_data_update_map = {}

@socketio.on('chat:online')
def handle_connect(message_data):
    access_token = message_data.get('accessToken', None)
    
    if not access_token:
        print("❌ No access token provided, rejecting connection.")
        return False

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']

        user_id_to_session_id[user_id] = request.sid
        session_id_to_user_id[request.sid] = user_id

        go_online_log = {
            "type": "chat:update:online",
            "timestamp": get_iso_time(),
            "userId": user_id
        }
        for uid in user_data_update_map.get(user_id, []):
            emit('updateFromLog', go_online_log, to=user_id_to_session_id.get(uid))
    except jwt_exceptions.JWTDecodeError:
        print("❌ JWT Decode Error: Invalid Token")
        return False
    except Exception as e:
        print("❌ Unexpected error:", e)
        return False


@socketio.on('chats:add')
def add_chat(socket_data):
    access_token = socket_data.get('accessToken')
    if not access_token:
        return False

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']

        for elem in socket_data.get('list', []):
            if elem not in user_data_update_map:
                user_data_update_map[elem] = set()
            user_data_update_map[elem].add(user_id)

    except jwt_exceptions.JWTDecodeError:
        return True


@socketio.on('updateFromLog')
def handle_update_from_log(message_data):
    recipient_user_id = message_data.get('receiverId')
    recipient_session_id = user_id_to_session_id.get(recipient_user_id)
    if recipient_session_id:
        emit('updateFromLog', message_data, to=recipient_session_id)


@socketio.on('chat:offline')
def handle_explicit_disconnect(message_data):
    access_token = message_data.get('accessToken', None)
    
    if not access_token:
        print("❌ No access token provided, rejecting connection.")
        return False

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']

        user_id_to_session_id[user_id] = request.sid
        if not user_id: return False
        current_time=get_iso_time()
        go_offline_log={
            "type":"chat:update:offline",
            "timestamp":current_time,
            "userId":user_id
        }
        for uid in user_data_update_map.get(user_id, []):
            emit('updateFromLog', go_offline_log, to=user_id_to_session_id.get(uid))
        user_id_to_session_id.pop(user_id, None)
        lines = []
        with open(USER_DB_FILE, 'r') as file:
            lines = file.readlines()  # read all lines
        for i in range(len(lines)):
            user_json = json.loads(lines[i])
            if user_json['userId'] != user_id: continue
            user_json['lastSeen'] = current_time
            lines[i] = json.dumps(user_json) + '\n'  # update list element

        with open(USER_DB_FILE, 'w') as file:
            file.writelines(lines)
    except jwt_exceptions.JWTDecodeError:
        print("❌ JWT Decode Error: Invalid Token")
        return False
    except Exception as e:
        print("❌ Unexpected error:", e)
        return False

@socketio.on('disconnect')
def handle_disconnect():
    session_id = request.sid
    user_id = session_id_to_user_id.pop(session_id, None)
    if not user_id:
        return

    current_time = get_iso_time()
    go_offline_log = {
        "type": "chat:update:offline",
        "timestamp": current_time,
        "userId": user_id
    }

    for uid in user_data_update_map.get(user_id, []):
        recipient_sid = user_id_to_session_id.get(uid)
        if recipient_sid:
            emit('updateFromLog', go_offline_log, to=recipient_sid)

    user_id_to_session_id.pop(user_id, None)

    # ✅ Safe file update
    try:
        with open(USER_DB_FILE, 'r') as file:
            lines = file.readlines()

        for i in range(len(lines)):
            user_json = json.loads(lines[i])
            if user_json.get('userId') == user_id:
                user_json['lastSeen'] = current_time
                lines[i] = json.dumps(user_json) + '\n'

        with open(USER_DB_FILE, 'w') as file:
            file.writelines(lines)

    except FileNotFoundError:
        print(f"[Warning] {USER_DB_FILE} not found.")
