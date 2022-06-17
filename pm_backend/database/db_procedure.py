#!/usr/bin/python3
"""Contains:
    (class) DBProcedure.
"""
from database.engine.db_storage import DBStorage
from xmlrpc.client import Boolean
from models.user import User
from models.role import Role
from models.option import Option
from models.request import Request
from models.request_event import RequestEvent
from models.table import Table
from models.companie import Companie


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
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('users_login', parameters)
        del storage

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
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        parameters = item.to_list()
        del storage
        return (storage.exec_save('requests_insert', parameters))

    @staticmethod
    def requests_events_insert(item=RequestEvent()) -> Boolean:
        """Insert new requests events.

        Args:
            item (RequestEvent): New object.

        Returns:
            Boolean: True or False.
        """
        if item is None:
            return (False)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        parameters = item.to_list()
        del storage
        return (storage.exec_save('requests_events_insert', parameters))

    @staticmethod
    def requests_update(item=Request()) -> Boolean:
        """Update new requests

        Args:
            item (Request): New object.

        Returns:
            Boolean: True or False.
        """
        if item is None:
            return (False)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        parameters = item.to_list()
        del storage
        return (storage.exec_save('requests_update', parameters))

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
        item = Request()
        items = []
        parameters = []
        parameters.append(date_begin)
        parameters.append(date_end)
        parameters.append(company_id)
        parameters.append(department)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('requests_all', parameters)
        del storage

        if not tables:
            return (None)

        for x in range(0, len(tables)):
            for opt in tables[x]:
                item = Request(**opt)
                items.append(item.to_dict())
        return (items)

    @staticmethod
    def requests_one(id) -> Request:
        """Get one record request.

        Args:
            id (long): Filter by id.

        Returns:
            Request: object request.
        """
        item = Request()
        items = []
        parameters = []
        parameters.append(id)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('requests_one', parameters)
        del storage

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

    @staticmethod
    def tables_all(table, all_records=False) -> list:
        """Get one table type.

        Args:
            id (long): Filter by id.

        Returns:
            list: List of contain all tables.
        """
        item = Table()
        items = []
        parameters = []
        parameters.append(table)
        parameters.append(all_records)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('tables_all', parameters)
        del storage

        if not tables:
            return (None)

        for x in range(0, len(tables)):
            for opt in tables[x]:
                item = Table(**opt)
                items.append(item.to_dict())
        return (items)

    @staticmethod
    def companies_all() -> list:
        """Get all companies.

        Returns:
            list: List of contain all companies.
        """
        item = Companie()
        items = []
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('companies_all')
        del storage

        if not tables:
            return (None)

        for x in range(0, len(tables)):
            for opt in tables[x]:
                item = Companie(**opt)
                items.append(item.to_dict())
        return (items)

    @staticmethod
    def departments_all(company_id=None) -> list:
        """Get all departments by company.

        Args:
            id (long): Filter by id.

        Returns:
            list: List of contain all departments.
        """
        items = []
        parameters = []
        parameters.append(company_id)
        # TODO: Connect to Database.
        storage = DBStorage()
        storage.open_db()
        tables = storage.exec_procedure('departments_all', parameters)
        del storage

        if not tables:
            return (None)

        for x in range(0, len(tables)):
            for opt in tables[x]:
                items.append(opt)
        return (items)
