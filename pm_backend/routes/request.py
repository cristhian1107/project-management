#!/usr/bin/python3
"""route for request"""
from database import tables
from models.request import Request
from models.request_event import RequestEvent
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
from datetime import datetime
from general.library import Libraries
import asyncio

time = '%Y-%m-%dT%H:%M:%S.%fZ'
dt_date = '%Y-%m-%d'


@app_views.route('/request/all', methods=['GET'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def all_request(**kwargs):
    """returns list of all projects"""
    date_begin = datetime.strptime(
        request.args.get('date_begin', None), dt_date)
    date_end = datetime.strptime(
        request.args.get('date_end', None), dt_date)
    if date_end is None or date_begin is None:
        return make_response(jsonify({'request': 'failure'}), 204)
    company_id = request.args.get('company_id', None)
    department = request.args.get('department', None)
    company_id = None if company_id == '' else company_id
    department = None if department == '' else department
    # Necesito una lista de diccionarios de todos los proyectos con
    # todos sus datos en ese rango de fecha
    res = DBProcedures.requests_all(
        date_begin, date_end, company_id, department)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)


@app_views.route('/request', methods=['GET'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def get_request(**kwargs):
    """returns a list of specific projects"""

    payload = kwargs.get('payload')
    id = payload.get('id')
    # Necesito un diccionario de el proyectos con todos sus datos
    res = DBProcedures.requests_one(id, True)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res.to_dict()), 200)


@app_views.route('/request', methods=['POST'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def insert_request(**kwargs):
    # kwargs se retorna desde el decorator and contains the payload
    """inserts a new requirement/project"""
    payload = kwargs.get('payload')
    item = Request()
    # Si el body no se encuentra en formato json, puede fallar
    data = request.get_json()
    item.user_id = payload.get('id')
    # ----- Puede fallar ----
    # strptime require un string como primer parámetro y que sea un string
    # Debe validarse la existencia y formato de date_issue
    item.date_issue = datetime.strptime(data.get('date_issue'), time)
    if item.date_issue is None or type(item.date_issue) is not datetime:
        return make_response(jsonify({'request': 'failure'}), 204)
    # ------------------------

    # ------ get method --------
    # Por defecto el segundo parámetro ya es None
    item.reason = data.get('reason', None)
    item.subject = data.get('subject', None)
    item.table_pri = tables.get('PRI')
    item.code_pri = data.get('code_pri', None)
    item.code = ''
    item.percentage = 0
    # ------------------
    # Data is sent to procedures and is returned on success or failure.
    res = DBProcedures.requests_insert(item)
    email = DBProcedures.requests_email(item.id)

    if email:
        asyncio.run(Libraries.send_email(email))

    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/request', methods=['PUT'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def update_request():
    """updates a new requirement/project"""
    data = request.get_json()
    item = Request()
    item.id = data.get('id', None)
    item.date_tentative = datetime.strptime(
        data.get('date_tentative', None), time)
    item.date_issue = datetime.strptime(data.get(
        'date_issue', None), time)
    item.user_id = data.get('user_id', None)
    item.name = data.get('name', None)
    item.description = data.get('description', None)
    item.table_typ = tables.get('TYP')
    item.table_pri = tables.get('PRI')
    item.code_typ = data.get('code_typ', None)
    item.code_pri = data.get('code_pri', None)
    res = DBProcedures.requests_update(item)
    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/request/event', methods=['POST'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def update_event():
    """API (POST) Route /request/event.
    Change the status of the request.

    Returns:
        Response: JSON success or failure.
    """
    data = request.get_json()
    item = RequestEvent()
    item.request_id = data.get('request_id', None)
    item.code_sta = data.get('code_sta', None)
    item.table_sta = tables.get('STA')
    item.date_issue = data.get('date_issue', None)
    item.user_id = data.get('user_id', None)
    res = DBProcedures.requests_events_insert(item)
    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)
