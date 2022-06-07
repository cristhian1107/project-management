#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from database import storage
from models.user import User
from models.role import Role
from models.option import Option


class DBProcedures():

    @staticmethod
    def users_login(user, pwd) -> User:
        """

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
