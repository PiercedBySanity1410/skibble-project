from flask_socketio import SocketIO, disconnect, emit
from flask_jwt_extended import decode_token, exceptions as jwt_exceptions
from flask import request
import json
from .config import USER_DB_FILE
from services.time import get_iso_time
socketio = SocketIO(cors_allowed_origins="*",transports=['websocket'])

user_id_to_session_id = {}
session_id_to_user_id = {}
user_data_update_map = {}
@socketio.on('connect')
def handle_connect():
    access_token = request.args.get('accessToken')
    
    if not access_token:
        return disconnect()

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']
        user_id_to_session_id[user_id] = request.sid
        session_id_to_user_id[request.sid] = user_id
        go_online_log={
            "type":"chat:update:online",
            "timestamp": get_iso_time(),
            "userId":user_id
        }
        for uid in user_data_update_map.get(user_id, []):
            emit('updateFromLog', go_online_log, to=user_id_to_session_id.get(uid))
    except jwt_exceptions.JWTDecodeError:
        return disconnect()

@socketio.on('chats:add')
def add_chat(socket_data):
    access_token=socket_data['accessToken']
    if not access_token:
        return disconnect()

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']
        for elem in socket_data['list']:
            if elem not in user_data_update_map:
                user_data_update_map[elem]=set()
            user_data_update_map[elem].add(user_id)
    except jwt_exceptions.JWTDecodeError:
        return disconnect()
    
    
@socketio.on('updateFromLog')
def handle_update_from_log(message_data):
    recipient_user_id = message_data['receiverId']
    recipient_session_id = user_id_to_session_id.get(recipient_user_id)
    if recipient_session_id:
        emit('updateFromLog', message_data, to=recipient_session_id)

@socketio.on('disconnect')
def handle_disconnect():
    session_id = request.sid
    user_id = session_id_to_user_id.pop(session_id, None)
    if not user_id: return
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

