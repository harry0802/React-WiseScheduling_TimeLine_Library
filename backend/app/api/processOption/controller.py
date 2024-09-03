from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import processOptionService
from .dto import processOptionDto
from .schemas import processOptionSchema

api = processOptionDto.api
control_schema = processOptionSchema()

@api.route("/")
class processOptionController(Resource):
    processOption_resp = processOptionDto.processOption_resp
    processOption_post = processOptionDto.processOption_post
    processOption_put = processOptionDto.processOption_put

    # GET
    @api.doc(
        "Get processOptions",
        responses={
            200: ("processOption data successfully sent", processOption_resp),
            404: "processOption not found",
        },
    )
    @api.param("id", "ProcessOption ID")
    @controller_entrance_log(description="Get processOptions")
    def get(self):
        id = request.args.get('id', default=None, type=int)
        return processOptionService.get_processOptions(id)
    

    # POST
    @api.doc(
        "Create processOptions",
        responses={
            200: ("processOption data successfully created", processOption_resp),
            404: "processOption not found",
        },
    )
    @api.expect([processOption_post], validate=True)
    @controller_entrance_log(description="Create processOptions")
    def post(self):
        payload = api.payload
        return processOptionService.create_processOptions(payload)
    
    
    # PUT
    @api.doc(
        "Update processOptions",
        responses={
            200: ("processOption data successfully updated", processOption_resp),
            404: "processOption not found",
        },
    )
    @api.expect([processOption_put], validate=True)
    @controller_entrance_log(description="Update processOptions")
    def put(self):
        payload = api.payload
        return processOptionService.update_processOptions(payload)
    

@api.route("/checkIsDeletable/<int:id>")
class processOptionController(Resource):
    # GET
    @api.doc(description='檢查製程選項是否可以被刪除。已使用在製程(Process)中的製程代碼、製程名稱(ProcessOption)不能被刪除。')
    @api.doc(
        "Check processOption is deletable",
        responses={
            200: ("processOption data can be deleted"),
            404: "processOption not found",
        },
    )
    @controller_entrance_log(description="Check processOption is deletable")
    def get(self, id):
        return processOptionService.check_isDeletable(id)
    

@api.route("/<int:id>")
class processOptionController(Resource):
    processOption_resp = processOptionDto.processOption_resp

    # DELETE
    @api.doc(description='刪除製程選項。已使用在製程(Process)中的製程代碼、製程名稱(ProcessOption)不能被刪除。')
    @api.doc(
        "Delete processOptions",
        responses={
            200: ("processOption data successfully deleted", processOption_resp),
            404: "processOption not found",
        },
    )
    @controller_entrance_log(description="Delete processOptions")
    def delete(self, id):
        return processOptionService.delete_processOption(id)