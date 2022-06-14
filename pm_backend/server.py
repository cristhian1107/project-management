#!/usr/bin/python3
""" This script starts a Flask web application """
from os import getenv
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from database.db_procedure import DBProcedures
from database import storage
from routes import app_views


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


"""
@app.teardown_appcontext
def teardown(self):
"""
# Removes the current mysql.connector Session
"""
    return storage.close_db()
"""


@app.errorhandler(404)
def error(e):
    """Handler for 404 errors"""
    return make_response(jsonify({"error": "Not found"}), 404)


if __name__ == '__main__':
    host = getenv("HBNB_API_HOST") if getenv("HBNB_API_HOST") else "0.0.0.0"
    port = getenv("HBNB_API_PORT") if getenv("HBNB_API_PORT") else 5000
    app.run(host=host, port=port, threaded=True, debug=True)
