from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..services.auth_service import AuthService
from ...users.services.user_service import UserService
from ...exceptions import DefaultError

bp_auth = Blueprint( 'auth',__name__, url_prefix='/auth')

@bp_auth.route("/login", methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    auth_service = AuthService()
    user_authenticated = auth_service.authenticate(username, password)
    if not user_authenticated:
        raise DefaultError(status_code=401, message="Usuario o contraseña incorrecta", code="UNAUTHORIZED")

    #update last login at
    auth_service.update_last_login_at(user_authenticated)
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

