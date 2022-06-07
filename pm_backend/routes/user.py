#!/usr/bin/python3
"""route for User"""
from database import storage
from models.user import User
from routes import app_views
from flask import jsonify, abort, request, make_response
from flasgger.utils import swag_from
from database.db_procedure import DBProcedures


@app_views.route('/login', methods=['POST', 'GET'],
                 strict_slashes=False)
def password():
    """Validate login"""
    """
    body = request.get_json()
    name = body.get('user')
    password = body.get('password')
    user = DBProcedures.users_login(name, password)
    """
    user = DBProcedures.users_login('javier.pilco', 'ja-pi')
    if user == {}:
        return make_response(jsonify({'status': 'failure'}), 401) # RFC 7235
    return make_response(jsonify(user.to_dict()), 201)
