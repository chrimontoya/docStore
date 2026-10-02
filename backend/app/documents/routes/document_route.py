import json

from flask import Blueprint, current_app, request
from ..services.document_service import DocumentService

bp_document = Blueprint('documents', __name__, url_prefix='/documents')

@bp_document.route("", methods=['POST'])
def upload():
    document_service = DocumentService()
    current_app.logger.debug(request.form)
    document_service.create(request.files, request.form)

    return "ok", 200

@bp_document.route("", methods=['GET'])
def get_all():
    document_service = DocumentService()
    from flask import current_app
    current_app.logger.debug(request.args)
    return document_service.find(request.args), 200

@bp_document.route("/<id>", methods=['GET'])
def get(id: int = 0):
    document_service = DocumentService()
    document_detail = document_service.get_document_detail(int(id))
    if not document_detail:
        return "error", 400
    return document_detail, 200

@bp_document.route("/<id>/content", methods=['GET'])
def get_content(id: int = 0):
    document_service = DocumentService()
    return document_service.get_content_file(int(id)), 200

@bp_document.route("/<id>/disable", methods=['PATCH'])
def update(id: int = 0):
    data = request.get_json()
    if not data or not data.get("status"):
        return "error", 400

    document_service = DocumentService()
    document_service.update_document(int(id), data.get("status"))
    message = "Documento movido a la papelera"

    if data.get("status") == 'ACTIVE':
        message = "Documento restaurado"
    return {"message": message}, 200

@bp_document.route("/<id>", methods=['DELETE'])
def delete(id: int):
    document_service = DocumentService()
    result = document_service.delete_document(int(id))
    return {"message": "Documento eliminado completamente"}, 200