#!/usr/bin/python3
"""Contains:
    (class) DBStorage.
"""
import mysql.connector
import traceback
from general.library import Libraries


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
                                    host='127.0.0.1',
                                    database='project_management')

        self.__connector.autocommit = False

    def open_db(self):
        """Open the connection to the MySQL Database.
        """
        try:
            self.__cursor = self.__connector.cursor(dictionary=True)
            # Libraries.write_log('Connection is open MySQL')
        except mysql.connector.Error as error:
            Libraries.write_log(error.msg, traceback.format_exc())

    def close_db(self):
        """Close the connection to the MySQL Database.
        """
        if self.__connector.is_connected():
            self.__cursor.close()
            self.__connector.close()
            # Libraries.write_log('Connection is closed MySQL')

    def exec_procedure(self, name, parameters=[]):
        """Execute a stored procedure on the MySQL Database.

        Args:
            name (str): Stored procedure name.
            parameters (list): Sorted parameter list.

        Returns:
            list: Return the result of the procedure.
        """
        records = []
        try:
            self.__cursor.callproc(name, parameters)
            for result in self.__cursor.stored_results():
                data = result.fetchall()
                if data:
                    records.append(data)
            self.__connector.commit()
            return (records)
        except mysql.connector.Error as error:
            self.__connector.rollback()
            Libraries.write_log(error.msg, traceback.format_exc())
            return (records)
        finally:
            self.close_db()

    def exec_save(self, name, parameters=[]):
        """Execute a stored procedure on the MySQL Database.

        Args:
            name (str): Stored procedure name.
            parameters (list): Sorted parameter list.

        Returns:
            bool: True or False.
        """
        is_correct = False
        try:
            outputs = self.__cursor.callproc(name, parameters)
            if outputs:
                outs = list(outputs.values())
                parameters[0] = outs[0]
            self.__connector.commit()
            if self.__cursor.rowcount > 0:
                is_correct = True
            return (is_correct)
        except mysql.connector.Error as error:
            self.__connector.rollback()
            Libraries.write_log(error.msg, traceback.format_exc())
            return (is_correct)
        finally:
            self.close_db()

    def exec_multi_save(self, name, items=[]):
        """Execute a stored procedure on the MySQL Database.

        Args:
            name (str): Stored procedure name.
            items (list): List items.

        Returns:
            bool: True or False.
        """
        is_correct = False
        try:
            for item in items:
                parameters = item.to_list()
                outputs = self.__cursor.callproc(name, parameters)
                if outputs:
                    outs = list(outputs.values())
                    item.request_id = outs[0]
                if self.__cursor.rowcount > 0:
                    is_correct = True

            if is_correct:
                self.__connector.commit()
                return (is_correct)
            else:
                self.__connector.rollback()
                return (is_correct)
        except mysql.connector.Error as error:
            self.__connector.rollback()
            Libraries.write_log(error.msg, traceback.format_exc())
            return (is_correct)
        finally:
            self.close_db()
