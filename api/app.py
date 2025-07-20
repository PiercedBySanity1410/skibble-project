# Skibble | Chat Application
import eventlet
eventlet.monkey_patch()
from flask import Flask, send_from_directory, abort
from flask_jwt_extended import JWTManager
from socket_service import socketio
from routes.auth_routes import auth_bp
from routes.auth_routes import user_bp
from datetime import timedelta
from flask_cors import CORS
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'secretsuperstar'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
CORS(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp,url_prefix='/user')

socketio.init_app(app)
if __name__ == '__main__':
    socketio.run(app, debug=True, host='192.168.1.29')
