import sys
from sqlalchemy import or_
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.ly0000AO import LY0000AODetail
from app.models.materialOption import MaterialOption
from app.models.material import Material
from .schemas import materialSchema
material_schema = materialSchema()


def complete_material(db_obj, payload):
    db_obj.materialOptionId = payload["materialOptionId"] \
        if payload.get("materialOptionId") is not None else db_obj.materialOptionId
    db_obj.productSN = payload["productSN"] \
        if payload.get("productSN") is not None else db_obj.productSN
    db_obj.materialSN = payload["materialSN"] \
        if payload.get("materialSN") is not None else db_obj.materialSN
    db_obj.materialName = payload["materialName"] \
        if payload.get("materialName") is not None else db_obj.materialName
    db_obj.quantity = float(payload["quantity"]) \
        if payload.get("quantity") is not None else db_obj.quantity
    db_obj.unit = payload["unit"] \
        if payload.get("unit") is not None else db_obj.unit
    return db_obj


class materialService:
    @staticmethod
    def get_materials(id = None, productSN = None, categorized = False):
        try:
            # Get the current material
            query = Material.query
            query = query.with_entities(Material.__table__, MaterialOption.materialCode, MaterialOption.materialType)
            query = query.join(MaterialOption, Material.materialOptionId == MaterialOption.id, isouter = True) # left outer join
            query = query.filter(Material.id == id) if id else query
            query = query.filter(Material.productSN == productSN) if productSN else query
            query = query.filter(or_(Material.materialOptionId != None, Material.materialOptionId != "")) if categorized == True else query
            material_db_list = query.all()

            material_dto = material_schema.dump(material_db_list, many=True)
            resp = message(True, "material data sent")
            resp["data"] = material_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_distinct_materials():
        """取得所有不重複的物料名稱、物料編號

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            query = Material.query
            query = query.with_entities(Material.materialSN, Material.materialName, MaterialOption.id.label('materialOptionId'), MaterialOption.materialType).distinct()
            query = query.join(MaterialOption, Material.materialOptionId == MaterialOption.id, isouter = True) # left outer join
            query = query.filter(or_(Material.materialSN != None, Material.materialSN != ""))
            material_db_list = query.all()

            material_dto = material_schema.dump(material_db_list, many=True)
            resp = message(True, "material data sent")
            resp["data"] = material_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def get_distinct_packagings():
        """取得所有不重複，且物料類型為包材的物料名稱、物料編號

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            # Get distinct material names and its material number which material type is packaging
            query = Material.query
            query = query.with_entities(Material.materialSN, Material.materialName, MaterialOption.id.label('materialOptionId'), MaterialOption.materialType).distinct()
            query = query.join(MaterialOption, Material.materialOptionId == MaterialOption.id, isouter = True) # left outer join
            query = query.filter(or_(Material.materialSN != None, Material.materialSN != ""))
            query = query.filter(MaterialOption.materialType == '包材')
            material_db_list = query.all()

            material_dto = material_schema.dump(material_db_list, many=True)
            resp = message(True, "material data sent")
            resp["data"] = material_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def get_material_unitPrice(materialSN, materialName):
        """取得原物料或者包材的單價

        Args:
            materialSN (_type_): 物料編號
            materialName (_type_): 物料名稱

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            unitPrice = None
            # Get distinct material names and its material number which material type is packaging
            ly0000AO_db = db.session.query(LY0000AODetail).filter(
                LY0000AODetail.SD_SKNO == materialSN,
                LY0000AODetail.SD_NAME == materialName
            ).order_by(LY0000AODetail.SD_DATE.desc()).first()
            
            # Set `unitPrice` if found in LY0000AODetail
            if ly0000AO_db:
                unitPrice = ly0000AO_db.SD_PRICE

            resp = message(True, "material unit price data sent")
            resp["data"] = unitPrice
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple materials
    @staticmethod
    def create_materials(payloads):
        try:
            material_db_list = []
            for data in payloads:
                material_db_list.append(complete_material(Material(), data))
            db.session.add_all(material_db_list)
            db.session.flush()
            db.session.commit()

            material_dto = material_schema.dump(material_db_list, many=True)
            resp = message(True, "materials have been created..")
            resp["data"] = material_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple materials
    @staticmethod
    def update_materials(payload):
        try:
            material_db_list = []
            for data in payload:
                material_db = Material.query.filter(
                    Material.id == data["id"]
                ).first()
                if material_db is None:
                    return err_resp("material not found", "material_404", 404)
                else:
                    material_db = complete_material(material_db, data)
                material_db_list.append(material_db)
            db.session.add_all(material_db_list)
            db.session.flush()
            db.session.commit()

            material_dto = material_schema.dump(material_db_list, many=True)
            resp = message(True, "materials have been updated..")
            resp["data"] = material_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error