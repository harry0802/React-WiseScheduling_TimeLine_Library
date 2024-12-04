from flask import request,current_app
from flask_restx import Resource
from flask_restx import inputs
from app.utils_log import controller_entrance_log
from .service import CustomerService
from .dto import CustomerDto
api = CustomerDto.api


@api.route("/list")
class CustomerController(Resource):
    customer_resp = CustomerDto.customer_resp
    customer_put = CustomerDto.customer_put

    # GET
    @api.doc(description="""取得全部客戶清單(客戶名稱)""")
    @api.doc(
        "Get customer list",
        responses={
            200: ("customer data successfully sent", customer_resp),
            404: "customer not found",
        },
    )
    @controller_entrance_log(description="Get customer list")
    def get(self):
        return CustomerService.get_customer_list()
    