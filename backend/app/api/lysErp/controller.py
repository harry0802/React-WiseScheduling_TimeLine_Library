import sys
from flask_restx import Resource
from backend.app.utils_log import controller_entrance_log
from .service import LyService
from .dto import lyServiceDto


api = lyServiceDto.api

"""API Documentation
1. Get distinct workOrderSNs
Get /api/lyService/get_workOrderSNs
"""

@api.route("/get_workOrderSNs")
class lyServiceController(Resource):
    @api.doc(
        "Get distinct workOrderSNs",
        responses={
            200: ("lyService data successfully sent"),
            404: "lyService not found",
        },
    )
    @controller_entrance_log(description="Get distinct workOrderSNs")
    def get(self):
        return LyService.get_workOrderSNs()
    
   