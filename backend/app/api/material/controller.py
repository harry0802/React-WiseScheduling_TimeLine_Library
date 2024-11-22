from flask import request,current_app
from flask_restx import Resource
from flask_restx import inputs
from app.utils_log import controller_entrance_log
from .service import materialService
from .dto import materialDto
from .schemas import materialSchema

api = materialDto.api
control_schema = materialSchema()

"""API Documentation
1. Get materials
Get /api/material/
"""

@api.route("/")
class materialController(Resource):
    material_resp = materialDto.material_resp
    material_put = materialDto.material_put

    # GET
    @api.doc(
        "Get materials",
        responses={
            200: ("material data successfully sent", material_resp),
            404: "material not found",
        },
    )
    @api.param("id", "Material ID")
    @api.param("productSN", "Product number to which the material belongs")
    @api.param("categorized", "True：已分類的物料。False：全部物料，不區分", type=bool)
    @controller_entrance_log(description="Get materials")
    def get(self):
        id = request.args.get('id', default=None, type=int)
        productSN = request.args.get('productSN', default=None, type=str)
        categorized = request.args.get('categorized', default=False, type=inputs.boolean)
        return materialService.get_materials(id, productSN, categorized)
    
    # PUT
    @api.doc(
        "Update materials",
        responses={
            200: ("material data successfully updated", material_resp),
            404: "material not found",
        },
    )
    @api.expect([material_put], validate=True)
    @controller_entrance_log(description="Update materials")
    def put(self):
        payload = api.payload
        return materialService.update_materials(payload)


@api.route("/materials")
class MaterialController(Resource):
    material_resp = materialDto.material_resp
    material_put = materialDto.material_put

    # GET
    @api.doc(description="取得所有不重複的物料名稱、物料編號")
    @api.doc(
        "Get distinct materials",
        responses={
            200: ("material data successfully sent", material_resp),
            404: "material not found",
        },
    )
    @controller_entrance_log(description="Get distinct materials")
    def get(self):
        return materialService.get_distinct_materials()
    

@api.route("/packagings")
class MaterialPackagingController(Resource):
    material_resp = materialDto.material_resp
    material_put = materialDto.material_put

    # GET
    @api.doc(description="取得所有不重複的，屬於包材類別的物料名稱、物料編號")
    @api.doc(
        "Get distinct packagings",
        responses={
            200: ("material data successfully sent", material_resp),
            404: "material not found",
        },
    )
    @controller_entrance_log(description="Get distinct packagings")
    def get(self):
        return materialService.get_distinct_packagings()
    
@api.route("/materialUnitPrice")
class MaterialController(Resource):
    material_resp = materialDto.material_resp
    material_put = materialDto.material_put

    # GET
    @api.doc(description="取得原物料或者包材的單價")
    @api.doc(
        "Get material unit price",
        responses={
            200: ("material data successfully sent", material_resp),
            404: "material not found",
        },
    )
    @api.param("materialSN", "materialSN 物料編號", required=True)
    @api.param("materialName", "materialName 物料名稱", required=True)
    @controller_entrance_log(description="Get material unit price")
    def get(self):
        materialSN = request.args.get("materialSN")
        materialName = request.args.get("materialName")
        return materialService.get_material_unitPrice(materialSN, materialName)
