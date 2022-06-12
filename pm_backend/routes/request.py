#!/usr/bin/python3
"""route for request"""
from database import storage, tables
from models.user import User
from models.request import Request
from routes import app_views
from flask import jsonify, abort, request, make_response
from flasgger.utils import swag_from
from database.db_procedure import DBProcedures
import jwt
from datetime import datetime
time = '%Y-%m-%dT%H:%M:%S.%f'
"""
@app_views.route('/allrequest', methods=['GET'],
                 strict_slashes=False)
def all_request(date):
    """
#returns list of all projects
"""
    start = request.args.get('start', None)
    end = request.args.get('end', None)
    state = request.args.get('state', None)
    id = request.args.get('id', None)
    code = request.args.get('codigo', None)
    data = {
        'start': start,
        'end': end,
        'id': id,
        'code': code,
    }
    # Necesito una lista de diccionarios de todos los proyectos con todos sus datos
    res = DBProcedures.users_login('javier.pilco', 'ja-pi')

    new_list = []
    for i in list_data:
        create_at = i.get('create_at')
        if create_at in date:
            new_list+ = i 
    return make_response(jsonify(new_list.to_dict()), 201)
"""
"""
@app_views.route('/request', methods=['GET'],
                 strict_slashes=False)
def get_request(date):
    """
#returns a list of specific projects
"""
    start = request.args.get('start', None)
    end = request.args.get('end', None)
    state = request.args.get('state', None)
    id = request.args.get('id', None)
    code = request.args.get('codigo', None)
    data = {
        'start': start,
        'end': end,
        'id': id,
        'code': code,
    }
    # Necesito una lista de diccionarios de todos los proyectos con todos sus datos
    res = DBProcedures.users_login('javier.pilco', 'ja-pi')
"""
    
@app_views.route('/request', methods=['POST'],
                 strict_slashes=False)
def insert_request():
    """inserts a new requirement/project"""
    item = Request()
    data = request.get_json()
    item.date_issue = datetime.strptime(data.get('date_issue', None), time)
#    item.date_tentative = request.args.get('date_tentative', None)
    item.user_id = data.get('user_id', None)
    item.reason = data.get('reason', None)
    item.subject = data.get('subject', None)
    item.table_pri = tables.get('PRI')
    item.code_pri = data.get('code_pri', None)
    item.code = ''
    item.percentage = 0
    # Data is sent to procedures and is returned on success or failure.
    res = DBProcedures.requests_insert(item)
    
    print(item.to_list())
    if res == None:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)
