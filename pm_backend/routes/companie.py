#!/usr/bin/python3
"""Route for table.
"""
from models.companie import Companie
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures


@app_views.route('/companyall', methods=['GET'], strict_slashes=False)
def all_companies():
    """API (GET) Route /companyall

    Returns:
        response: JSON contain records of tables.
    """
    res = DBProcedures.companies_all()
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
