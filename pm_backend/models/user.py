"""Contains:
    (class) User.
"""
from models.base_model import BaseModel
import hashlib


class User(BaseModel):
    """_summary_

    Args:
        BaseModel (cls): Parent class - Inheritance.
    """
    id = 0
    company_id = 0
    role_id = 0
    name = ''
    lastname = ''
    email = ''
    user = ''
    password = ''
    gender = ''
    position = ''
    department = ''
    campus = ''

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        if 'password' in kwargs:
            password = kwargs['password']
            m = hashlib.md5()
            m.update(str.encode(password))
            kwargs['password'] = m.hexdigest()
        super().__init__(**kwargs)
