#!/usr/bin/python3
"""Initialize the database package.
"""
from database.engine.db_storage import DBStorage


storage = DBStorage()
storage.open_db()

tables = {
    'TAB': 1,
    'TYP': 2,
    'STA': 3,
    'PRI': 4
}
