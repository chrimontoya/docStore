from ...config import db
from ..domain.document_creation_result import DocumentCreationResult
from ...exceptions import DefaultError

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
