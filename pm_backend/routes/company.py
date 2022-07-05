#!/usr/bin/python3
"""Route for table.
"""
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
from general.library import Libraries
from models.companie import Companie


@app_views.route('/company/all', strict_slashes=False)
@Libraries.validate_token
def all_companies(**kwargs):
    """API (GET) Route /company/all

    Returns:
        response: JSON contain records of tables.
    """
    res = DBProcedures.companies_all()
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
