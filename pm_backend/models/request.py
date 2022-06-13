#!/usr/bin/python3
"""Contains:
    (class) Request.
"""
from models.base_model import BaseModel
from datetime import datetime

dt_time = '%Y-%m-%dT%H:%M:%S.%f'


class Request(BaseModel):
    """Class that reflects the structure of the tables Request.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = None
        self.table_typ = None
        self.code_typ = None
        self.code = None
        self.company_id = None
        self.user_id = None
        self.subject = None
        self.reason = None
        self.name = None
        self.description = None
        self.department = None
        self.campus = None
        self.date_issue = None
        self.date_tentative = None
        self.table_sta = None
        self.code_sta = None
        self.table_pri = None
        self.code_pri = None
        self.percentage = None

        new_date = None
        if (kwargs.get('date_issue', None)
                and type(self.date_issue) is str):
            new_date = datetime.strptime(kwargs['date_issue'], dt_time)
            self.date_issue = new_date
        if (kwargs.get('date_tentative', None)
                and type(self.date_tentative) is str):
            new_date = datetime.strptime(kwargs['date_tentative'], dt_time)
            self.date_tentative = new_date

        super().__init__(**kwargs)
