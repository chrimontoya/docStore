from flask import Config
from os import getenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class DatabaseConfig(Config):
    SQLALCHEMY_DATABASE_URI = getenv(
        "DB_URI",
        f"mssql+pymssql://{getenv('DB_USER', 'test')}:{getenv('DB_PASS', 'test')}@{getenv('DB_HOST', 'database:1433')}/{getenv('DB_NAME', 'DB_DOCSTORE')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

db = SQLAlchemy(model_class=Base)

class JWTConfig(Config):
    JWT_SECRET_KEY = 'secret.key.1234'