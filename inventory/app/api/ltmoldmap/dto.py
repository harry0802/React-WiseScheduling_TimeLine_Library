from flask_restx import Namespace, fields


class LtMoldMapDto:

    api = Namespace("ltmoldmap", description="LtMoldMap related operations.")
    ltmoldmap_object = api.model(
        "LtMoldMap object",
        {
            "no": fields.Integer,
            "moldno": fields.String,
            "rfidno": fields.String,
            "memo": fields.String,
        },
    )

    ltmoldmap_resp = api.model(
        "LtMoldMap Data Response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "user": fields.Nested(ltmoldmap_object),
        },
    )
