from database import storage
from models.user import User

class DBUser ():

    @staticmethod
    def login(user='', pwd='') -> User:
        result = storage.exec_procedure('users_login', ['hola', 'mundo'])
        new_user = User(**result)
        return(new_user)
