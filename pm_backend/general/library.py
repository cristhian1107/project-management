#!/usr/bin/python3
"""Contains:
    (class) Libraries.
"""
from datetime import datetime, timedelta
from flask import request, make_response, jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jwt
import traceback
import smtplib

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
        date_time = datetime.now()
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
    def send_email(info):
        try:
            print(info)
            host = info['host']
            port = info['port']
            me = info['email']
            password = info['password']
            url = info['url']

            # The correct MIME type is multipart/alternative.
            msg = MIMEMultipart('alternative')
            msg['Subject'] = info['subject']
            msg['From'] = 'No-Reply <{}>'.format(me)
            msg['To'] = info['to_email']
            msg['Cc'] = info['cc_email']

            # The body of the message (a plain-text and an HTML version).
            text = '''
            Sr(a) %s\n%s\nEste es correo automático no responder.
            ''' % (info['to_name'], info['text'])
            html = '''
            <html>
              <head></head>
              <body>
                <p><strong>Sr(a) %s</strong></p>
                <p>%s</p>
                <p>
                   Para mayor información ingrese a
                   <a href="%s"> Sistema de Gestión de Proyectos </a> <br>
                   Este es correo automático no responder.
                </p>
              </body>
            </html>
            ''' % (info['to_name'], info['text'], url)

            # Record the MIME types of both parts - text/plain and text/html.
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')

            # Attach parts into message container.
            # According to RFC 2046, the last part of a multipart message
            # In this case The HTML message, is best and preferred.
            msg.attach(part1)
            msg.attach(part2)

            # Send the message via local SMTP server.
            s = smtplib.SMTP(host, port)
            s.starttls()
            s.login(me, password)
            s.sendmail(me, info['to_email'], msg.as_string())
            s.quit()
            return(True)
        except smtplib.SMTPException as error:
            Libraries.write_log(error, traceback.format_exc())
            return(False)

    @staticmethod
    def generate_token(payload={}):
        """Generate a jwt from a payload.

        Args:
            payload (dict, optional): Contains token keys.

        Returns:
            str: JWT Token
        """
        # The expiration time for the token is defined.
        value_for_exp = datetime.now() + timedelta(days=1)
        # exp -> 24h and it is integrated together with payload.
        payload.update({'exp': value_for_exp})
        # PyJWT version 1.7 to 2.4 remove ...decode('utf-8')
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
