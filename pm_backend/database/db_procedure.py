#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from msilib.schema import Error
from database.engine.db_storage import DBStorage
from models.user import User
from models.role import Role
from models.option import Option
from models.request import Request
from models.request_event import RequestEvent
from models.table import Table
from models.companie import Companie
from general.library import Libraries
import traceback


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
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            new_user = User()
            parameters = []
            parameters.append(user)
            parameters.append(pwd)
            storage.open_db()
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
            return (new_user)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def users_one(id) -> User:
        """Get one user by id.

        Args:
            user (int): Id user.

        Returns:
            User: Information of the user who login.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            new_user = User()
            parameters = []
            parameters.append(id)
            storage.open_db()
            tables = storage.exec_procedure('users_one', parameters)

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
            return (new_user)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def requests_insert(item=Request()) -> bool:
        """Insert new requests

        Args:
            item (Request): New object.

        Returns:
            bool: True or False.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            if item is None:
                return (False)
            storage.open_db()
            parameters = item.to_list()
            is_correct = storage.exec_save('requests_insert', parameters)
            # Recovery id.
            if parameters:
                item.id = parameters[0]
            return (is_correct)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (False)
        finally:
            del storage

    @staticmethod
    def requests_events_insert(item=RequestEvent()) -> bool:
        """Insert new requests events.

        Args:
            item (RequestEvent): New object.

        Returns:
            bool: True or False.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            if item is None:
                return (False)
            storage.open_db()
            parameters = item.to_list()
            return (storage.exec_save('requests_events_insert', parameters))
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (False)
        finally:
            del storage

    @staticmethod
    def requests_update(item=Request()) -> bool:
        """Update new requests

        Args:
            item (Request): New object.

        Returns:
            bool: True or False.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            if item is None:
                return (False)
            storage.open_db()
            parameters = item.to_list()
            return (storage.exec_save('requests_update', parameters))
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (False)
        finally:
            del storage

    @staticmethod
    def requests_all(date_begin, date_end, company_id, department) -> list:
        """All requests.

        Args:
            date_begin (dtm): Filter by date begin.
            date_end (dtm): Filter by date end.
            company_id (long): Filter by company.
            department (str): Filter by department.

        Returns:
            list: List of contain all requests
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            item = Request()
            items = []
            parameters = []
            parameters.append(date_begin)
            parameters.append(date_end)
            parameters.append(company_id)
            parameters.append(department)
            storage.open_db()
            tables = storage.exec_procedure('requests_all', parameters)

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                for opt in tables[x]:
                    item = Request(**opt)
                    items.append(item.to_dict())
            return (items)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def requests_one(id, details=False) -> Request:
        """Get one record request.

        Args:
            id (long): Filter by id.

        Returns:
            Request: object request.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            item = Request()
            parameters = []
            parameters.append(id)
            parameters.append(details)
            storage.open_db()
            tables = storage.exec_procedure('requests_one', parameters)

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                # Info request.
                if x == 0:
                    item = Request(**tables[x][0])
                # Info states.
                if x == 1:
                    for opt in tables[x]:
                        item.states.append(RequestEvent(**opt))
            return (item)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def tables_all(table, all_records=False) -> list:
        """Get one table type.

        Args:
            id (long): Filter by id.

        Returns:
            list: List of contain all tables.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            item = Table()
            items = []
            parameters = []
            parameters.append(table)
            parameters.append(all_records)
            storage.open_db()
            tables = storage.exec_procedure('tables_all', parameters)

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                for opt in tables[x]:
                    item = Table(**opt)
                    items.append(item.to_dict())
            return (items)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def companies_all() -> list:
        """Get all companies.

        Returns:
            list: List of contain all companies.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            item = Companie()
            items = []
            storage.open_db()
            tables = storage.exec_procedure('companies_all')

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                for opt in tables[x]:
                    item = Companie(**opt)
                    items.append(item.to_dict())
            return (items)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def departments_all(company_id=None) -> list:
        """Get all departments by company.

        Args:
            id (long): Filter by id.

        Returns:
            list: List of contain all departments.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            items = []
            parameters = []
            parameters.append(company_id)
            storage.open_db()
            tables = storage.exec_procedure('departments_all', parameters)

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                for opt in tables[x]:
                    items.append(opt)
            return (items)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def requests_email(id) -> dict:
        """Get info to send email.

        Args:
            id (int): Request id.

        Returns:
            dict: List of contain info to email.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            items = {}
            parameters = []
            parameters.append(id)
            storage.open_db()
            tables = storage.exec_procedure('requests_email', parameters)

            if not tables:
                return (None)

            for x in range(0, len(tables)):
                # Info email.
                if x == 0:
                    items = tables[x][0]

            return (items)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage

    @staticmethod
    def dashboard_all(year, month) -> list:
        """Get all info for the dashboard.

        Args:
            year (int): Filter year.
            month (int): Filter month.

        Returns:
            list: List containing all the info.
        """
        # TODO: Connect to Database.
        storage = DBStorage()
        try:
            parameters = []
            parameters.append(year)
            parameters.append(month)
            storage.open_db()
            tables = storage.exec_procedure('dashboard_all', parameters)

            if not tables:
                return (None)

            return (tables)
        except BaseException as error:
            Libraries.write_log(error.msg, traceback.format_exc())
            return (None)
        finally:
            del storage
