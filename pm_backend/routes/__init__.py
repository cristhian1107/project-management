#!/usr/bin/python3
"""This module define a blueprint for routes with Blueprint object"""
from flask import Blueprint


app_views = Blueprint("app_views", __name__, url_prefix='/pm_backend/routes')

from pm_backend.routes.index import *
from pm_backend.routes.users import *
