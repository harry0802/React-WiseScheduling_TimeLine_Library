from flask_restx import Namespace, fields


class HouseDto:

    api = Namespace("houses", description="House related operations.")


    register_object = api.model(
        "Register Object",
        {
            "id": fields.Integer(required=True, min=1),
            "name": fields.String(required=True),
            "label": fields.String(required=True),
            "value": fields.String(required=True),
            "unit": fields.String(required=True),
        }
    )
    
    device_object = api.model(
        "Device Object",
        {
            "id": fields.Integer(required=True, min=1),
            "name": fields.String(required=True),
            "label": fields.String(required=True),
            "type": fields.String(required=True),
            "values": fields.List(fields.Nested(register_object), required=True),
        }
    )
    # Houses models
    house_object = api.model(
        "House object",
        {
            "id": fields.Integer(required=True, min=1),
            "name": fields.String(required=True),
            "label": fields.String(required=True),
            "type": fields.String(required=True),
            "devices": fields.List(fields.Nested(device_object), required=True),
        }
    )
    house_status_object = api.model(
        "House status object",
        {
            "id": fields.Integer(required=True, min=1),
            "name": fields.String(required=True),
            "label": fields.String(required=True),
            "type": fields.String(required=True),
            "status": fields.String(required=True),
        }
    )

    houses_input = api.model(
        "Houses input",
        {
            "houses": fields.List(fields.Nested(house_object), required=True),
            "timestamp": fields.DateTime,
        },
    )

    houses_status_resp = api.model(
        "Houses Status response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.List(fields.Nested(house_status_object), required=True),
        }
    )
    device_resp = api.model(
        "Houses device response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.List(fields.Nested(device_object), required=True),
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
    # Control models
    device_control_input = api.model(
        "Control input",
        {
            "command": fields.Float(required=True)
        }
    )

    device_control_resp = api.model(
        "Control response",
        {
            "status": fields.Boolean,
            "message": fields.String,
        }
    )