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
            return response.data[0]  # return inserted user
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
    