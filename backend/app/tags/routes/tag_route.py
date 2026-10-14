from flask import Blueprint, request, current_app
from ..services.tag_service import TagService

bp_tag = Blueprint("tags", __name__, url_prefix="/tags")

@bp_tag.route("", methods=["POST"])
def create_tag():
    data = request.get_json()
    tag_service = TagService()
    res = tag_service.add_tags(data)
    if not res:
        return "error", 400
    return [tag.to_dict() for tag in res], 200

@bp_tag.route("/", methods=["GET"])
def get_all():
    tag_service = TagService()
    tags = tag_service.get_all()
    return tags, 200

@bp_tag.route("/<id>", methods=["DELETE"])
def delete(id):
    tag_service = TagService()
    res = tag_service.delete(id)
    return res, 200