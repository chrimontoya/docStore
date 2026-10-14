from ..models.tag import Tag
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

    def get_all(self):
        try:
            tags = db.session.query(Tag).all()
            return tags
        except DefaultError as e:
            raise DefaultError('SQLERROR', str(e), 500)

    def delete(self, id):
        try:
            tag = db.session.get(Tag, id)

            if not tag:
                raise DefaultError('SQLERROR', str(tag), 500)

            db.session.delete(tag)
            db.session.commit()
            return tag
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)

