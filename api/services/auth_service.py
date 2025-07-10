from firebase import db
from google.api_core.exceptions import GoogleAPIError
from google.cloud.firestore_v1.base_query import FieldFilter

def get_user(username):
    users_ref = db.collection('users')
    query = users_ref.where(filter=FieldFilter('username', '==', username)).limit(1).stream()
    for doc in query:
        user = doc.to_dict()
        user['id'] = doc.id
        return user
    return None

def get_user_by_id(userid):
    doc_ref = db.collection('users').document(userid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    return None

def set_user(user_id,username, first,last,hashed_password,profileurl):
    try:
        db.collection('users').document(user_id).set({
            'username': username,
            'first': first,
            'last': last,
            'password': hashed_password,
            'profileimg': profileurl,
        })
    except GoogleAPIError as e:
        return False
    return True
