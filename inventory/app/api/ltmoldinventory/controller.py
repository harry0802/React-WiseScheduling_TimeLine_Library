from flask_restx import Resource
from .service import LtMoldInventoryService
from .dto import LtMoldInventoryDto
from app.utils import controller_entrance_log

api = LtMoldInventoryDto.api
ltmoldinventory_resp = LtMoldInventoryDto.ltmoldinventory_resp


@api.route("/")
class LtMoldInventoryController(Resource):
    ltmoldinventory_input = LtMoldInventoryDto.ltmoldinventory_input
    @api.doc(
        "Get a specific LtMoldInventory",
        responses={
            200: ("LtMoldInventory data successfully sent", ltmoldinventory_resp),
            404: "LtMoldInventory not found!",
        },
    )
    @api.expect(ltmoldinventory_input, validate=True)
    @controller_entrance_log(description="Insert or update LtMoldInventory")
    def post(self):
        payload = api.payload
        return LtMoldInventoryService.insert_update_ltmoldinventory(payload)

