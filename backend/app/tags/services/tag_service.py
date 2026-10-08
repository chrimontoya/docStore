from ...exceptions import DefaultError
from ..repositories.tag_repository import TagRepository
from ..models.tag import Tag
from datetime import datetime

class TagService:

    def __init__(self):
        self.tag_repository = TagRepository()

    def add_tag(self, tag):
        try:
            return self.tag_repository.add_tag(tag)
        except DefaultError:
            raise DefaultError(
                'TAG_ERROR',
                'ERROR AL AGREGAR TAG'
            )

    def add_tags(self, tags):
        try:
            if tags is None:
                raise DefaultError('TAG_ERROR', 'ERROR AL AGREGAR TAGS')

            all_tags = []
            for data in tags:
                tag = Tag()
                tag.name = data['name']
                tag.color = data['color']
                tag.owner_user_id = data['ownerUserId']
                tag.created_at = datetime.now()
                all_tags.append(tag)

            return self.tag_repository.add_tags(all_tags)
        except DefaultError:
            raise DefaultError(
                'TAG_ERROR',
                'ERROR AL AGREGAR TAG'
            )