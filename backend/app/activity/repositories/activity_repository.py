from ...config import db

class ActivityRepository:

    def __init__(self):
        pass

    def add_activity(self, activity):
        db.session.add(activity)
        db.session.commit()
        return activity