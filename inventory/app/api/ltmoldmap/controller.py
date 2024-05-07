from flask_restx import Resource
from .service import LtMoldMapService
from .dto import LtMoldMapDto
from app.utils import controller_entrance_log

api = LtMoldMapDto.api
ltmoldmap_resp = LtMoldMapDto.ltmoldmap_resp


@api.route("/")
class LtMoldMapController(Resource):
    @api.doc(
        "Get all LtMoldMap",
        responses={
            200: ("LtMoldMap data successfully sent", ltmoldmap_resp),
            404: "LtMoldMap not found!",
        },
    )
    @controller_entrance_log(description="Get all LtMoldMap")
    def get(self):
        return LtMoldMapService.get_all_data()

