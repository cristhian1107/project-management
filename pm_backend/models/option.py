#!/usr/bin/python3
"""Contains:
    (class) Option.
"""
from models.base_model import BaseModel


class Option(BaseModel):
    """Class that reflects the structure of the tables Option.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """
    id = 0
    name = ''
    alias = ''
    description = ''
    is_active = False
