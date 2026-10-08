from ...config import db
from ...exceptions import DefaultError
class TagRepository:

    def __init__(self):
        pass

    def add_tag(self, tag):
        try:
            db.session.add(tag)
            db.session.flush()
            return tag
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)

    def add_tags(self, tags):
        try:
            db.session.add_all(tags)
            db.session.commit()
            return tags
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)
