#!/usr/bin/python3
"""route for User"""
from database import storage
from models.user import User
from routes import app_views
from flask import jsonify, abort, request, make_response
from flasgger.utils import swag_from
from database.db_procedure import DBProcedures
import jwt

@app_views.route('/login', methods=['POST'],
                 strict_slashes=False)
def password():
    """Validate login"""

    body = request.get_json()
    name = body.get('username')
    password = body.get('password')
    
    #user = DBProcedures.users_login(name, password)

    user = DBProcedures.users_login('javier.pilco', 'ja-pi')
    if user == {}:
        return make_response(jsonify({'status': 'failure'}), 401) # RFC 7235
    del user.role
    encoded_jwt = jwt.encode({"username": user.user, "id": user.id}, "secret",algorithm="HS256")
    setattr(user, 'jwt', str(encoded_jwt))
    return make_response(jsonify(user.to_dict()), 201)
#return make_response(jsonify({"jwt":"jwt"}), 201)
#    res = make_response(jsonify(user.to_dict()), 201)
#    return res.set_cookie("thiscookie", "cookie")
