#!/usr/bin/python3
"""This module implement a rule that returns the status of the application.
"""
from flask import jsonify, make_response
from routes import app_views
# from flasgger.utils import swag_from


@app_views.route("/status", strict_slashes=False)
def view_status():
    """Check the status of the app.

    Returns:
        response: Json response.
    """
    return make_response(jsonify({"status": "OK"}), 200)
