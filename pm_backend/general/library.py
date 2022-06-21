#!/usr/bin/python3
"""Contains:
    (class) Libraries.
"""
from datetime import datetime, timedelta
from flask import request, make_response, jsonify
import jwt
import traceback

file_name = 'log'
format_date = '%Y-%m-%dT%H:%M:%S.%f'
format_file = '%Y%m%d'
options_jwt = {
    'enc': {
        'key': 'MCM',
        'algorithm': 'HS256',
    },
    'dec': {
        'key': 'MCM',
        'algorithms': ["HS256"]
    }
}


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
        """Generate a jwt from a payload.

        Args:
            payload (dict, optional): Contains token keys.

        Returns:
            str: JWT Token
        """
        # The expiration time for the token is defined.
        value_for_exp = datetime.utcnow() + timedelta(days=1)
        # exp -> 24h and it is integrated together with payload.
        payload.update({'exp': value_for_exp})
        # PyJWT version 1.7 to 2.4 removes decoding
        # jwt.encode(payload, **options_jwt['enc']).decode('utf-8')
        encoded_jwt = jwt.encode(payload, **options_jwt['enc'])
        return encoded_jwt

    @staticmethod
    def validate_token(func):
        """It will behave as a decorator.
        It will check the header and body of the incoming http request.

        Args:
            func (func): Endpoint view function.
        """
        def decorated(*args, **kwargs):
            """Validate if exists and decode the parameters sent in JWT.

            Returns:
                func: Return the function whit payload decode.
            """
            # Get token.
            token = request.headers.get('Authorization')
            if not token:
                return make_response(jsonify({'request': 'failure'}), 203)
            # Validate token.
            try:
                payload = jwt.decode(token, **options_jwt['dec'])
                kwargs.update({'payload': payload})
            except jwt.exceptions.ExpiredSignatureError as error:
                Libraries.write_log(error, traceback.format_exc())
                return make_response(jsonify({'request': 'failure'}), 203)
            except jwt.exceptions.InvalidSignatureError as error:
                Libraries.write_log(error, traceback.format_exc())
                return make_response(jsonify({'request': 'failure'}), 203)
            return func(*args, **kwargs)
        decorated.__name__ = func.__name__
        return decorated
