#!/usr/bin/python3
"""Contains:
    (class) RequestsTeams.
"""
from models.base_model import BaseModel
import hashlib


class RequestTeam(BaseModel):
    """Class that reflects the structure of the table RequestTeam.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.request_id = None
        self.worker_id = None
        self.table_fun = None
        self.code_fun = None
        self.is_active = False
        # Additional attributes.
        self.user_id = None
        self.date_issue = None
        super().__init__(**kwargs)
