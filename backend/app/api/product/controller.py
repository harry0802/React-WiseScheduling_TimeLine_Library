from flask import request,current_app
from flask_restx import Resource
from app.utils import controller_entrance_log
from .service import productService
from .dto import productDto
from .schemas import productSchema

api = productDto.api
control_schema = productSchema()

"""API Documentation
1. Get products
Get /api/product/
"""

@api.route("/")
class productController(Resource):
    product_resp = productDto.product_resp
    product_post = productDto.product_post
    product_put = productDto.product_put

    # GET
    @api.doc(
        "Get products",
        responses={
            200: ("product data successfully sent", product_resp),
            404: "product not found",
        },
    )
    @api.param("page", "Page number")
    @api.param("size", "Size of the page")
    @api.param("sort", "Sort by a column")
    @api.param("productSN", "Product Number")
    @api.param("oldProductSN", "Old product Number")
    @api.param("productName", "Product Name")
    @controller_entrance_log(description="Get products")
    def get(self):
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=None, type=int)
        sort = request.args.get('sort', default="id", type=str)
        productSN = request.args.get('productSN', default=None, type=str)
        oldProductSN = request.args.get('oldProductSN', default=None, type=str)
        productName = request.args.get('productName', default=None, type=str)
        return productService.get_products_with_pagination(page, size, sort, productSN, oldProductSN, productName)

    # PUT
    @api.doc(
        "Update products",
        responses={
            200: ("product data successfully updated", product_resp),
            404: "product not found",
        },
    )
    @api.expect([product_put], validate=True)
    @controller_entrance_log(description="Update products")
    def put(self):
        payload = api.payload
        return productService.update_products(payload)
