from flask import Blueprint, current_app, request
from ..validators.document_validator import DocumentValidator

bp_document = Blueprint('documents', __name__, url_prefix='/documents')

@bp_document.route("", methods=['POST'])
def upload():
    if request.files:
        for file in request.files.getlist('data'): #iterable
            document_validator = DocumentValidator(file)
            document_validator.validate_max_size()
            document_validator.validate_extension()
            document_validator.validate_mime_type()
    return "ok", 200