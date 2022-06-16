#!/usr/bin/python3
"""Route for table.
"""
from database import tables
from models.table import Table
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures


@app_views.route('/table/all', methods=['GET'], strict_slashes=False)
def all_tables():
    """API (GET) Route /table/all

    Returns:
        response: JSON contain records of tables.
    """
    table_code = request.args.get('table_code', None)
    res = DBProcedures.tables_all(table_code)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)


@app_views.route('/department/all', methods=['GET'], strict_slashes=False)
def all_departments():
    """API (GET) Route /departmentall

    Returns:
        response: JSON contain records of departments.
    """
    company_id = request.args.get('company_id', None)
    res = DBProcedures.departments_all(company_id)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
