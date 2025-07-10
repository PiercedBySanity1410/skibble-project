from flask_socketio import SocketIO, disconnect,emit
from flask_jwt_extended import decode_token, exceptions as jwt_exceptions
from flask import request

socketio = SocketIO(cors_allowed_origins="*")

id_to_sid = {}
sid_toid={}
@socketio.on('connect')
def handle_connect():
    token = request.args.get('token')
    
    if not token:
        print("Missing token")
        return disconnect()

    try:
        decoded = decode_token(token)
        identity = decoded['sub']
        id_to_sid[identity] = request.sid
        sid_toid[request.sid]=identity
        print(f'User {identity} connected with sid {request.sid}')
    except jwt_exceptions.JWTDecodeError:
        print("Invalid JWT")
        return disconnect()

@socketio.on('updateFromLog')
def handle_message(data):
    receiver = data['to']
    sender= data['from']
    txt=data['msg']
    target_sid = id_to_sid.get(receiver)
    
    if target_sid:
        emit('updateFromLog', data, to=target_sid)
        print("reached");
    else:
        print(data)
        
        
@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    username = id_to_sid.pop(sid, None)
    if username:
        sid_toid.pop(username, None)
    print(f'User {username} disconnected')
