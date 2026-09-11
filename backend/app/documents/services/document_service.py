from werkzeug.datastructures import FileStorage, ImmutableMultiDict
from pathlib import Path

from exceptions import DefaultError
from ..validators.document_validator import DocumentValidator
from ..models.document import Document
from ..models.document_file import DocumentFile
from ..models.document_tag import DocumentTag
from datetime import datetime, timezone
from ..repositories.document_respository import DocumentRepository
from ...activity.repositories.activity_repository import ActivityRepository
from ...activity.models.activity import Activity
from ...tags.services.tag_service import TagService
from ...tags.models.tag import Tag
from ...infrastructure.unit_of_work import SQLAlchemyUnitOfWork
import uuid


class DocumentService:

    def __init__(self):
        self.document_repository = DocumentRepository()
        self.tag_service = TagService()
        self.activity_repository = ActivityRepository()
        self.sql = SQLAlchemyUnitOfWork()

    def create(self, files: ImmutableMultiDict[str, FileStorage], formData: ImmutableMultiDict[str,str]):
        try:
            #falta validar la metadata de formdata
            for file in files.getlist('data'): #iterable
                owner_user_id = formData.get('user_id', None)
                folder_id = formData.get('folder_id', None)
                title = formData.get('title', '')
                #validaciones files
                document_validator = DocumentValidator(file)
                document_validator.validate_max_size()
                document_validator.validate_extension()
                detected_mimetype = document_validator.validate_mime_type()
                #create documents
                document = Document()
                document.owner_user_id = int(owner_user_id) if owner_user_id else 1
                document.folder_id = int(formData.get('folder_id', 0))
                document.title = title if title else file.filename[:-4] or ''
                document.description = formData.get('description', '')
                document.document_type = 1
                document.status = 1
                document.created_at = datetime.now(timezone.utc)
                document.updated_at = datetime.now(timezone.utc)

                #create documents file
                #falta esperar id de document
                document_file = DocumentFile()
                document_file.storage_key = str(uuid.uuid4())
                document_file.original_filename = file.filename or ''
                document_file.extension = (
                    Path(file.filename).suffix.lower()
                    if file.filename
                    else ''
                )
                document_file.mime_type = detected_mimetype
                file.seek(0, 2)
                document_file.size_bytes = file.tell()
                file.seek(0)
                document_file.checksum = 'temporal'
                document_file.uploaded_at = datetime.now(timezone.utc)

                tag = Tag()
                tag.owner_user_id = int(formData.get('user_id', 0))
                tag.color = 1
                tag.name = 'Pruebas'
                tag.created_at = datetime.now(timezone.utc)

                added_tag = self.tag_service.add_tag(tag)

                #create documents tag
                document_tag = DocumentTag()
                document_tag.tag_id = added_tag.id
                document_tag.assigned_at = datetime.now(timezone.utc)
                document_tag.assigned_by_user_id = int(formData.get('user_id', 0))

                result = self.document_repository.add_document(document, document_file, document_tag)

                self.activity_repository.add_activity(
                    Activity(
                        actor_user_id=int(owner_user_id) if owner_user_id else None,
                        document_id=result.document.id,
                        folder_id=int(folder_id) if folder_id else None,
                        action=1,
                        details='Prueba',
                        occurred_at=datetime.now(timezone.utc)
                    )
                )

            self.sql.commit()
            return True
        except DefaultError:
            self.sql.rollback()
            raise
        except Exception as exc:
            self.sql.rollback()
            raise DefaultError(
                'DOCUMENT_ERROR',
                'No se pudo crear el documento',
                500
            ) from exc
