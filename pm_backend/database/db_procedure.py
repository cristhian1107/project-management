#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from xmlrpc.client import Boolean
from database import storage
from models.user import User
from models.role import Role
from models.option import Option
from models.request import Request


class DBProcedures():

    @staticmethod
    def users_login(user, pwd) -> User:
        """Check if the user exists.

        Args:
            user (str): Username.
            pwd (str): Password.

        Returns:
            User: Information of the user who login.
        """
        new_user = User()
        parameters = []
        parameters.append(user)
        parameters.append(pwd)
        tables = storage.exec_procedure('users_login', parameters)

        if not tables:
            return (None)

        for x in range(0, len(tables)):
            # Info user.
            if x == 0:
                new_user = User(**tables[x][0])
            # Info role.
            if x == 1:
                new_user.role = Role(**tables[x][0])
            # Info options.
            if x == 2:
                for opt in tables[x]:
                    new_user.options.append(Option(**opt))

        return(new_user)

    @staticmethod
    def requests_insert(item=Request()) -> Boolean:
        """Insert new requests

        Args:
            item (Request): New object.

        Returns:
            Boolean: True or False.
        """
        if item is None:
            return (False)
        parameters = item.to_list()
        return (storage.exec_procedure('requests_insert', parameters))
