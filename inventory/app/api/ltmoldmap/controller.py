from flask_restx import Resource
from .service import LtMoldMapService
from .dto import LtMoldMapDto
from app.utils import controller_entrance_log

api = LtMoldMapDto.api
ltmoldmap_resp = LtMoldMapDto.ltmoldmap_resp
ltmoldmap_post = LtMoldMapDto.ltmoldmap_post
ltmoldmap_put = LtMoldMapDto.ltmoldmap_put


@api.route("/")
class LtMoldMapController(Resource):
    # GET
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

    # POST
    @api.doc(
        "Create multiple LtMoldMap",
        responses={
            200: ("LtMoldMap data successfully created", ltmoldmap_resp),
            400: "Bad Request",
        },
    )
    @api.expect([ltmoldmap_post], validate=True)
    @controller_entrance_log(description="Create multiple LtMoldMap")
    def post(self):
        return LtMoldMapService.create_ltmoldmaps(api.payload)
    
    # PUT
    @api.doc(
        "Update multiple LtMoldMap",
        responses={
            200: ("LtMoldMap data successfully updated", ltmoldmap_resp),
            400: "Bad Request",
        },
    )
    @api.expect([ltmoldmap_put], validate=True)
    @controller_entrance_log(description="Update multiple LtMoldMap")
    def put(self):
        return LtMoldMapService.update_ltmoldmaps(api.payload)
    


@api.route("/moldNos")
class LtMoldMapController(Resource):
    @api.doc(
        "Get distinct moldNos",
        responses={
            200: ("moldNos data successfully sent", []),
            404: "moldNos not found",
        },
    )
    @controller_entrance_log(description="Get distinct moldNos")
    def get(self):
        return LtMoldMapService.get_moldNos()