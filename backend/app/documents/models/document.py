from typing import List
from unittest import case

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
        back_populates="document",
        cascade="all, delete-orphan",
    )

    document_file = relationship(
        "DocumentFile",
        back_populates="document",
        uselist=False,
        cascade="all, delete-orphan",
    )

    activities = relationship(
        "Activity",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "ownerUserId": self.owner_user_id,
            "folderId": self.folder_id,
            "title": self.title,
            "description": self.description,
            "documentType": self.document_type,
            "status": self.status,
            "createdAt": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updatedAt": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            ),
            "deletedAt": (
                self.deleted_at.isoformat()
                if self.deleted_at
                else None
            ),
        }