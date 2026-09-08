from ...config import db

class UserRepository:

    def __init__(self):
        pass

    def create(self, user_data):
        db.session.add(user_data)
        db.session.commit()
        return user_data