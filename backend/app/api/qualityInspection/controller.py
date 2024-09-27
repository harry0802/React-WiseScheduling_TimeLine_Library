from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import qualityInspectionService
from .dto import qualityInspectionDto
from .schemas import qualityInspectionSchema

api = qualityInspectionDto.api
control_schema = qualityInspectionSchema()


@api.route("/")
class qualityInspectionController(Resource):
    qualityInspection_resp = qualityInspectionDto.qualityInspection_resp
    qualityInspection_post = qualityInspectionDto.qualityInspection_post
    qualityInspection_put = qualityInspectionDto.qualityInspection_put

    # GET
    @api.doc(
        "Get qualityInspections",
        responses={
            200: ("qualityInspection data successfully sent", qualityInspection_resp),
            404: "qualityInspection not found",
        },
    )
    @controller_entrance_log(description="Get qualityInspections")
    def get(self):
        return qualityInspectionService.get_first_qualityInspections()

    # POST
    @api.doc(
        "Create qualityInspections",
        responses={
            200: ("qualityInspection data successfully created", qualityInspection_resp),
            404: "qualityInspection not found",
        },
    )
    @api.expect([qualityInspection_post], validate=True)
    @controller_entrance_log(description="Create qualityInspections")
    def post(self):
        payload = api.payload
        return qualityInspectionService.create_qualityInspections(payload)

    # PUT
    @api.doc(
        "Update qualityInspections",
        responses={
            200: ("qualityInspection data successfully updated", qualityInspection_resp),
            404: "qualityInspection not found",
        },
    )
    @api.expect([qualityInspection_put], validate=True)
    @controller_entrance_log(description="Update qualityInspections")
    def put(self):
        payload = api.payload
        return qualityInspectionService.update_qualityInspections(payload)


@api.route("/first_inspections")
class qualityInspectionFirstController(Resource):
    qualityInspection_resp = qualityInspectionDto.qualityInspection_resp

    # GET
    @api.doc(
        "Get first qualityInspections",
        responses={
            200: ("first qualityInspection data successfully sent", qualityInspection_resp),
            404: "qualityInspection not found",
        },
    )
    @controller_entrance_log(description="Get first qualityInspections")
    def get(self):
        return qualityInspectionService.get_first_qualityInspections()
    
@api.route("/in_process_inspections")
class qualityInspectionInProcessController(Resource):
    qualityInspection_resp = qualityInspectionDto.qualityInspection_resp

    # GET
    @api.doc(
        "Get in process qualityInspections",
        responses={
            200: ("in process qualityInspection data successfully sent", qualityInspection_resp),
            404: "qualityInspection not found",
        },
    )
    @controller_entrance_log(description="Get in process qualityInspections")
    def get(self):
        return qualityInspectionService.get_in_process_qualityInspections()
