#!/usr/bin/python3
"""Contains:
    (class) Role.
"""
from models.base_model import BaseModel


class Role(BaseModel):
    """Class that reflects the structure of the tables Roles.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.name = ''
        self.description = ''
        self.is_active = False
        super().__init__(**kwargs)
