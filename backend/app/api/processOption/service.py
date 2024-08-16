import sys
from flask import current_app
from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.processOption import ProcessOption
from app.models.process import Process
from .schemas import processOptionSchema
processOption_schema = processOptionSchema()


def isDeletable(id):
    try:
        # Check if the processOption has been used in Process
        process_db = Process.query.filter(
            Process.processOptionId == id
        ).first()
        if process_db:
            return False

        return True
    except Exception as error:
        raise error

def complete_processOption(db_obj, payload):
    db_obj.processCategory = payload["processCategory"] \
        if payload.get("processCategory") is not None else db_obj.processCategory
    db_obj.processSN = payload["processSN"] \
        if payload.get("processSN") is not None else db_obj.processSN
    db_obj.processName = payload["processName"] \
        if payload.get("processName") is not None else db_obj.processName
    return db_obj


class processOptionService:
    @staticmethod
    def get_processOptions(id=None):
        try:
            # Get the current processOption
            query = ProcessOption.query
            query = query.filter(ProcessOption.id == id) if id else query
            processOption_db = query.all()

            if not (processOption_db):
                processOption_db = []
            processOption_dto = processOption_schema.dump(processOption_db, many=True)
            resp = message(True, "processOption data sent")
            resp["data"] = processOption_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def check_isDeletable(id):
        try:
            retult = isDeletable(id)
            msg = "ProcessOption is deletable" if retult else "ProcessOption can't be deleted"
            resp = message(True, msg)
            resp["data"] = retult
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple processOptions
    @staticmethod
    def create_processOptions(payloads):
        try:
            processOption_db_list = []
            for data in payloads:
                processOption_db_list.append(complete_processOption(ProcessOption(), data))
            db.session.add_all(processOption_db_list)
            db.session.flush()
            db.session.commit()

            processOption_dto = processOption_schema.dump(processOption_db_list, many=True)
            resp = message(True, "processOptions have been created..")
            resp["data"] = processOption_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple processOptions
    @staticmethod
    def update_processOptions(payload):
        try:
            processOption_db_list = []
            for data in payload:
                processOption_db = ProcessOption.query.filter(
                    ProcessOption.id == data["id"]
                ).first()
                if processOption_db is None:
                    return err_resp("processOption not found", "processOption_404", 404)
                else:
                    processOption_db = complete_processOption(processOption_db, data)
                processOption_db_list.append(processOption_db)
            db.session.add_all(processOption_db_list)
            db.session.flush()
            db.session.commit()

            processOption_dto = processOption_schema.dump(processOption_db_list, many=True)
            resp = message(True, "processOptions have been updated..")
            resp["data"] = processOption_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def delete_processOption(id):
        try:
            # Check if the processOption has been used in Process
            if not isDeletable(id):
                return err_resp("ProcessOption is in use", "ProcessOption_409", 409)

            processOption_db = ProcessOption.query.filter(
                ProcessOption.id == id
            ).first()
            if processOption_db is None:
                return err_resp("ProcessOption not found", "ProcessOption_404", 404)  

            db.session.delete(processOption_db)
            db.session.commit()
            resp = message(True, "ProcessOption has been deleted.")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error