from flask import request
from flask_restx import Resource

from app.utils_log import validation_error

from .service import DeviceService
from .dto import DeviceDto
from .schemas import ControlSchema


api = DeviceDto.api
control_schema = ControlSchema()


@api.route("")
class DeviceListController(Resource):
    # Get or update the current devices

    devices_input = DeviceDto.devices_input
    devices_resp = DeviceDto.devices_resp

    @api.doc(
        "Get the current devices",
        responses={
            200: ("Devices data successfully sent", devices_resp),
            404: "Devices not found",
        },
    )
    def get(self):
        return DeviceService.get_devices()

    @api.doc(
        "Devices upsert",
        responses={
            201: ("Successfully upsert devices.", devices_resp),
            400: "Malformed data or validations failed.",
        },
    )
    @api.expect(devices_input, validate=True)
    def put(self):
        # Grab the json data
        payload = api.payload

        return DeviceService.upsert_devices(payload)


@api.route("/<int:device_id>")
class DeviceController(Resource):
    # Control a single device

    control_input = DeviceDto.control_input
    control_resp = DeviceDto.control_resp

    @api.doc(
        "Control a device",
        responses={
            200: ("Control command successfully executed", control_resp),
            400: "Malformed command or data",
            403: "Device not controllable",
            404: "Device not found",
        },
    )
    @api.expect(control_input, validate=True)
    def post(self, device_id):
        # Grab the json data
        payload = api.payload

        # Validate data
        if (errors := control_schema.validate(payload)):
            return validation_error(False, errors), 400

        return DeviceService.execute(device_id, payload)

