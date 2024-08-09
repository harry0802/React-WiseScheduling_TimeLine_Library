from flask import request,current_app
from flask_restx import Resource
from app.utils import controller_entrance_log
from .service import processService
from .dto import processDto
from .schemas import processSchema

api = processDto.api
control_schema = processSchema()

"""API Documentation
1. Get processs
Get /api/process/
"""


@api.route("/")
class processController(Resource):
    process_resp = processDto.process_resp
    process_post = processDto.process_post
    process_put = processDto.process_put

    # GET
    @api.doc(
        "Get processs",
        responses={
            200: ("process data successfully sent", process_resp),
            404: "process not found",
        },
    )
    @api.param("productId", "Product ID", required=True)
    @api.param("processCategory", "The category of process. 用於新增製令單時，列出屬於「廠內-成型」類別的製程",
            type="string",
            enum = ["In-IJ(廠內成型)", "Out-IJ(委外成型)", "In-BE(廠內後製程)", "Out-BE(委外後製程)", "In-TS(廠內出貨檢驗)"]
            )

    @controller_entrance_log(description="Get processs")
    def get(self):
        productId = request.args.get("productId")
        processCategory = request.args.get("processCategory")
        return processService.get_processes(productId, processCategory)


    # POST
    @api.doc(
        "Create processs",
        responses={
            200: ("process data successfully created"),
            404: "process not found",
        },
    )
    @api.expect([process_post], validate=True)
    @controller_entrance_log(description="Create processs")
    def post(self):
        payload = api.payload
        return processService.create_processes(payload)
    

    # PUT
    @api.doc(
        "Update processs",
        responses={
            200: ("process data successfully updated"),
            404: "process not found",
        },
    )
    @api.expect([process_put], validate=True)
    @controller_entrance_log(description="Update processs")
    def put(self):
        payload = api.payload
        for data in payload:
            data.pop("serialNumber") if "serialNumber" in data else None
            data.pop("productId") if "productId" in data else None
        return processService.update_processes(payload)


@api.route("/singleProcess/<int:id>")
@api.param("id", "process ID")
class processController(Resource):
    process_resp = processDto.process_resp
    # GET
    @api.doc(
        "Get single process and its all materials and molds",
        responses={
            200: ("process data successfully sent", process_resp),
            404: "process not found",
        },
    )
    @controller_entrance_log(description="Get single process and its all materials and molds")
    def get(self, id):
        return processService.get_process_by_id(id)
    

@api.route("/<int:id>")
@api.param("id", "process ID")
class processController(Resource):
    process_resp = processDto.process_resp
    # DELETE
    @api.doc(
        "Delete single process and its all molds",
        responses={
            200: ("process data successfully deleted", process_resp),
            404: "process not found",
        },
    )
    @controller_entrance_log(description="Delete single process and its all molds")
    def delete(self, id):
        return processService.delete_process(id)
