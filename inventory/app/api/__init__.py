from flask_restx import Api
from flask import Blueprint

from .ltmoldmap.controller import api as ltmoldmap_ns
from .ltmoldinventory.controller import api as ltmoldinventory_ns

# Import controller APIs as namespaces.
api_bp = Blueprint("api", __name__)

api = Api(api_bp, title="API", description="Main routes.")

# API namespaces
api.add_namespace(ltmoldmap_ns)
api.add_namespace(ltmoldinventory_ns)
