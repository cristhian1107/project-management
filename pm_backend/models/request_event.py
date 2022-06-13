#!/usr/bin/python3
"""Contains:
    (class) Request_event.
"""
from models.base_model import BaseModel
import hashlib


class RequestEvent(BaseModel):
    """Class that reflects the structure of the tables Request_event.

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
        self.create_at = None
        self.create_by = None
        self.update_at = None
        self.update_by = None
        super().__init__(**kwargs)
