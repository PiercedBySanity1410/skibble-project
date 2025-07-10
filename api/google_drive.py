# google_drive.py

from google.oauth2 import service_account
from googleapiclient.discovery import build

# Google Drive setup
SERVICE_ACCOUNT_FILE = 'service_account.json'
SCOPES = ['https://www.googleapis.com/auth/drive.file']

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
drive_service = build('drive', 'v3', credentials=credentials)

# Optional: Google Drive folder ID to store files
FOLDER_ID = '18e5mgK8TE7l4BsmDW2SSQa8nWCh95a09'  # or leave empty to upload to My Drive