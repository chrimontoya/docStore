import os
import re
import unicodedata
from werkzeug.datastructures import FileStorage


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
            raise Exception

    def validate_extension(self):
        if not self.file.filename[-4:] in self.extensions_accepted:
            raise Exception

    def validate_mime_type(self):
        if self.file.mimetype not in self.mime_types_accepted:
            raise Exception

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
