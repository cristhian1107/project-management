#!/usr/bin/python3
"""Route for table.
"""
from database import tables
from models.companie import Companie
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures


@app_views.route('/companieall', methods=['GET'], strict_slashes=False)
def all_companies():
    """API (GET) Route /companieall

    Returns:
        response: JSON contain records of tables.
    """
    res = DBProcedures.companies_all()
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)
