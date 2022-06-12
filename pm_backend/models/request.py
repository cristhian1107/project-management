#!/usr/bin/python3
"""Contains:
    (class) Request.
"""
from models.base_model import BaseModel
import hashlib


class Request(BaseModel):
    """Class that reflects the structure of the tables Users.

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
        super().__init__(**kwargs)
