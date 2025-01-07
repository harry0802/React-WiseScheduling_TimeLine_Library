import sys
from flask import request
from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import ProductionCostService
from .dto import ProductionCostDto
from .schemas import ProductionCostSchema

api = ProductionCostDto.api


@api.route("/")
class ProductionCostController(Resource):
    productionCost_paging = ProductionCostDto.productionCost_paging
    @api.doc(description="""取得成本分析資料""")
    @api.doc(
        "Get productionCosts",
        responses={
            200: ("productionCost data successfully sent", productionCost_paging),
            404: "productionCost not found",
        },
    )
    @api.param("page", "Page number")
    @api.param("size", "Size of the page")
    @api.param("sort", "Sort by a column")
    @api.param("dataType", "資料類型，全部、母批、子批", required=True, default="mother", type=str, enum=["all", "mother", "child"])
    @api.param("productionReportId", "製令單生產的ID，藉由這個ID，可以找到該製令單的母批和子批", required=False, type=int)
    @controller_entrance_log(description="Get productionCosts")
    def get(self):
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=10, type=int)
        sort = request.args.get('sort', default="id", type=str)
        dataType = request.args.get('dataType', default="mother", type=str)
        productionReportId = request.args.get('productionReportId', default=None, type=int)
        return ProductionCostService.get_productCosts(page=page, size=size, sort=sort, dataType=dataType, productionReportId=productionReportId)
