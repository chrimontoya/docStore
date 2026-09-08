from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..services.auth_service import AuthService
from ...users.services.user_service import UserService

bp_auth = Blueprint( 'auth',__name__, url_prefix='/auth')

@bp_auth.route("/login", methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    auth_service = AuthService()
    if not auth_service.authenticate(username, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@bp_auth.route("/register", methods=['POST'])
def register():
    json_data = request.get_json()
    user_service = UserService()
    return jsonify({"msg": user_service.create_user(json_data)}), 200

@bp_auth.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

