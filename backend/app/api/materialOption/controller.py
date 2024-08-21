from flask import request,current_app
from flask_restx import Resource
from backend.app.utils_log import controller_entrance_log
from .service import materialOptionService
from .dto import materialOptionDto
from .schemas import materialOptionSchema

api = materialOptionDto.api
control_schema = materialOptionSchema()

@api.route("/")
class materialOptionController(Resource):
    materialOption_resp = materialOptionDto.materialOption_resp
    materialOption_post = materialOptionDto.materialOption_post
    materialOption_put = materialOptionDto.materialOption_put

    # GET
    @api.doc(
        "Get materialOptions",
        responses={
            200: ("materialOption data successfully sent", materialOption_resp),
            404: "materialOption not found",
        },
    )
    @api.param("id", "MaterialOption ID")
    @controller_entrance_log(description="Get materialOptions")
    def get(self):
        id = request.args.get('id', default=None, type=int)
        return materialOptionService.get_materialOptions(id)
    

    # POST
    @api.doc(
        "Create materialOptions",
        responses={
            200: ("materialOption data successfully created", materialOption_resp),
            404: "materialOption not found",
        },
    )
    @api.expect([materialOption_post], validate=True)
    @controller_entrance_log(description="Create materialOptions")
    def post(self):
        payload = api.payload
        return materialOptionService.create_materialOptions(payload)
    
    
    # PUT
    @api.doc(
        "Update materialOptions",
        responses={
            200: ("materialOption data successfully updated", materialOption_resp),
            404: "materialOption not found",
        },
    )
    @api.expect([materialOption_put], validate=True)
    @controller_entrance_log(description="Update materialOptions")
    def put(self):
        payload = api.payload
        return materialOptionService.update_materialOptions(payload)
    

@api.route("/checkIsDeletable/<int:id>")
class materialOptionController(Resource):
    # GET
    @api.doc(description='檢查物料選項是否可以被刪除。已使用在分類物料(Material)中的物料代碼、物料種類(MaterialOption)不能被刪除。')
    @api.doc(
        "Check materialOption is deletable",
        responses={
            200: ("materialOption data can be deleted"),
            404: "materialOption not found",
        },
    )
    @controller_entrance_log(description="Check materialOption is deletable")
    def get(self, id):
        return materialOptionService.check_isDeletable(id)


@api.route("/<int:id>")
class materialOptionController(Resource):
    materialOption_resp = materialOptionDto.materialOption_resp

    # DELETE
    @api.doc(description='刪除物料選項。已使用在分類物料(Material)中的物料代碼、物料種類(MaterialOption)不能被刪除。')
    @api.doc(
        "Delete materialOptions",
        responses={
            200: ("materialOption data successfully deleted", materialOption_resp),
            404: "materialOption not found",
        },
    )
    @controller_entrance_log(description="Delete materialOptions")
    def delete(self, id):
        return materialOptionService.delete_materialOption(id)