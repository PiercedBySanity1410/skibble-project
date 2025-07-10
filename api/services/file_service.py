from google_drive import drive_service

def delete_file(file_id):
    try:
        drive_service.files().delete(fileId=file_id).execute()
    except Exception as e:
        return False
    return True