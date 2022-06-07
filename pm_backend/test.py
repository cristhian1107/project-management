#!/usr/bin/python3
"""Simple test file.
"""
from database.db_procedure import DBProcedures


print(DBProcedures.users_login('hola', 'mundo'))
