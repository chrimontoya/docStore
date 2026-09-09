from flask import Flask, current_app
from .config import DatabaseConfig, db, JWTConfig
from sqlalchemy import text
from flask_jwt_extended import JWTManager
from .auth.routes.auth_route import bp_auth
from .error_handlers import register_error_handlers
def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp_auth)
    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    jwt = JWTManager(app)

    app.config.from_object(DatabaseConfig)
    app.config.from_object(JWTConfig)
    register_error_handlers(app)
    db.init_app(app)
    with app.app_context():
        res = db.session.execute(text("SELECT 1")).scalar()
        if res == 1:
            current_app.logger.debug('Conexión a DB ON')
            from .users.models.user import User
            db.create_all()
        else:
            current_app.logger.debug('Conexión a DB OFF')
    return app