from flask import Flask, current_app
from .config import DatabaseConfig, db
from sqlalchemy import text

def create_app():
    app = Flask(__name__)
    app.config.from_object(DatabaseConfig)
    db.init_app(app)
    with app.app_context():
        res = db.session.execute(text("SELECT 1")).scalar()
        if res == 1:
            current_app.logger.debug('Conexión a DB ON')
        else:
            current_app.logger.debug('Conexión a DB OFF')
    return app