from flask import Flask
from flask_jwt_extended import JWTManager
from socket_services import socketio
from routes import auth_bp,file_bp,user_bp
from datetime import timedelta
from flask_cors import CORS
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'Alaska'  # Use a strong secret in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
CORS(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(file_bp,url_prefix='/file')
app.register_blueprint(user_bp,url_prefix='/user')
socketio.init_app(app)
if __name__ == '__main__':
    socketio.run(app, debug=True)
