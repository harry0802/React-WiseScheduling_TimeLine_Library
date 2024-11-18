from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service.service import FactoryQuotationService
from .dto import FactoryQuotationDto
from .schemas import FactoryQuotationSchema
api = FactoryQuotationDto.api
control_schema = FactoryQuotationSchema()


@api.route("/")
class FactoryQuotationController(Resource):
    factoryQuotation_post = FactoryQuotationDto.FactoryQuotation_post

    # POST
    @api.doc(description="""新增空的報價單
                            在廠內報價系統首頁按新增按鈕，會新增空的報價單
                            """
            )
    @api.doc(
        "Create factoryQuotations",
        responses={
            200: ("factoryQuotation data successfully created"),
            404: "factoryQuotation not found",
        },
    )
    @api.expect(factoryQuotation_post, validate=True)
    @controller_entrance_log(description="Create factoryQuotation")
    def post(self):
        return FactoryQuotationService.create_factoryQuotation(api.payload)
    

@api.route("/<int:factoryQuotationId>/syncProcess/<string:productSN>")
class FactoryQuotationController(Resource):
    factoryQuotation_resp = FactoryQuotationDto.FactoryQuotation_resp
    # GET
    @api.doc(description="""根據產品編號同步產品履歷(BOM表)的製程到報價單
                            """
            )
    @api.doc(
        "Sync processes in BOM to factory quotation",
        responses={
            200: ("BOM data have been synchronised to factoryQuotation successfully", factoryQuotation_resp),
            404: "productSN not found",
        },
    )
    @controller_entrance_log(description="Sync processes in BOM to factory quotation")
    def get(self, factoryQuotationId, productSN):
        return FactoryQuotationService.sync_processes(factoryQuotationId, productSN)
    


@api.route("/<int:factoryQuotationId>")
class FactoryQuotationController(Resource):
    factoryQuotation_resp = FactoryQuotationDto.FactoryQuotation_resp
    factoryQuotation_put = FactoryQuotationDto.FactoryQuotation_put

    # GET
    @api.doc(description="""
                            取得該產品所有製程的報價內容 (原物料、包材、成型加工、後製程與檢驗、運費、貨運與關稅、利潤管理)
                            """
            )
    @api.doc(
        "Get factoryQuotation",
        responses={
            200: ("factoryQuotation data successfully sent", factoryQuotation_resp),
            404: "factoryQuotation not found",
        },
    )
    @controller_entrance_log(description="Get factoryQuotation")
    def get(self, factoryQuotationId):
        return FactoryQuotationService.get_factoryQuotation(factoryQuotationId)
    

    # PUT
    @api.doc(description="""修改報價單
                            更新單一產品名稱、客戶名稱、利潤管理各種百分比
                            """
            )
    @api.doc(
        "Update factoryQuotation",
        responses={
            200: ("factoryQuotation data successfully updated"),
            404: "factoryQuotation not found",
        },
    )
    @api.expect(factoryQuotation_put, validate=True)
    @controller_entrance_log(description="Update factoryQuotation")
    def put(self, factoryQuotationId):
        return FactoryQuotationService.update_factoryQuotation(factoryQuotationId, api.payload)
    
    # DELETE
    @api.doc(description="""刪除空的報價單
                            除了報價單編號、建立日期，其他資料都沒有填寫的情況才能刪除
                            """
            )
    @api.doc(
        "Delete factoryQuotation",
        responses={
            200: ("factoryQuotation data successfully deleted"),
            404: "factoryQuotation not found",
        },
    )
    @controller_entrance_log(description="Delete factoryQuotation")
    def delete(self, factoryQuotationId):
        return FactoryQuotationService.delete_factoryQuotation(factoryQuotationId)


@api.route("/<int:factoryQuotationId>/process/")
class FactoryQuotationProcessController(Resource):
    FQProcess_post = FactoryQuotationDto.FQProcess_post
    FQProcess_put = FactoryQuotationDto.FQProcess_put

    # PUT
    @api.doc(description="""更新各種製程類別的報價費用
                            更新 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
                            更新 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                            更新 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
                            更新 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                            更新 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
                            原物料費用、包材費用沒有id的情況下，判斷為新增
                            原物料費用、包材費用有id的情況下，判斷為更新
                            原物料費用、包材費用已不存在的id，判斷為刪除
                            """
            )
    @api.doc(
        "Update factoryQuotation process",
        responses={
            200: ("factoryQuotation process data successfully updated"),
            404: "factoryQuotation process not found",
        },
    )
    @api.expect(FQProcess_put, validate=True)
    @controller_entrance_log(description="Update factoryQuotation process")
    def put(self, factoryQuotationId):
        return FactoryQuotationService.update_factoryQuotationProcess(api.payload)



@api.route("/<int:factoryQuotationId>/shipping/")
class FactoryQuotationProcessController(Resource):
    shippingCost_put = FactoryQuotationDto.shippingCost_put
    # PUT
    @api.doc(description="""
                        更新 運費、貨運與關稅
                        """
            )
    @api.doc(
        "Update factoryQuotation ShippingCost",
        responses={
            200: ("factoryQuotation ShippingCost data successfully created"),
            404: "factoryQuotation ShippingCost not found",
        },
    )
    @api.expect(shippingCost_put, validate=True)
    @controller_entrance_log(description="Update factoryQuotation ShippingCost")
    def put(self, factoryQuotationId):
        return FactoryQuotationService.update_shippingCosts(api.payload)
