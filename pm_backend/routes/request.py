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
# from flasgger.utils import swag_from

time = '%Y-%m-%dT%H:%M:%S.%fZ'
dt_date = '%Y-%m-%d'


@app_views.route('/request/all', methods=['GET'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def all_request(**kwargs):
    """returns list of all projects"""
    payload = kwargs.get('payload')
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
    user_id = payload.get('id')
    # Necesito una lista de diccionarios de todos los proyectos con
    # todos sus datos en ese rango de fecha
    res = DBProcedures.requests_all(
        date_begin, date_end, company_id, department, user_id)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)


@app_views.route('/request', methods=['GET'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def get_request(**kwargs):
    """returns a list of specific projects"""

    payload = kwargs.get('payload')
    # id = payload.get('id')
    # Necesito un diccionario de el proyectos con todos sus datos
    id = request.args.get('id', None)
    res = DBProcedures.requests_one(id, True)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res.to_dict()), 200)


@app_views.route('/request', methods=['POST'], strict_slashes=False)
@Libraries.validate_token
def insert_request(**kwargs):
    """API (POST) router /request.
    Insert new requests in database.

    Returns:
        Response: JSON contain the object insert.
    """
    # (Kwargs) contain the jwt values, deserialized.
    payload = kwargs.get('payload')
    data = request.get_json()
    item = Request()
    item.user_id = payload.get('id')
    item.date_issue = datetime.strptime(data.get('date_issue'), time)
    # Validate date format.
    if item.date_issue is None or type(item.date_issue) is not datetime:
        return make_response(jsonify({'request': 'failure'}), 204)
    item.reason = data.get('reason', None)
    item.subject = data.get('subject', None)
    item.table_pri = tables.get('PRI')
    item.code_pri = data.get('code_pri', None)
    item.code = ''
    item.percentage = 0
    # Save object in Database.
    res = DBProcedures.requests_insert(item)
    # Get values for email.
    email = DBProcedures.requests_email(item.id)
    if email:
        asyncio.run(Libraries.send_email(email))

    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success', 'data': res.to_dict()}), 201)


@app_views.route('/request', methods=['PUT'],
                 strict_slashes=False)
@Libraries.validate_token  # Custom decorator to validate the token
def update_request(**kwargs):
    """updates a new requirement/project"""
    payload = kwargs.get('payload')
    data = request.get_json()
    item = Request()
    item.id = data.get('id', None)
    item.date_tentative = datetime.strptime(
        data.get('date_tentative', None), time)
    item.date_issue = datetime.strptime(data.get(
        'date_issue', None), time)
    item.user_id = payload.get('id', None)
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
def update_event(**kwargs):
    """API (POST) Route /request/event.
    Change the status of the request.

    Returns:
        Response: JSON success or failure.
    """
    payload = kwargs.get('payload')
    data = request.get_json()
    item = RequestEvent()
    item.request_id = data.get('request_id', None)
    item.code_sta = data.get('code_sta', None)
    item.reason = data.get('reason', None)
    item.table_sta = tables.get('STA')
    item.date_issue = datetime.strptime(data.get(
        'date_issue', None), time)
    item.user_id = payload.get('id', None)
    res = DBProcedures.requests_events_insert(item)
    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)
