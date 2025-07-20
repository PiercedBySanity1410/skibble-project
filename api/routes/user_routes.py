from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utilities import get_user
from socket_service import user_id_to_session_id
from supabase_config import supabase
user_bp = Blueprint('user', __name__)

def user_data(user):
    return {
        "userId": user["userId"],
        "username": user["username"],
        "avatarUrl": user["avatarUrl"],
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "lastSeen": user["lastSeen"],
        "isOnline": user["userId"] in user_id_to_session_id
    }


@user_bp.route('/search', methods=['POST'])
@jwt_required()
def search():
    data = request.get_json()
    keyword = data.get('keyword', '').strip().lower()
    if not keyword:
        return jsonify({'success': False, 'data': []}), 400

    search_terms = keyword.split()
    current_user_id = get_jwt_identity()
    
    response = (
        supabase.table("users")
        .select("*")
        .neq("userId", current_user_id)
        .execute()
    )

    if not response.data:
        return jsonify({'success': False, 'data': []}), 200

    user_list = []
    for user in response.data:
        user_values = f"{user.get('username', '')}{user.get('firstName', '')}{user.get('lastName', '')}".lower()
        if all(term in user_values for term in search_terms):
            user_list.append(user_data(user))

    return jsonify({'success': len(user_list) > 0, 'data': user_list}), 200


@user_bp.route('/searchbyid', methods=['POST'])
def searchbyid():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({'success': False, 'data': None}), 400

    user = get_user({"userId":user_id})
    if not user:
        return jsonify({'success': False, 'data': None}), 422
    return jsonify({'success': True, 'data': user_data(user)}), 200
