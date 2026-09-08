from ...config import db
from ...users.models.user import User
class AuthRepository:

    def __init__(self):
        pass

    def find_by_email(self, email: str):
        user = db.session.execute(db.select(User).where(User.email == email)).scalar()
        if not user:
            return None
        return user