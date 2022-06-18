#!/usr/bin/python3
"""Contains:
    (class) Libraries.
"""
from datetime import datetime
import jwt

file_name = 'log'
format_date = '%Y-%m-%dT%H:%M:%S.%f'
format_file = '%Y%m%d'


class Libraries():
    """Class that contains methods that will
    be used in support.
    """

    @staticmethod
    def write_log(msm_error, trace_error=None):
        """Write events and error in log.txt file.

        Args:
            msm_error (str): Message custom write in file.
            trace_error (str, optional): Messsage traceback.
        """
        date_time = datetime.utcnow()
        date_one = date_time.strftime(format_date)
        date_two = date_time.strftime(format_file)
        with open(f'{file_name}-{date_two}.txt', mode='a') as file_log:
            file_log.write(f' DateTime: {date_one} '.center(100, '='))
            file_log.write('\n')
            file_log.write(f'Message: {msm_error}\n')
            if trace_error is not None:
                file_log.write('Traceback:\n')
                file_log.write(trace_error)
            file_log.write('\n')

    @staticmethod
    def generate_token(payload={}):
        encoded_jwt = jwt.encode(payload, "MCM", algorithm="HS256").decode('utf-8')
        return encoded_jwt

    @staticmethod
    def validate_token(encoded_jwt):
        try:
            decode_jwt = jwt.decode(encoded_jwt, "MCM", algorithms=["HS256"])
            return decode_jwt
        except jwt.exceptions.InvalidSignatureError:
            return None
