import json
import os

USER_DB_FILE = 'usersDB.log'

def set_user(user_id, username, first, last, hashed_password, profileurl):
    user_data = {
        'userId': user_id,
        'username': username,
        'firstName': first,
        'lastName': last,
        'passwordHash': hashed_password,
        'avatarUrl': profileurl,
        'lastSeen':"",
    }
    try:
        with open(USER_DB_FILE, 'a') as f:
            f.write(json.dumps(user_data) + '\n')
        return True
    except Exception as e:
        return False

def get_user_by_id(userid):
    with open(USER_DB_FILE, 'r') as f:
        for line in f:
            try:
                user = json.loads(line)
                if user.get('userId') == userid:
                    return user
            except json.JSONDecodeError:
                continue
    return None

def get_user(txt):
    txt = txt.lower()
    with open(USER_DB_FILE, 'r') as f:
        for line in f:
            try:
                user = json.loads(line)
                # Check if the username exists in any value
                if user['username'] == txt:
                    return user
            except json.JSONDecodeError:
                continue
    return None
