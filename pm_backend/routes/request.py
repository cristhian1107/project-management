#!/usr/bin/python3
"""route for request"""
from sqlalchemy import true
from database import tables
from models.request import Request
from models.request_event import RequestEvent
from models.request_team import RequestTeam
from routes import app_views
from flask import jsonify, abort, request, make_response
from database.db_procedure import DBProcedures
from datetime import datetime
from general.library import Libraries
import asyncio
# from flasgger.utils import swag_from

time = '%Y-%m-%dT%H:%M:%S.%fZ'
dt_date = '%Y-%m-%d'


@app_views.route('/request/all', strict_slashes=False)
@Libraries.validate_token
def all_request(**kwargs):
    """API (GET) Route /request/all.

    Returns:
        response: JSON contains all register of requests.
    """
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
    res = DBProcedures.requests_all(
        date_begin, date_end, company_id, department, user_id)
    if res is None:
        return make_response(jsonify({'request': 'empty'}), 204)
    return make_response(jsonify(res), 200)


@app_views.route('/request', strict_slashes=False)
@Libraries.validate_token
def get_request(**kwargs):
    """API (GET) Route /request.

    Returns:
        response: JSON contains the registe of request.
    """
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
    payload = kwargs.get('payload')
    data = request.get_json()
    item = Request()
    item.user_id = payload.get('id')
    item.date_issue = datetime.strptime(data.get('date_issue'), time)

    if item.date_issue is None or type(item.date_issue) is not datetime:
        return make_response(jsonify({'request': 'failure'}), 204)

    item.reason = data.get('reason', None)
    item.subject = data.get('subject', None)
    item.table_pri = tables.get('PRI')
    item.code_pri = data.get('code_pri', None)
    item.code = ''
    item.percentage = 0
    res = DBProcedures.requests_insert(item)
    # Get values for email.
    # email = DBProcedures.requests_email(res.id)
    # if email:
    #     asyncio.run(Libraries.send_email(email))

    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({
        'request': 'success', 'data': res.to_dict()
    }), 201)


@app_views.route('/request', methods=['PUT'], strict_slashes=False)
@Libraries.validate_token
def update_request(**kwargs):
    """API (PUT) router /request.
    Update new requests in database.

    Returns:
        Response: JSON contain success or failure.
    """
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
    # Get values for email.
    # email = DBProcedures.requests_email(item.id)
    # if email:
    #     asyncio.run(Libraries.send_email(email))
    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/request/event', methods=['POST'], strict_slashes=False)
@Libraries.validate_token
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
    # Get values for email.
    # email = DBProcedures.requests_email(item.request_id)
    # if email:
    #     asyncio.run(Libraries.send_email(email))
    if not res:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)


@app_views.route('/request/team', methods=['POST'], strict_slashes=False)
@Libraries.validate_token
def insert_team(**kwargs):
    """API (POST) Route /request/team.
    Insert team of the request.

    Returns:
        Response: JSON success or failure.
    """
    payload = kwargs.get('payload')
    data = request.get_json()
    items = []
    details = data.get('team', None)

    if type(details) is not list:
        return make_response(jsonify({'request': 'failure'}), 204)

    length = len(details)
    for x in range(0, length):
        item = RequestTeam()
        item.request_id = data.get('request_id', None)
        item.worker_id = details[x].get('worker_id', None)
        item.table_fun = tables.get('FUN')
        item.code_fun = details[x].get('code_fun', None)
        item.is_active = True
        item.user_id = payload.get('id', None)
        item.date_issue = datetime.strptime(data.get('date_issue', None), time)
        item.is_last = (True if x + 1 == length else False)
        items.append(item)
    is_correct = DBProcedures.requests_teams_insert(items)
    # Get values for email.
    # email = DBProcedures.requests_email(item.request_id)
    # if email:
    #     asyncio.run(Libraries.send_email(email))
    if not is_correct:
        return make_response(jsonify({'request': 'failure'}), 204)
    return make_response(jsonify({'request': 'success'}), 201)
