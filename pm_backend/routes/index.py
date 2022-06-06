#!/usr/bin/python3
"""This module implement a rule that returns the status of the application"""
from flask import jsonify
import pm_backend
from pm_backend.routes import app_views
from models.user import User


@app_views.route("/status", strict_slashes=False)
def view_status():
    """View function that return a json message"""
    return jsonify({"status": "OK"})


@app_views.route("/stats", strict_slashes=False)
def view_stats():
    """Veiw function that retrieves the number of each object by type"""
    return jsonify({
        "users": models.storage.count(User)
    })
