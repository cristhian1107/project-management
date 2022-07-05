#!/usr/bin/python3
"""Route for table.
"""
from database import tables
from models.table import Table
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
from general.library import Libraries


@app_views.route('/table/all', strict_slashes=False)
@Libraries.validate_token
def all_tables(**kwargs):
    """API (GET) Route /table/all

    Returns:
        response: JSON contain records of tables.
    """
    table_code = request.args.get('table_code', None)
    res = DBProcedures.tables_all(table_code)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)


@app_views.route('/department/all', strict_slashes=False)
@Libraries.validate_token
def all_departments(**kwargs):
    """API (GET) Route /department/all

    Returns:
        response: JSON contain records of departments.
    """
    company_id = request.args.get('company_id', None)
    res = DBProcedures.departments_all(company_id)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
