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
            from .documents.models.document import Document
            from .documents.models.document_file import DocumentFile
            from .documents.models.document_tag import DocumentTag
            from .folders.models.folder import Folder
            from .tags.models.tag import Tag
            from .activity.models.activity import Activity
            db.create_all()
        else:
            current_app.logger.debug('Conexión a DB OFF')
    return app