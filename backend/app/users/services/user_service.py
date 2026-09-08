from ..repositories.user_repository import UserRepository
from ...auth.services.auth_service import AuthService
from datetime import datetime, timezone
from ...users.models.user import User
class UserService:

    def __init__(self):
        self.user_repository = UserRepository

    def create_user(self, user_data):
        auth_service = AuthService()
        user_data = User(**user_data)
        user_data.password_hash = auth_service.get_hash_password(user_data.password_hash)
        user_data.created_at = datetime.now(timezone.utc)
        user_data.status = 1
        user_data.role = "USER"
        user_repository = UserRepository()
        user = user_repository.create(user_data)
        if user:
            return user.id
        return 0