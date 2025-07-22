from datetime import datetime, timezone
from supabase_config import supabase
def get_iso_time():
    return datetime.now(timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')


def add_user(username, first, last, hashed_password, avatar_url):
    try:
        user_data = {
            "username": username,
            "firstName": first,
            "lastName": last,
            "passwordHash": hashed_password,
            "avatarUrl": avatar_url,
            "lastSeen": get_iso_time()
        }

        response = supabase.table("users").insert(user_data).execute()

        if response.data:
            return response.data[0]
        return None

    except Exception as e:
        return None


def get_user(filter_param: dict):
    column, value = next(iter(filter_param.items()))
    response = (
        supabase.table("users")
        .select("*")
        .eq(column, value)
        .limit(1)
        .execute()
    )
    if response.data:
        return response.data[0]
    return None
    
def set_log(message_data,receiver_id):
    try:
        log_data={
            "log":message_data,
            "userId":receiver_id,
        }
        response = supabase.table("userlogs").insert(log_data).execute()

        if response.data:
            return True
        return False

    except Exception as e:
        return False
    
def get_logs(user_id: str):
    response = (
        supabase.table("userlogs")
        .select("*")
        .eq("userId", user_id)
        .execute()
    )
    if response.data:
        return response.data
    return []