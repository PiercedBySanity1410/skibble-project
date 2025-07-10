from firebase import db
def search_user(username,my_id=''):
    search_input = username.lower()
    users_ref = db.collection('users')
    all_users = users_ref.stream()

    matching_users = []

    for doc in all_users:
        user_data = doc.to_dict()
        username = user_data.get('username', '')
        if search_input in username.lower() and my_id !=doc.id:  # case-insensitive substring check
            user_data["id"]=doc.id
            matching_users.append(user_data)

    return matching_users