from flask import request,current_app
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service.service import SalesQuotationService
from .dto import SalesQuotationDto
from .schemas import SalesQuotationSchema
api = SalesQuotationDto.api
control_schema = SalesQuotationSchema()

@api.route("/products/")
class SalesQuotationController(Resource):
    # GET
    @api.doc(description="""
                            在業務報價系統首頁，列出所有的產品
                            """
            )
    @api.doc(
        "Get salesQuotation's products",
        responses={
            200: ("salesQuotation's products  successfully sent"),
            404: "salesQuotation not found",
        },
    )
    @controller_entrance_log(description="Get salesQuotation' products")
    def get(self):
        return SalesQuotationService.get_products()
    

@api.route("/")
class SalesQuotationController(Resource):
    salesQutation_post = SalesQuotationDto.SalesQuotation_post

    # POST
    @api.doc(description="""新增空的報價單
                            在業務報價系統首頁按新增按鈕，會新增空的報價單
                            """
            )
    @api.doc(
        "Create salesQuotations",
        responses={
            200: ("salesQuotation data successfully created"),
            404: "salesQuotation not found",
        },
    )
    @api.expect(salesQutation_post, validate=True)
    @controller_entrance_log(description="Create salesQuotation")
    def post(self):
        return SalesQuotationService.create_salesQuotation(api.payload)
    

@api.route("/<int:salesQuotationId>")
class SalesQuotationController(Resource):
    salesQutation_resp = SalesQuotationDto.SalesQuotation_resp
    salesQutation_put = SalesQuotationDto.SalesQuotation_put

    # GET
    @api.doc(description="""
                            取得該產品所有製程的報價內容 (原物料、包材、成型加工、後製程與檢驗、運費、貨運與關稅、利潤管理)
                            """
            )
    @api.doc(
        "Get salesQuotation",
        responses={
            200: ("salesQuotation data successfully sent", salesQutation_resp),
            404: "salesQuotation not found",
        },
    )
    @controller_entrance_log(description="Get salesQuotation")
    def get(self, salesQuotationId):
        return SalesQuotationService.get_salesQuotation(salesQuotationId)
    

    # PUT
    @api.doc(description="""修改報價單
                            更新單一產品名稱、客戶名稱、利潤管理各種百分比
                            """
            )
    @api.doc(
        "Update salesQuotation",
        responses={
            200: ("salesQuotation data successfully updated"),
            404: "salesQuotation not found",
        },
    )
    @api.expect(salesQutation_put, validate=True)
    @controller_entrance_log(description="Update salesQuotatio")
    def put(self, salesQuotationId):
        return SalesQuotationService.update_salesQuotation(salesQuotationId, api.payload)
    
    # DELETE
    @api.doc(description="""刪除空的報價單
                            除了報價單編號、建立日期，其他資料都沒有填寫的情況才能刪除
                            """
            )
    @api.doc(
        "Delete salesQuotation",
        responses={
            200: ("salesQuotation data successfully deleted"),
            404: "salesQuotation not found",
        },
    )
    @controller_entrance_log(description="Delete salesQuotatio")
    def delete(self, salesQuotationId):
        return SalesQuotationService.delete_salesQuotation(salesQuotationId)


@api.route("/<int:salesQuotationId>/process/")
class SalesQuotationProcessController(Resource):
    SQProcess_post = SalesQuotationDto.SQProcess_post
    SQProcess_put = SalesQuotationDto.SQProcess_put

    # POST
    @api.doc(description="""新增各種製程類別的報價費用
                            新增 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
                            新增 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                            新增 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
                            新增 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                            新增 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
                            """
            )
    @api.doc(
        "Create salesQuotation process",
        responses={
            200: ("salesQuotation process data successfully created"),
            404: "salesQuotation process not found",
        },
    )
    @api.expect(SQProcess_post, validate=True)
    @controller_entrance_log(description="Create salesQuotatio process")
    def post(self,salesQuotationId):
        return SalesQuotationService.create_salesQuotationProcess(salesQuotationId, api.payload)
    
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
        "Update salesQuotation process",
        responses={
            200: ("salesQuotation process data successfully updated"),
            404: "salesQuotation process not found",
        },
    )
    @api.expect(SQProcess_put, validate=True)
    @controller_entrance_log(description="Update salesQuotatio process")
    def put(self, salesQuotationId):
        return SalesQuotationService.update_salesQuotationProcess(api.payload)


@api.route("/<int:salesQuotationId>/process/<int:SQProcessId>")
class SalesQuotationProcessController(Resource):
    # DELETE
    @api.doc(description="""刪除單一製程類別的報價費用
                            """
            )
    @api.doc(
        "Delete salesQuotation process",
        responses={
            200: ("salesQuotation process data successfully deleted"),
            404: "salesQuotation process not found",
        },
    )
    @controller_entrance_log(description="Delete salesQuotatio process")
    def delete(self, salesQuotationId, SQProcessId):
        return SalesQuotationService.delete_salesQuotationProcess(SQProcessId)
    


@api.route("/<int:salesQuotationId>/shipping/")
class SalesQuotationProcessController(Resource):
    shippingCost_put = SalesQuotationDto.shippingCost_put
    # PUT
    @api.doc(description="""
                        更新 運費、貨運與關稅
                        """
            )
    @api.doc(
        "Update salesQuotation ShippingCost",
        responses={
            200: ("salesQuotation ShippingCost data successfully created"),
            404: "salesQuotation ShippingCost not found",
        },
    )
    @api.expect(shippingCost_put, validate=True)
    @controller_entrance_log(description="Update salesQuotatio ShippingCost")
    def put(self, salesQuotationId):
        return SalesQuotationService.update_shippingCosts(api.payload)
