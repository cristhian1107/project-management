#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from database import storage
from models.user import User


class DBProcedures():

    @staticmethod
    def users_login(user, pwd) -> User:
        """_summary_

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
        result = storage.exec_procedure('users_login', parameters)
        print(result);
        dict_user = result[0][0]
        if result:
            new_user = User(**dict_user)
        return(new_user)
