from ...config import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(300), unique=True)
    display_name: Mapped[str] = mapped_column(String(30))
    password_hash: Mapped[str] = mapped_column(String(300))
    role: Mapped[str] = mapped_column(String(5))
    status: Mapped[int] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False)
    last_login_at: Mapped[datetime] = mapped_column(nullable=True)

