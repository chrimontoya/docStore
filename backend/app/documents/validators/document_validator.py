import os, mimetypes
import re
import unicodedata
from werkzeug.datastructures import FileStorage
from ...exceptions import DefaultError
class DocumentValidator:
    def __init__(self, file: FileStorage):
        self.file = file
        self.extensions_accepted = ['.pdf', '.jpg', '.txt']
        self.mime_types_accepted = ['application/pdf', 'image/jpeg', 'text/plain']

    def validate_max_size(self):
        self.file.seek(0, 2)
        file_length = self.file.tell()
        self.file.seek(0)
        if file_length < 0:
            raise DefaultError('DOCUMENT_ERROR', 'Error al validar max size documento', 500)

    def validate_extension(self):
        if not self.file.filename[-4:] in self.extensions_accepted:
            raise DefaultError('DOCUMENT_ERROR', 'Error al validar extensión documento', 500)

    def validate_mime_type(self):
        received_mime = self.file.mimetype

        if received_mime == 'application/octet-stream':
            detected_mime, _ = mimetypes.guess_type(self.file.filename)
        else:
            detected_mime = received_mime

        if detected_mime not in self.mime_types_accepted:
            raise DefaultError(
                'DOCUMENT_ERROR',
                f'Error al validar mimeType documento {detected_mime}',
                400
            )
        return detected_mime

    def sanitize_filename(self, filename: str, max_length: int = 150) -> str:
        filename = os.path.basename(filename)
        filename = unicodedata.normalize("NFKD", filename)
        filename = filename.encode("ascii", "ignore").decode("ascii")
        filename = re.sub(r"[^a-zA-Z0-9.\-_]", "-", filename)
        filename = re.sub(r"-+", "-", filename)
        filename = filename.strip("-")

        name, ext = os.path.splitext(filename)
        if len(name) > max_length - len(ext):
            name = name[: max_length - len(ext)]
        filename = name + ext

        if not filename or filename == ".":
            filename = "unnamed"

        return filename

    def get_safe_name(self):
        if self.file.filename:
            return self.sanitize_filename(self.file.filename)
        return self.file.filename
