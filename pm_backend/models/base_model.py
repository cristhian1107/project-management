#!/usr/bin/python3
"""Contains:
    (class) BaseModel.
"""
from datetime import datetime

time = '%Y-%m-%dT%H:%M:%S.%f'


class BaseModel:
    """Base model containing general definition.
    """
    created_at = created_at = datetime.utcnow()
    created_by = ''
    updated_at = created_at = datetime.utcnow()
    updated_by = ''

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    setattr(self, key, value)
            if kwargs.get('created_at', None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs['created_at'], time)
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get('updated_at', None) and type(self.updated_at) is str:
                self.updated_at = datetime.strptime(kwargs['updated_at'], time)
            else:
                self.updated_at = datetime.utcnow()
        else:
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()

    def to_dict(self, audit=False):
        """Generate a dictionary containing all keys/values of the instance.
        """
        new_dict = self.__dict__.copy()
        if audit:
            if 'created_at' in new_dict:
                new_dict['created_at'] = new_dict['created_at'].strftime(time)
            if 'updated_at' in new_dict:
                new_dict['updated_at'] = new_dict['updated_at'].strftime(time)
        else:
            if 'created_at' in new_dict:
                del new_dict['created_at']
            if 'created_by' in new_dict:
                del new_dict['created_at']
            if 'update_at' in new_dict:
                del new_dict['created_at']
            if 'update_by' in new_dict:
                del new_dict['created_at']
        if 'password' in new_dict:
            del new_dict['password']
        new_dict['__class__'] = self.__class__.__name__
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return (new_dict)
