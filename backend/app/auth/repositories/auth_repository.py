from ...config import db
from ...users.models.user import User
from datetime import datetime, timezone
class AuthRepository:

    def __init__(self):
        pass

    def find_by_email(self, email: str):
        user = db.session.execute(db.select(User).where(User.email == email)).scalar()
        if not user:
            return None
        return user

    def update_last_login_at(self, user):
        user.last_login_at = datetime.now(timezone.utc)
        db.session.commit()
        return True
