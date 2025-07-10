from flask import Blueprint, jsonify,request
from flask_jwt_extended import jwt_required,get_jwt_identity
from services import get_user_by_id,search_user
from socket_services import id_to_sid
# Define authentication blueprint
user_bp = Blueprint('user', __name__)

@user_bp.route('/init-data', methods=['POST'])
@jwt_required()
def initData():
    user_id= get_jwt_identity()
    user=get_user_by_id(user_id)
    if not user:
        return jsonify({'success': False, 'payload': None}), 422
    return jsonify({'success': True, 'payload': {'profileImgId':user['profileimg'],'chats':[]}}), 200

@user_bp.route('/searchbyid', methods=['POST'])
def searchbyid():
    data = request.get_json()
    user_id = data.get('user_id')
    user=get_user_by_id(user_id)
    if not user:
        return jsonify({'success': False, 'payload': None}), 422
    return jsonify({'success': True, 'payload': {    "id": user_id,
    "username": user["username"],
    "avatar": user["profileimg"],
    "firstName": user["first"],
    "lastName": user["last"],
    "isOnline": user_id in id_to_sid,}}), 200

@user_bp.route('/search', methods=['POST'])
@jwt_required()
def search():
    data = request.get_json()
    username = data.get('username')
    user_id=get_jwt_identity()
    user_list=search_user(username,user_id)
    return jsonify({'success': len(user_list)>0, 'data': user_list}), 200
