from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from ...config import Base

class DocumentTag(Base):
    __tablename__ = "document_tag"
    document_id: Mapped[int] = mapped_column(ForeignKey("documents.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True)
    assigned_at: Mapped[datetime] = mapped_column()
    assigned_by_user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))