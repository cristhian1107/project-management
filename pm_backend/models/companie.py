#!/usr/bin/python3
"""Contains:
    (class) Companie.
"""
from models.base_model import BaseModel


class Companie(BaseModel):
    """Class that reflects the structure of the table Companies.

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        self.id = None
        self.ruc = None
        self.name = None
        self.tradename = None
        self.address = None
        super().__init__(**kwargs)
