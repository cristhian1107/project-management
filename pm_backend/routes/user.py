#!/usr/bin/python3
"""route for User"""
from models.user import User
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
import hashlib
from general.library import Libraries


@app_views.route('/user', strict_slashes=False)
@Libraries.validate_token
def get_user(**kwargs):
    """API (GET) Route /user

    Returns:
        response: JSON contain info user.
    """
    payload = kwargs.get('payload')
    id = payload.get('id')
    item = User()
    item = DBProcedures.users_one(id)
    if item is None or not item:
        return make_response(jsonify({'status': 'failure'}), 203)
    payload = {
        'id': item.id,
        'username': item.user
    }
    encoded_jwt = Libraries.generate_token(payload)
    setattr(item, 'jwt', encoded_jwt)
    return make_response(jsonify(item.to_dict()), 201)


@app_views.route('/user/worked', strict_slashes=False)
@Libraries.validate_token
def get_user_worked(**kwargs):
    """API (GET) Route /user/worked

    Returns:
        response: JSON contain info user.
    """
    items = DBProcedures.users_workers()
    if items is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(items), 200)


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """API (POST) Route /login

    Returns:
        response: JSON contain info user.
    """
    body = request.get_json()
    name = body.get('username')
    password = body.get('password')
    m = hashlib.md5()
    m.update(str.encode(password))
    password = m.hexdigest()
    item = User()
    item = DBProcedures.users_login(name, password)

    if item is None or not item:
        return make_response(jsonify({'status': 'failure'}), 203)  # RFC 7235

    payload = {
        'id': item.id,
        'username': item.user
    }
    encoded_jwt = Libraries.generate_token(payload)
    setattr(item, 'jwt', encoded_jwt)
    return make_response(jsonify(item.to_dict()), 201)
