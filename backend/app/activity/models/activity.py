from datetime import datetime
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column
from ...config import Base

class Activity(Base):
    __tablename__ = "activity"
    id: Mapped[int] = mapped_column(primary_key=True)
    actor_user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    document_id: Mapped[int] = mapped_column(ForeignKey("documents.id"), nullable=True)
    folder_id: Mapped[int] = mapped_column(ForeignKey("folders.id"), nullable=True)
    action: Mapped[int] = mapped_column(nullable=False)
    details: Mapped[str] = mapped_column(String())
    occurred_at: Mapped[datetime] = mapped_column()