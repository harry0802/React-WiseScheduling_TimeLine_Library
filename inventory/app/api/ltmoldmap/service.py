import sys
from app import db
from flask import current_app
from app.utils import err_resp, message, internal_err_resp
from app.models.ltmoldmap import LtMoldMap
from .schemas import LtMoldMapSchema

ltmoldmap_schema = LtMoldMapSchema()


def complete_ltmoldmap(db_obj, payload):
    db_obj.moldno = payload["moldno"] \
        if payload.get("moldno") is not None else db_obj.moldno
    db_obj.rfidno = payload["rfidno"] \
        if payload.get("rfidno") is not None else db_obj.rfidno
    db_obj.memo = payload["memo"] \
        if payload.get("memo") is not None else db_obj.memo
    return db_obj


class LtMoldMapService:
    @staticmethod
    def get_all_data():
        """ Get all LtMoldMap data"""
        try:
            select_result = db.session.execute(db.select(LtMoldMap)).scalars()
            select_result = select_result.all()
            if not (select_result):
                return err_resp("LtMoldMap not found!!!", "404", 404)
            else:
                dump_data = ltmoldmap_schema.dump(select_result, many=True)
                # resp = message(True, "LtMoldMap data sent")
                # resp["data"] = dump_data
                resp = dump_data
                return resp, 200

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
        
    
    @staticmethod
    def get_moldNos():
        """Get distinct moldNos"""
        try:
            moldNos = db.session.execute(
                db.select(LtMoldMap.moldno).distinct()
            ).scalars().all()
            
            resp = message(True, "Distinct moldNos")
            resp["data"] = moldNos
            return resp, 200
        except Exception as error:
            raise error


    # create multiple ltmoldmaps
    @staticmethod
    def create_ltmoldmaps(payloads):
        try:
            ltmoldmap_db_list = []
            for data in payloads:
                ltmoldmap_db_list.append(complete_ltmoldmap(LtMoldMap(), data))
            db.session.add_all(ltmoldmap_db_list)
            db.session.flush()
            db.session.commit()

            ltmoldmap_dto = ltmoldmap_schema.dump(ltmoldmap_db_list, many=True)
            resp = message(True, "ltmoldmaps have been created..")
            resp["data"] = ltmoldmap_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple ltmoldmaps
    @staticmethod
    def update_ltmoldmaps(payload):
        try:
            ltmoldmap_db_list = []
            for data in payload:
                ltmoldmap_db = LtMoldMap.query.filter(
                    LtMoldMap.no == data["no"]
                ).first()
                if ltmoldmap_db is None:
                    return err_resp("ltmoldmap not found", "ltmoldmap_404", 404)
                else:
                    ltmoldmap_db = complete_ltmoldmap(ltmoldmap_db, data)
                ltmoldmap_db_list.append(ltmoldmap_db)
            db.session.add_all(ltmoldmap_db_list)
            db.session.flush()
            db.session.commit()

            ltmoldmap_dto = ltmoldmap_schema.dump(ltmoldmap_db_list, many=True)
            resp = message(True, "ltmoldmaps have been updated..")
            resp["data"] = ltmoldmap_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
