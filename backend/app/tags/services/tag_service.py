from ...exceptions import DefaultError
from ..repositories.tag_repository import TagRepository

class TagService:

    def __init__(self):
        self.tag_repository = TagRepository()

    def add_tag(self, tag):
        try:
            return self.tag_repository.add_tag(tag)
        except DefaultError:
            raise DefaultError