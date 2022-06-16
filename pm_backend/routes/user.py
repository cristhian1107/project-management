#!/usr/bin/python3
"""route for User"""
from models.user import User
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
import hashlib
import jwt


@app_views.route('/login', methods=['POST'],
                 strict_slashes=False)
def password():
    """Validate login"""
    body = request.get_json()
    print("AEA")
    name = body.get('username')
    password = body.get('password')
    print(name, password)
    m = hashlib.md5()
    m.update(str.encode(password))
    password = m.hexdigest()
    item = User()
    # item = DBProcedures.users_login('javier.pilco', password)
    item = DBProcedures.users_login(name, password)
    if item is None or not item:
        return make_response(jsonify({'status': 'failure'}), 203)  # RFC 7235

    encoded_jwt = jwt.encode({"itemname": item.user, "id": item.id},
                             "secret", algorithm="HS256")
    setattr(item, 'jwt', str(encoded_jwt))
    return make_response(jsonify(item.to_dict()), 201)
    # return make_response(jsonify({"jwt":"jwt"}), 201)
    # res = make_response(jsonify(item.to_dict()), 201)
    # return res.set_cookie("thiscookie", "cookie")
