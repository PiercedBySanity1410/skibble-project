from flask_socketio import SocketIO, emit
from flask_jwt_extended import decode_token, exceptions as jwt_exceptions
from flask import request
from utilities import get_iso_time, set_log, get_logs
from supabase_config import supabase

socketio = SocketIO(cors_allowed_origins="*", async_mode="eventlet", transports=['websocket'])

user_id_to_session_id = {}
session_id_to_user_id = {}
user_data_update_map = {}

def cleanup_user(user_id, reason="disconnect"):
    """Handles user cleanup and emits offline status."""
    if not user_id:
        return

    # Remove from both maps safely
    session_id = user_id_to_session_id.pop(user_id, None)
    if session_id:
        session_id_to_user_id.pop(session_id, None)

    current_time = get_iso_time()
    go_offline_log = {
        "type": "chat:update:offline",
        "timestamp": current_time,
        "userId": user_id
    }

    # Notify all subscribers
    for uid in user_data_update_map.get(user_id, []):
        recipient_sid = user_id_to_session_id.get(uid)
        if recipient_sid:
            emit('updateFromLog', go_offline_log, to=recipient_sid)

    # Update last seen in DB
    supabase.table("users").update({"lastSeen": current_time}).eq("userId", user_id).execute()

    # print(f"🔴 User {user_id} went offline ({reason}) at {current_time}")


@socketio.on('chat:online')
def handle_connect(message_data):
    access_token = message_data.get('accessToken')
    if not access_token:
        print("❌ No access token provided, rejecting connection.")
        return

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']

        # Clean up any old sessions (user might have reconnected)
        cleanup_user(user_id, reason="reconnect")

        # Map user and session
        user_id_to_session_id[user_id] = request.sid
        session_id_to_user_id[request.sid] = user_id

        # print(f"✅ User {user_id} connected at {get_iso_time()}")

        # Send unread logs to this user
        emit('updateFromLog:unread', {"unreadLogs": get_logs(user_id)}, to=request.sid)

        # Notify friends/subscribers about online status
        go_online_log = {
            "type": "chat:update:online",
            "timestamp": get_iso_time(),
            "userId": user_id
        }
        for uid in user_data_update_map.get(user_id, []):
            recipient_sid = user_id_to_session_id.get(uid)
            if recipient_sid:
                emit('updateFromLog', go_online_log, to=recipient_sid)

    except jwt_exceptions.JWTDecodeError:
        print("❌ JWT Decode Error: Invalid Token")
    except Exception as e:
        print(f"❌ Unexpected error on connect: {e}")


@socketio.on('chats:add')
def add_chat(socket_data):
    access_token = socket_data.get('accessToken')
    if not access_token:
        return

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']

        for elem in socket_data.get('list', []):
            user_data_update_map.setdefault(elem, set()).add(user_id)

    except jwt_exceptions.JWTDecodeError:
        print("❌ JWT Decode Error while adding chat.")


@socketio.on('updateFromLog')
def handle_update_from_log(message_data):
    receiver_id = message_data.get('receiverId')
    receiver_session_id = user_id_to_session_id.get(receiver_id)

    if receiver_session_id:
        emit('updateFromLog', message_data, to=receiver_session_id)
    else:
        set_log(message_data, receiver_id)

@socketio.on('updateFromLog:unread:received')
def unread_received(message_data):
    user_id=message_data["userId"]
    supabase.table("userlogs").delete().eq("userId", user_id).execute()

@socketio.on('chat:offline')
def handle_explicit_disconnect(message_data):
    access_token = message_data.get('accessToken')
    if not access_token:
        print("❌ No access token provided for explicit disconnect.")
        return

    try:
        decoded_token = decode_token(access_token)
        user_id = decoded_token['sub']
        cleanup_user(user_id, reason="explicit_offline")
    except jwt_exceptions.JWTDecodeError:
        print("❌ JWT Decode Error on explicit disconnect.")
    except Exception as e:
        print(f"❌ Unexpected error on explicit disconnect: {e}")


@socketio.on('disconnect')
def handle_disconnect():
    session_id = request.sid
    user_id = session_id_to_user_id.pop(session_id, None)
    if user_id:
        user_id_to_session_id.pop(user_id, None)
        cleanup_user(user_id, reason="socket_disconnect")
