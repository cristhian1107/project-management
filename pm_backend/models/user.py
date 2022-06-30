#!/usr/bin/python3
"""Contains:
    (class) User.
"""
from models.base_model import BaseModel
import hashlib


class User(BaseModel):
    """Class that reflects the structure of the table Users.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.company_id = 0
        self.role_id = 0
        self.name = ''
        self.lastname = ''
        self.email = ''
        self.user = ''
        self.password = ''
        self.gender = ''
        self.position = ''
        self.department = ''
        self.campus = ''
        self.role = None
        self.options = []
        self.permissions = {}
        if 'password' in kwargs:
            password = kwargs['password']
            m = hashlib.md5()
            m.update(str.encode(password))
            kwargs['password'] = m.hexdigest()
        super().__init__(**kwargs)
