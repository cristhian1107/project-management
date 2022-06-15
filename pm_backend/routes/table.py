#!/usr/bin/python3
"""Route for table.
"""
from database import tables
from models.table import Table
from models.request import Request
from models.request_event import RequestEvent
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures


@app_views.route('/tableall', methods=['GET'], strict_slashes=False)
def all_tables():
    """API (GET) Route /tableall

    Returns:
        response: JSON contain records of tables.
    """
    table_code = request.args.get('table_code', None)
    res = DBProcedures.tables_all(table_code)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
