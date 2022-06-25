#!/usr/bin/python3
"""This module implement a index path for API.
"""
from operator import and_
from flask import jsonify, make_response, request
from routes import app_views
from database.db_procedure import DBProcedures
from general.library import Libraries
# from flasgger.utils import swag_from


@app_views.route("/status", strict_slashes=False)
def view_status():
    """Check the status of the app.

    Returns:
        response: Json response.
    """
    return make_response(jsonify({"status": "OK"}), 200)


@app_views.route("/dashboard/all", strict_slashes=False)
@Libraries.validate_token
def all_dashboard(**kwargs):
    payload = kwargs.get('payload')
    year = request.args.get('year', None)
    month = request.args.get('month', None)
    if year is None or month is None:
        return make_response(jsonify({'request': 'empty'}), 204)

    info = DBProcedures.dashboard_all(year, month)
    if info is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(info), 201)
