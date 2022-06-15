#!/usr/bin/python3
"""Contains:
    (class) Option.
"""
from models.base_model import BaseModel


class Option(BaseModel):
    """Class that reflects the structure of the table Options.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = 0
        self.name = ''
        self.alias = ''
        self.description = ''
        self.is_active = False
        super().__init__(**kwargs)
