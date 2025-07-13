import json
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from services import get_user_by_id
from services.socket import user_id_to_session_id

user_bp = Blueprint('user', __name__)
USER_DB_FILE = 'usersDB.log'


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
    user_list = []

    with open(USER_DB_FILE, 'r') as f:
        for line in f:
            try:
                user = json.loads(line)
                if user.get('userId') == current_user_id:
                    continue

                user_values = " ".join(str(value).lower() for value in user.values())
                if all(term in user_values for term in search_terms):
                    user_list.append(user_data(user))
            except json.JSONDecodeError:
                continue

    return jsonify({'success': len(user_list) > 0, 'data': user_list}), 200


@user_bp.route('/searchbyid', methods=['POST'])
def searchbyid():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({'success': False, 'payload': None}), 400

    user = get_user_by_id(user_id)
    if not user:
        return jsonify({'success': False, 'payload': None}), 422

    return jsonify({'success': True, 'payload': user_data(user)}), 200
