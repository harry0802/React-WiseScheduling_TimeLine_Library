import sys
from flask import current_app
from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.materialOption import MaterialOption
from app.models.material import Material
from app.models.processMaterial import ProcessMaterial
from .schemas import materialOptionSchema
materialOption_schema = materialOptionSchema()


def isDeletable(id):
    try:
        # Check if the materialOption has been used in Material
        material_db = Material.query.filter(
            Material.materialOptionId == id
        ).first()
        if material_db:
            return False

        return True
    except Exception as error:
        raise error


def complete_materialOption(db_obj, payload):
    db_obj.materialCode = payload["materialCode"] \
        if payload.get("materialCode") is not None else db_obj.materialCode
    db_obj.materialType = payload["materialType"] \
        if payload.get("materialType") is not None else db_obj.materialType
    return db_obj


class materialOptionService:
    @staticmethod
    def get_materialOptions(id=None):
        try:
            # Get the current materialOption
            query = MaterialOption.query
            query = query.filter(MaterialOption.id == id) if id else query
            materialOption_db = query.all()

            if not (materialOption_db):
                materialOption_db = []
            materialOption_dto = materialOption_schema.dump(materialOption_db, many=True)
            resp = message(True, "materialOption data sent")
            resp["data"] = materialOption_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def check_isDeletable(id):
        try:
            retult = isDeletable(id)
            msg = "MaterialOption is deletable" if retult else "MaterialOption can't be deleted"
            resp = message(True, msg)
            resp["data"] = retult
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple materialOptions
    @staticmethod
    def create_materialOptions(payloads):
        try:
            materialOption_db_list = []
            for data in payloads:
                materialOption_db_list.append(complete_materialOption(MaterialOption(), data))
            db.session.add_all(materialOption_db_list)
            db.session.flush()
            db.session.commit()

            materialOption_dto = materialOption_schema.dump(materialOption_db_list, many=True)
            resp = message(True, "materialOptions have been created..")
            resp["data"] = materialOption_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple materialOptions
    @staticmethod
    def update_materialOptions(payload):
        try:
            materialOption_db_list = []
            for data in payload:
                materialOption_db = MaterialOption.query.filter(
                    MaterialOption.id == data["id"]
                ).first()
                if materialOption_db is None:
                    return err_resp("materialOption not found", "materialOption_404", 404)
                else:
                    materialOption_db = complete_materialOption(materialOption_db, data)
                materialOption_db_list.append(materialOption_db)
            db.session.add_all(materialOption_db_list)
            db.session.flush()
            db.session.commit()

            materialOption_dto = materialOption_schema.dump(materialOption_db_list, many=True)
            resp = message(True, "materialOptions have been updated..")
            resp["data"] = materialOption_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def delete_materialOption(id):
        try:
            # Check if the materialOption has been used in Material
            if isDeletable(id) is False:
                return err_resp("MaterialOption is in use", "MaterialOption_409", 409)

            materialOption_db = MaterialOption.query.filter(
                MaterialOption.id == id
            ).first()
            if materialOption_db is None:
                return err_resp("MaterialOption not found", "MaterialOption_404", 404)  

            db.session.delete(materialOption_db)
            db.session.commit()
            resp = message(True, "MaterialOption has been deleted..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error