from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from .document_tag import DocumentTag
from ...config import Base
from ...tags.models.tag import Tag
from datetime import datetime

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[int] = mapped_column(primary_key=True)
    owner_user_id: Mapped[int] = mapped_column(ForeignKey("users.id"),nullable=False)
    folder_id: Mapped[int] = mapped_column(nullable=True)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column()
    document_type: Mapped[int] = mapped_column()
    status: Mapped[int] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(nullable=False)
    updated_at: Mapped[datetime] = mapped_column(nullable=False)
    deleted_at: Mapped[datetime] = mapped_column(nullable=True)
    document_tags = relationship(
        DocumentTag,
        back_populates='document'
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "owner_user_id": self.owner_user_id,
            "folder_id": self.folder_id,
            "title": self.title,
            "description": self.description,
            "document_type": self.document_type,
            "status": self.status,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            ),
            "deleted_at": (
                self.deleted_at.isoformat()
                if self.deleted_at
                else None
            ),
        }