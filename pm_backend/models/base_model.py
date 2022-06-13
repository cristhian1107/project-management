#!/usr/bin/python3
"""Contains:
    (class) BaseModel.
"""
from datetime import datetime

time = '%Y-%m-%dT%H:%M:%S.%f'

class_list = [
    'User',
    'Role',
    'Option',
    'Request',
    'RequestEvent'
]


class BaseModel:
    """Base model containing general definition.
    """
    create_at = datetime.utcnow()
    create_by = ''
    update_at = datetime.utcnow()
    update_by = ''

    def __init__(self, **kwargs):
        """Initialize a new instance of the class.
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    setattr(self, key, value)
            if kwargs.get('create_at', None) and type(self.create_at) is str:
                self.create_at = datetime.strptime(kwargs['create_at'], time)
            else:
                self.create_at = datetime.utcnow()
            if kwargs.get('update_at', None) and type(self.update_at) is str:
                self.update_at = datetime.strptime(kwargs['update_at'], time)
            else:
                self.update_at = datetime.utcnow()
        else:
            self.create_at = datetime.utcnow()
            self.create_by = ''
            self.update_at = datetime.utcnow()
            self.update_by = ''

    def to_dict(self, audit=False):
        """Generate a dictionary containing all keys/values of the instance.
        """
        new_dict = self.__dict__.copy()
        if audit:
            if 'create_at' in new_dict:
                new_dict['create_at'] = new_dict['create_at'].strftime(time)
            if 'update_at' in new_dict:
                new_dict['update_at'] = new_dict['update_at'].strftime(time)
        else:
            if 'create_at' in new_dict:
                del new_dict['create_at']
            if 'create_by' in new_dict:
                del new_dict['create_by']
            if 'update_at' in new_dict:
                del new_dict['update_at']
            if 'update_by' in new_dict:
                del new_dict['update_by']
        if 'password' in new_dict:
            del new_dict['password']
        # new_dict['__class__'] = self.__class__.__name__
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']

        # Dictionary and List and Date.
        for key, value in new_dict.items():
            if type(value) == list:
                child_list = []
                for item in value:
                    child_list.append(item.to_dict(audit))
                new_dict[key] = child_list

            if type(value).__name__ in class_list:
                new_dict[key] = value.to_dict(audit)

            if 'date' in key:
                new_dict[key] = value.strftime(time)
        return (new_dict)

    def to_list(self, audit=False):
        """Generate a list containing all values of the instance.
        """
        new_dict = self.__dict__.copy()
        avoid = ['password', '_sa_instance_state']
        list_data = []
        for key, value in new_dict.items():
            if key not in avoid:
                list_data.append(value)
        return list_data
