from datetime import datetime, timezone

def get_iso_time():
    now = datetime.now(timezone.utc)
    return now.isoformat(timespec='milliseconds').replace('+00:00', 'Z')
