#!/usr/bin/python3
"""This module implement a rule that returns the status of the application"""
from flask import jsonify, make_response
from database import storage
from routes import app_views
from models.user import User


@app_views.route("/status", strict_slashes=False)
def view_status():
    """View function that return a json message"""
    return make_response(jsonify({"status": "OK"}), 200)


@app_views.route("/stats", strict_slashes=False)
def view_stats():
    """Veiw function that retrieves the number of each object by type"""
    return make_response(jsonify({
        "users": storage.count(User)
    }), 200)
