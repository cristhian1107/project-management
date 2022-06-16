#!/usr/bin/python3
"""Contains:
    (class) Libraries.
"""
from datetime import datetime

file_name = 'log.txt'
format_date = '%Y-%m-%dT%H:%M:%S.%f'


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
        date_time = date_time.strftime(format_date)
        with open(file_name, mode='a') as file_log:
            file_log.write(f' DateTime: {date_time} '.center(100, '='))
            file_log.write('\n')
            file_log.write(f'Message: {msm_error}\n')
            if trace_error is not None:
                file_log.write('Traceback:\n')
                file_log.write(trace_error)
            file_log.write('\n')
