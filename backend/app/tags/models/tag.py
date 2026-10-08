from datetime import datetime
from typing import List

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ...config import Base

class Tag(Base):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(primary_key=True)
    owner_user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)
    color: Mapped[int] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False)
    deleted_at: Mapped[datetime] = mapped_column(nullable=True)
    document_tags = relationship(
        'DocumentTag',
        back_populates='tag',
    )

    def to_dict(self):
        return {
            "id": self.id,
            "ownerUserId": self.owner_user_id,
            "name": self.name,
            "color": self.color,
            "created_at": self.created_at,
            "deletedAt": self.deleted_at,
        }