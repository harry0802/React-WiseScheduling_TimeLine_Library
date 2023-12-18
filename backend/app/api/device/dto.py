from flask_restx import Namespace, fields


class DeviceDto:

    api = Namespace("devices", description="Device related operations.")

    # Devices models
    device_object = api.model(
        "Device object",
        {
            "device_id": fields.Integer(required=True, min=1),
            "device_name": fields.String(required=True),
            "device_value": fields.String(required=True),
            "order": fields.Integer(required=True, min=1)
        }
    )

    devices_input = api.model(
        "Devices input",
        {
            "devices": fields.List(fields.Nested(device_object), required=True),
            "timestamp": fields.DateTime,
        },
    )

    devices_resp = api.model(
        "Devices response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(devices_input)
        }
    )

    # Control models
    control_input = api.model(
        "Control input",
        {
            "command": fields.String(required=True)
        }
    )

    control_resp = api.model(
        "Control response",
        {
            "status": fields.Boolean,
            "message": fields.String,
        }
    )
