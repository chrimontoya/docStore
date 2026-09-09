from flask import Flask, jsonify
from .exceptions import DefaultError

def register_error_handlers(app: Flask):
    @app.errorhandler(DefaultError)
    def handle_default_error(error: DefaultError):
        return jsonify({
            "error": {
                "code": error.code,
                "message": error.message
            }
        }), error.status_code