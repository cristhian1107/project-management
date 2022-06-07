#!/usr/bin/python3
"""Initialize the database package.
"""
from database.engine.db_storage import DBStorage


storage = DBStorage()
storage.open_db()
