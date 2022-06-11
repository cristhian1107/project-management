#!/usr/bin/python3
"""Simple test file.
"""
from database.db_procedure import DBProcedures


class Hola:
    def __init__(self):
        self.id = 0
        self.hola = 'hola'
        self.hhhh = []


hola = Hola()
hola.id = 50
print(hola.__dict__)

uuuser = DBProcedures.users_login('javier.pilco', 'ja-pi')

print(uuuser)
print(uuuser.to_dict())
for oo in uuuser.options:
    print(oo.to_dict())
