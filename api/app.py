import eventlet
# ✅ Use eventlet or gevent for WebSocket support
eventlet.monkey_patch()
# Skibble | Chat Application
from flask import Flask, send_from_directory, abort
from flask_jwt_extended import JWTManager
from services import socketio
from routes import auth_bp,user_bp
from datetime import timedelta
from flask_cors import CORS
import os
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'touka'  # Use a strong secret in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
CORS(app)
jwt = JWTManager(app)
# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp,url_prefix='/user')

# Route to serve files from any subfolder inside 'uploads'
@app.route('/uploads/<path:subpath>/<filename>')
def serve_uploaded_file(subpath, filename):
    directory = os.path.join('uploads', subpath)
    return send_from_directory(directory, filename)

socketio.init_app(app)
if __name__ == '__main__':
    socketio.run(app, debug=True, host='192.168.1.29')
