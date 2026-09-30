from datetime import timedelta

from ...activity.models.activity import Activity
from ...utils import get_init_date
from ..models.document_file import DocumentFile
from ..models.document_tag import DocumentTag
from ...config import db
from ..domain.document_creation_result import DocumentCreationResult
from ...exceptions import DefaultError
from ..models.document import Document
from ...folders.models.folder import Folder
from ...tags.models.tag import Tag

class DocumentRepository:

    def __init__(self):
        pass

    def add_document(self, document, document_file, document_tag):
        try:
            db.session.add(document)
            db.session.flush()
            document_file.document_id = document.id
            document_tag.document_id = document.id
            db.session.add_all([document_file, document_tag])
            return DocumentCreationResult(document, document_file, document_tag)
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)

    def find(self, data = None,pagination: int = 20):
        data = data or {}
        query = (db.select(
            Document.id,
            Document.title,
            Document.description,
            Document.created_at.label("createdAt"),
            Document.updated_at.label("updatedAt"),
            Tag.name.label("tagName"),
            Folder.name.label("folderName"),
            DocumentFile.original_filename.label("originalFilename"),
            DocumentFile.extension.label("extension"),
            DocumentFile.size_bytes.label("sizeBytes"),
            DocumentFile.mime_type.label("mimeType"),
        )
         .join(DocumentTag,DocumentTag.document_id == Document.id)
         .join(Tag,Tag.id == DocumentTag.tag_id)
         .join(DocumentFile, DocumentFile.document_id == Document.id)
         .outerjoin(Folder, Folder.id == Document.folder_id)
         .where(Document.status==1)
        )

        if data.get('folder_id'):
            query = query.join(Folder, Folder.id == Document.folder_id)
            query = query.where(Folder.id == int(data.get('folder_id')))
        if data.get('tag_id'):
            query = query.where(Tag.id == int(data.get('tag_id')))
        if data.get('document_type'):
            query = query.where(Document.document_type == int(data.get('document_type')))
        if data.get('title'):
            query = query.where(Document.title.like(f"%{data.get('title')}%"))
        if data.get('original_filename'):
            query = query.where(DocumentFile.original_filename.like(f"%{data.get('original_filename')}%"))
        if data.get('created_at'):
            query = query.where(
                Document.created_at >= get_init_date(data.get('created_at')),
                Document.created_at < get_init_date(data.get('created_at')) + timedelta(days=1),
            )

        session = db.session.execute(query).mappings()

        if pagination > 0:
            session = session.fetchmany(pagination)

        return [dict(row) for row in session]

    def get_document_detail(self, id: int):
        try:
            #PENDIENTE FITLRAR POR USUARIO
            return db.session.execute(
                db.select(
                    Document.id,
                    Document.title,
                    DocumentFile.original_filename,
                    DocumentFile.mime_type,
                    DocumentFile.extension,
                    DocumentFile.size_bytes,
                    Folder.name.label("folder_name"),
                    Tag.name.label("tag_name"),
                    Document.created_at,
                    Document.status,
                    Activity.details,
                )
                .select_from(Document)
               .join(DocumentFile, DocumentFile.document_id == Document.id)
                .outerjoin(DocumentTag, DocumentTag.document_id == DocumentFile.document_id)
                .outerjoin(Folder, Folder.id == Document.folder_id)
                .outerjoin(Activity, Activity.document_id == DocumentTag.document_id)
                .where(Document.id == id)
            ).mappings().all()
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)

    def find_doc_file_by_id(self, id: int):
        try:
            return db.session.execute(
                db.select(DocumentFile)
                .join(Document, Document.id == DocumentFile.document_id)
                .where(DocumentFile.document_id == id)
                .where(Document.status == 1)
            ).scalar_one()
        except Exception as e:
            db.session.rollback()
            raise DefaultError('SQLERROR', str(e), 500)