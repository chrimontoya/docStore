from flask import Blueprint, current_app, request
from ..services.document_service import DocumentService

bp_document = Blueprint('documents', __name__, url_prefix='/documents')

@bp_document.route("", methods=['POST'])
def upload():
    document_service = DocumentService()
    document_service.create(request.files, request.form)

    return "ok", 200

@bp_document.route("", methods=['GET'])
def get_all():
    document_service = DocumentService()
    return document_service.find(request.args), 200