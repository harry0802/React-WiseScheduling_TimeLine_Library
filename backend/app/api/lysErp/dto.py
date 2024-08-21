from flask_restx import Namespace, fields
from marshmallow.validate import Length, Range
from app.utils_log import validation_error
import copy

class lyServiceDto:
    # ref lyServiceSDD.md
    api = Namespace("lyService", description="LyService related operations.")

