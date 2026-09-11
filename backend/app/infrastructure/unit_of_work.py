from ..config import db

class SQLAlchemyUnitOfWork:

    def commit(self) -> None:
        db.session.commit()

    def rollback(self) -> None:
        db.session.rollback()