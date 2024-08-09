import sys
from flask import current_app
from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.product import Product
from .schemas import productSchema
product_schema = productSchema()


def complete_product(db_obj, payload):
    db_obj.productSN = payload["productSN"] \
        if payload.get("productSN") is not None else db_obj.productSN
    db_obj.productName = payload["productName"] \
        if payload.get("productName") is not None else db_obj.productName
    db_obj.oldProductSN = payload["oldProductSN"] \
        if payload.get("oldProductSN") is not None else db_obj.oldProductSN
    return db_obj


class productService:
    @staticmethod
    def get_products_with_pagination(page, size, sort, productSN, oldProductSN, productName):
        try:
            # Get the current product
            query = Product.query
            query = query.filter(Product.productSN.like(f"%{productSN}%")) if productSN else query
            query = query.filter(Product.oldProductSN.like(f"%{oldProductSN}%")) if oldProductSN else query
            query = query.filter(Product.productName.like(f"%{productName}%")) if productName else query

            if hasattr(Product, sort):
                query = query.order_by(getattr(Product, sort).desc())
            else:
                query = query.order_by(Product.id.desc())
            if size:
                pagination = query.paginate(page=page, per_page=size)
                product_db = pagination.items
                total_pages = pagination.pages
                total_count = pagination.total
            else:
                product_db = query.all()
                total_pages = 1
                total_count = len(product_db)

            if not (product_db):
                product_db = []
            
            product_dto = product_schema.dump(product_db, many=True)

            resp = message(True, "product data sent")
            resp["data"] = product_dto
            resp["meta"] = {
                "page": page,
                "size": size,
                "sort": sort if hasattr(Product, sort) else "id",
                "total_pages": total_pages,
                "total_count": total_count,
            }
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple products
    @staticmethod
    def create_products(payloads):
        try:
            product_db_list = []
            for data in payloads:
                product_db_list.append(complete_product(Product(), data))
            db.session.add_all(product_db_list)
            db.session.flush()
            db.session.commit()

            product_dto = product_schema.dump(product_db_list, many=True)
            resp = message(True, "products have been created..")
            resp["data"] = product_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple products
    @staticmethod
    def update_products(payload):
        try:
            product_db_list = []
            for data in payload:
                product_db = Product.query.filter(
                    Product.id == data["id"]
                ).first()
                if product_db is None:
                    return err_resp("product not found", "product_404", 404)
                else:
                    product_db = complete_product(product_db, data)
                product_db_list.append(product_db)
            db.session.add_all(product_db_list)
            db.session.flush()
            db.session.commit()

            product_dto = product_schema.dump(product_db_list, many=True)
            resp = message(True, "products have been updated..")
            resp["data"] = product_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error