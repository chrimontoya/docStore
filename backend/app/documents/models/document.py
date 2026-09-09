from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped
from ...config import Base
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