from flask import request
from flask_restx import Resource

from app.utils_log import validation_error

from .service import HouseService
from .dto import HouseDto
from .schemas import ControlSchema


api = HouseDto.api
control_schema = ControlSchema()


@api.route("")
class HouseListController(Resource):
    # Get or update the current houses

    houses_input = HouseDto.houses_input
    houses_resp = HouseDto.houses_status_resp

    @api.doc(
        "Get the current houses & status",
        responses={
            200: ("Houses data successfully sent", houses_resp),
            404: "Houses not found",
        },
    )
    def get(self):
        return HouseService.get_houses()

    # @api.doc(
    #     "Houses upsert",
    #     responses={
    #         201: ("Successfully upsert devices.", houses_resp),
    #         400: "Malformed data or validations failed.",
    #     },
    # )
    # @api.expect(houses_input, validate=True)
    # def put(self):
    #     # Grab the json data
    #     payload = api.payload

    #     return HouseService.upsert_devices(payload)


@api.route("/<int:house_id>/devices")
class HouseController(Resource):
    # Control a single house

    houses_input = HouseDto.houses_input
    houses_resp = HouseDto.device_resp

    @api.doc(
        "Get the current devices",
        responses={
            200: ("Houses data successfully sent", houses_resp),
            404: "Houses not found",
        },
    )
    def get(self, house_id):
        return HouseService.get_devices(house_id)

@api.route("/devices/<register_id>")
class DevicesController(Resource):
    # Control a single house

    control_input = HouseDto.device_control_input
    control_resp = HouseDto.device_control_resp

    @api.doc(
        "Control a device",
        responses={
            200: ("Control command successfully executed", control_resp),
            400: "Malformed command or data",
            403: "House not controllable",
            404: "House not found",
        },
    )
    @api.expect(control_input, validate=True)
    def post(self, register_id):
        ##Grab the json data
        payload = api.payload

        ##Validate data
        if (errors := control_schema.validate(payload)):
            return validation_error(False, errors), 400

        return HouseService.execute(register_id, payload)