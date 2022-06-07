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
    id = 0
    name = ''
    description = ''
    is_active = False;
