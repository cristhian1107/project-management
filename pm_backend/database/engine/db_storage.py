#!/usr/bin/python3
"""Contains:
    (class) DBStorage.
"""
import mysql.connector


class DBStorage:
    """Class that interacts with the MySQL database.
    """
    __cursor = None
    __connector = None

    def __init__(self):
        """Initialize a new instance of the class.
        """
        self.__connector = mysql.connector.connect(
            user='development',
            password='dev_pwd(001)',
            host='localhost',
            database='project_management'
        )
        self.__connector.autocommit = False

    def open_db(self):
        try:
            self.__cursor = self.__connector.cursor(dictionary=True)
        except mysql.connector.Error as error:
            print(error)
        # finally:
        #     self.__connector.close()

    def close_db(self):
        if self.__connector.is_connected():
            self.__cursor.close()
            self.__connector.close()
            print("Connection is closed")

    def exec_procedure(self, name, parameters=[]):
        try:
            result = self.__cursor.callproc(name, parameters)
            self.__connector.commit()
            return result
        except mysql.connector.Error as error:
            self.__connector.rollback()
            print(error)
