import sys
from flask import current_app
from sqlalchemy import or_
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.customers import Customers
from .schemas import CustomerSchema
customer_schema = CustomerSchema()


class CustomerService:
    @staticmethod
    def get_customer_list():
        try:
            # Get the customer list
            query = Customers.query
            query = query.with_entities(Customers.id, Customers.name)
            customer_db_list = query.all()

            customer_dto = customer_schema.dump(customer_db_list, many=True)
            resp = message(True, "customer data sent")
            resp["data"] = customer_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        