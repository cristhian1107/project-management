#!/usr/bin/python3
"""Contains:
    (class) RequestEvent.
"""
from models.base_model import BaseModel
import hashlib


class RequestEvent(BaseModel):
    """Class that reflects the structure of the tables RequestEvent.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.project_id = None
        self.item = None
        self.table_sta = None
        self.code_sta = None
        self.date_issue = None
        self.user_id = None
        super().__init__(**kwargs)
