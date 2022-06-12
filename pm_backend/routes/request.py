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


@app_views.route('/allrequest', methods=['GET'],
                 strict_slashes=False)
def all_request(date):
    """returns list of all projects"""
    start = request.args.get('start', None)
    end = request.args.get('end', None)
    # Necesito una lista de diccionarios de todos los proyectos con
    # todos sus datos en ese rango de fecha
    res = DBProcedures.request_all(start, end)
    return make_response(jsonify(res.to_dict()), 200)


@app_views.route('/request', methods=['GET'],
                 strict_slashes=False)
def get_request(date):
    """returns a list of specific projects"""
    id = request.args.get('id', None)
    # Necesito un diccionario de el proyectos con todos sus datos
    res = DBProcedures.request_one(id)
    return make_response(jsonify(res.to_dict()), 200)


@app_views.route('/request', methods=['POST'],
                 strict_slashes=False)
def insert_request():
    """inserts a new requirement/project"""
    item = Request()
    data = request.get_json()
    item.date_issue = datetime.strptime(data.get('date_issue', None), time)
    # item.date_tentative = request.args.get('date_tentative', None)
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
    if res is None:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/request', methods=['PUT'],
                 strict_slashes=False)
def update_request():
    """updates a new requirement/project"""
    data = request.get_json()
    item.date_tentative = datetime.strptime(
        data.get('date_tentative', None), time)
    item.user_id = data.get('user_id', None)
    item.tables_typ = tables.get('TYP')
    item.code_typ = data.get('code_typ', None)
    item.company_id = data.get('company_id', None)
    item.name = data.get('name', None)
    item.description = data.get('description', None)
    item.table_pri = tables.get('PRI')
    item.code_pri = data.get('code_pri', None)
    res = DBProcedures.requests_update(item)
    if res is None:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/state', methods=['get'],
                 strict_slashes=False)
def update_state():
    """changes state"""
    """
    enviar cambio de estado a procedure
    iduser
    id requereimineto
    id estado
    res = DBProcedures.requests_state(item)
    """
    return make_response(jsonify({'request': 'success'}), 201)
