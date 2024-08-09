from flask_restx import Namespace, fields
import copy


class LtMoldMapDto:

    api = Namespace("ltmoldmap", description="LtMoldMap related operations.")
    ltmoldmap_object = api.model(
        "LtMoldMap object",
        {
            "no": fields.Integer(required=False, description="Primary Key", example="1"),
            "moldno": fields.String(required=False, description="Mold Number", example="Mold-001"),
            "rfidno": fields.String(required=False, description="RFID", example="RFID-001"),
            "memo": fields.String(required=False, description="Memo", example=""),
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

    # POST model
    post_obj = copy.deepcopy(ltmoldmap_object)
    pop_list = ["no"]
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        post_obj.pop(attr)
    for key in post_obj:
        post_obj[key].description = f"POST {key}"
    for key in [item for item in required_list]:
        post_obj[key].required = True
    for key in [item for item in not_required_list]:
        post_obj[key].required = False
    ltmoldmap_post = api.model("LtMoldMap Post Input", post_obj)

    # PUT model
    put_obj = copy.deepcopy(ltmoldmap_object)
    pop_list = []
    required_list = []
    not_required_list = []
    for attr in [item for item in pop_list]:
        put_obj.pop(attr)
    for key in put_obj:
        put_obj[key].description = f"PUT {key}"
    for key in [item for item in required_list]:
        put_obj[key].required = True
    for key in [item for item in not_required_list]:
        put_obj[key].required = False
    ltmoldmap_put = api.model("LtMoldMap Put Input",put_obj)
