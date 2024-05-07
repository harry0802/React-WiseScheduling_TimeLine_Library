from flask_restx import Namespace, fields


class LtMoldInventoryDto:

    api = Namespace("ltmoldinventory", description="LtMoldInventory related operations.")
    ltmoldinventory_object = api.model(
        "LtMoldInventory object",
        {
            "no": fields.Integer,
            "rfidno": fields.String,
            "finalinventory": fields.DateTime(required=False, description="庫存時間", example="2024-05-03T00:00:00.000+08:00"),
            "memo": fields.String,
        },
    )

    ltmoldinventory_input = api.model(
        "LtMoldInventory object",
        {
            "rfidno": fields.String,
            "finalinventory": fields.DateTime(required=False, description="庫存時間", example="2024-05-03T00:00:00.000+08:00"),
            "memo": fields.String,
        },
    )

    ltmoldinventory_resp = api.model(
        "LtMoldInventory Data Response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "data": fields.Nested(ltmoldinventory_object),
        },
    )
