from ..repositories.auth_repository import AuthRepository
import bcrypt
class AuthService:

    def __init__(self):
        self.auth_repository = AuthRepository()

    def authenticate(self, username:str, password: str):
        user = self.auth_repository.find_by_email(email=username)
        if not user:
            return None
        if not self.verify_hash_password(password, user.password_hash):
            return None
        return user

    def get_hash_password(self, password: str):
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed.decode('utf-8')

    def verify_hash_password(self,password:str, hashed_password: str):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

    def update_last_login_at(self, user):
        return self.auth_repository.update_last_login_at(user)