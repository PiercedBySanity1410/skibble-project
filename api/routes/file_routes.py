from flask import jsonify,Blueprint,Response,stream_with_context, request
import requests
from google_drive import drive_service
from services import delete_file

file_bp = Blueprint('file', __name__)
@file_bp.route('/alllist', methods=['GET'])
def alllist():
    files = []
    page_token = None

    while True:
        response = drive_service.files().list(
            spaces='drive',
            fields='nextPageToken, files(id, name, mimeType)',
            pageToken=page_token
        ).execute()

        files.extend(response.get('files', []))
        page_token = response.get('nextPageToken', None)

        if page_token is None:
            break
    return jsonify(files),200
@file_bp.route('/delete-files', methods=['GET'])
def delete_files_in_folder():
    deleted_files = []
    failed_deletions = []
    page_token = None

    try:
        while True:
            response = drive_service.files().list(
                spaces='drive',
                fields='nextPageToken, files(id, name)',
                pageToken=page_token
            ).execute()

            files = response.get('files', [])
            page_token = response.get('nextPageToken', None)

            for file in files:
                if(delete_file(file['id'])):
                    deleted_files.append(file['name'])
                else:
                    failed_deletions.append({'file': file['name']})

            if page_token is None:
                break

        return jsonify({
            'deleted_files': deleted_files,
            'failed_deletions': failed_deletions
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_drive_stream(file_id):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    r = requests.get(url, stream=True, headers=headers)
    r.raise_for_status()
    return r
@file_bp.route('/stream/<file_id>', methods=['GET'])
def stream_file(file_id):
    try:
        r = get_drive_stream(file_id)
        # Stream the response from Google Drive to client
        return Response(
            stream_with_context(r.iter_content(chunk_size=4096)),
            content_type=r.headers.get("Content-Type", "application/octet-stream"),
            headers={
                "Content-Disposition": 'inline',
                "Content-Length": r.headers.get("Content-Length", ""),
            }
        )
    except requests.HTTPError as e:
        return f"Failed to stream file: {e}", 500