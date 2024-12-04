"""
此Option模組的目的為確保前端以及後端的資料都來自資料庫，確保一致性和正確性。
例如: 機台狀態、製程選項的分類、檢驗類別等等。
在後端，將這些狀態、類別等等宣告為Enum，並在Flask一開始create_app()中，從資料庫拿最新資料更新Enum，以確保前後端使用的資料一致。
"""

import sys
from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import optionService
from .dto import optionDto
from .schemas import optionSchema
from .models.processCategory import ProcessCategory
from .models.inspectionType import InspectionType
from .models.workOrderStatus import WorkOrderStatus
from .models.materialUnit import MaterialUnit
from .models.packagingUnit import PackagingUnit

api = optionDto.api
control_schema = optionSchema()
name_param = f"""The name of the option: 
           (製令單狀態) {WorkOrderStatus().__name__}: {WorkOrderStatus().__dict__}
           (製程選項的分類) {ProcessCategory().__name__}: {ProcessCategory().__dict__}
           (檢驗類別) {InspectionType().__name__}: {InspectionType().__dict__}
           (原物料單位) {MaterialUnit().__name__}: {MaterialUnit().__dict__}
           (包材單位) {PackagingUnit().__name__}: {PackagingUnit().__dict__}

           """


@api.route("/<name>")
@api.param("name", name_param)
class optionController(Resource):
    option_post = optionDto.option_post

    # GET
    @api.doc(
        "Get options",
        responses={
            200: ("option data successfully sent"),
            404: "option not found",
        },
    )
    @api.param("id", "the id of the object in content field")
    @controller_entrance_log(description="Get options")
    def get(self, name):
        id = request.args.get('id', default=None, type=int)
        return optionService.get_options(name, id)

    
    # POST
    @api.doc(
        "Create option",
        responses={
            200: ("option data successfully created"),
            404: "option not found",
        },
    )
    @api.expect(option_post, validate=True)
    @controller_entrance_log(description="Create option")
    def post(self, name):
        payload = api.payload
        return optionService.create_option(name, payload)


    # PUT
    @api.doc(
        "Update option",
        responses={
            200: ("option data successfully updated"),
            404: "option not found",
        },
    )
    @api.expect(option_post, validate=True)
    @controller_entrance_log(description="Update option")
    def put(self, name):
        payload = api.payload
        return optionService.update_option(name, payload)
    

@api.route("/<name>/<int:id>")
@api.param("name", name_param)
class optionController(Resource):
    # DELETE
    @api.doc(
        "Delete option",
        responses={
            200: ("option data successfully deleted"),
            404: "option not found",
        },
    )
    @controller_entrance_log(description="Delete option")
    def delete(self, name, id):
        return optionService.delete_option(name, id)
    