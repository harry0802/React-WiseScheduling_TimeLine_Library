import sys
from flask import current_app
from sqlalchemy.orm import load_only
from sqlalchemy.orm import contains_eager
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app import db
from app.utils import message, err_resp, internal_err_resp
from app.models.process import Process
from app.models.material import Material
from app.models.processOption import ProcessOption
from app.models.processMold import ProcessMold
from app.models.processMaterial import ProcessMaterial
from app.models.ltmoldmap import LtMoldMap
from app.models.productionSchedule import ProductionSchedule
from .schemas import processSchema, moldsSchema, materialsSchema
process_schema = processSchema()
molds_schema = moldsSchema()
materials_schema = materialsSchema()


def check_isEditable_isDeletable(id):
    """1.製程順序還未被引用在產線排程中，允許修改和刪除
       2.產品若被排入排程，製程順序與內容不能被刪除與修改，除非完成或暫停此產品所有單據

    Args:
        id (_type_): _description_
    """
    result = True
    # check if the process id is in the productionSchedule table
    productionSchedule_db = db.session.execute(
        db.select(ProductionSchedule)
        .filter(ProductionSchedule.processId == id)
    ).scalars().all()
    if productionSchedule_db:
        result = False
    return result


def complete_process(db_obj, payload):
    db_obj.productId = payload["productId"] \
        if payload.get("productId") is not None else db_obj.productId
    db_obj.processOptionId = payload["processOptionId"] \
        if payload.get("processOptionId") is not None else db_obj.processOptionId
    db_obj.jigSN = payload["jigSN"] \
        if payload.get("jigSN") is not None else db_obj.jigSN
    return db_obj


class processService:
    @staticmethod
    def get_processes(productId, processCategory=None):
        try:
            # Get the process by product id
            query = Process.query
            query = query.join(ProcessOption, Process.processOptionId == ProcessOption.id)
            query = query.filter(Process.productId == productId)
            query = query.filter(ProcessOption.processCategory == processCategory) if processCategory is not None else query
            process_db_list = query.all()

            for process_db in process_db_list:
                # get ProcessOption 
                process_db.processCategory = process_db.processOptions.processCategory
                process_db.processSN = process_db.processOptions.processSN
                process_db.processName = process_db.processOptions.processName

                # get molds by processId
                mold_db = db.session.execute(
                    db.select(LtMoldMap)
                    .join(ProcessMold, LtMoldMap.no == ProcessMold.ltmoldmapId)
                    .filter(ProcessMold.processId == process_db.id)
                ).scalars().all()
                mold_schema_dump = molds_schema.dump(mold_db, many=True)
                process_db.molds = mold_schema_dump

                # get materials by processId
                material_db = db.session.execute(
                    db.select(Material)
                    .join(ProcessMaterial, Material.id == ProcessMaterial.materialId)
                    .filter(ProcessMaterial.processId == process_db.id)
                ).scalars().all()
                material_schema_dump = materials_schema.dump(material_db, many=True)
                process_db.materials = material_schema_dump
            
            process_dto = process_schema.dump(process_db_list, many=True)
            resp = message(True, "process data sent")
            resp["data"] = process_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    @staticmethod
    def get_process_by_id(id):
        try:
            # Get the process by id
            process_db = Process.query.filter(Process.id == id).first()
            if process_db is None:
                return err_resp("process not found", "process_404", 404)

            # get ProcessOption 
            process_db.processCategory = process_db.processOptions.processCategory
            process_db.processSN = process_db.processOptions.processSN
            process_db.processName = process_db.processOptions.processName

            # get molds by processId
            mold_db = db.session.execute(
                db.select(LtMoldMap)
                .join(ProcessMold, LtMoldMap.no == ProcessMold.ltmoldmapId)
                .filter(ProcessMold.processId == id)
            ).scalars().all()
            mold_dto = molds_schema.dump(mold_db, many=True)
            process_db.molds = mold_dto

            # get materials by processId
            material_db = db.session.execute(
                db.select(Material)
                .join(ProcessMaterial, Material.id == ProcessMaterial.materialId)
                .filter(ProcessMaterial.processId == id)
            ).scalars().all()
            material_dto = materials_schema.dump(material_db, many=True)
            process_db.materials = material_dto

            process_dto = process_schema.dump(process_db)
            resp = message(True, "process data sent")
            resp["data"] = process_dto
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        

    # create multiple processes
    @staticmethod
    def create_processes(payloads):
        try:
            process_db_list = []
            for data in payloads:
                process_db = complete_process(Process(), data)
                # insert to db and get the new primary key
                db.session.add(process_db)
                db.session.flush()
                process_db_list.append(process_db)

                # insert data to ltmoldmap table
                ltmoldmap_db_list = []
                for mold in data["molds"]:
                    ltmoldmap_db = LtMoldMap(
                        moldno = mold["moldno"],
                    )
                    ltmoldmap_db_list.append(ltmoldmap_db)
                db.session.add_all(ltmoldmap_db_list)
                db.session.flush()

                # insert data to processmold table
                processmold_db_list = []
                for mold in ltmoldmap_db_list:
                    processmold_db = ProcessMold(
                        processId = process_db.id,
                        ltmoldmapId = mold.no
                    )
                    processmold_db_list.append(processmold_db)
                db.session.add_all(processmold_db_list)
                db.session.flush()

                # insert data to processmaterial table
                processmaterial_db_list = []
                for material in data["materials"]:
                    processmaterial_db = ProcessMaterial(
                        processId=process_db.id,
                        materialId = material["id"],
                    )
                    processmaterial_db_list.append(processmaterial_db)
                db.session.add_all(processmaterial_db_list)
                db.session.flush()
                
            db.session.commit()

            process_dto = process_schema.dump(process_db_list, many=True)
            resp = message(True, "processes have been created..")
            resp["data"] = process_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple processes
    @staticmethod
    def update_processes(payloads):
        try:
            process_db_list = []
            for data in payloads:
                if check_isEditable_isDeletable(data["id"]) == False:
                    return err_resp("process cannot be edited", "process_409", 409)

                process_db = Process.query.filter(
                    Process.id == data["id"]
                ).first()
                if process_db is None:
                    return err_resp("process not found", "process_404", 404)
                
                process_db = complete_process(process_db, data)
                # insert to db and get the new primary key
                db.session.add(process_db)
                db.session.flush()
                process_db_list.append(process_db)
                
                if "molds" in data:
                    insert_ltmoldmap_db_list = []
                    update_ltmoldmap_db_list = []
                    for mold in data["molds"]:
                        # insert data to ltmoldmap table if id field does not exist in data["molds"]
                        if "id" not in mold:
                            ltmoldmap_db = LtMoldMap(
                                moldno = mold["moldno"],
                            )
                            insert_ltmoldmap_db_list.append(ltmoldmap_db)
                        # update data to ltmoldmap table if id field exist in data["molds"]
                        else:
                            ltmoldmap_db = LtMoldMap.query.filter(
                                LtMoldMap.no == mold["id"]
                            ).first()
                            if ltmoldmap_db is None:
                                return err_resp("mold not found", "mold_404", 404)
                            ltmoldmap_db.moldno = mold["moldno"]
                            update_ltmoldmap_db_list.append(ltmoldmap_db)
                        db.session.add_all(insert_ltmoldmap_db_list)
                        db.session.flush()
                        db.session.add_all(update_ltmoldmap_db_list)
                        db.session.flush()
                    # delete data from processmold table where processId = process_db.id
                    db.session.query(ProcessMold).filter(ProcessMold.processId == process_db.id).delete()
                    db.session.flush()
                    # insert data to processmold table
                    ltmoldmap_id_list = [ltmoldmap_db.no for ltmoldmap_db in insert_ltmoldmap_db_list]
                    ltmoldmap_id_list += [ltmoldmap_db.no for ltmoldmap_db in update_ltmoldmap_db_list]
                    processmold_db_list = []
                    for id in ltmoldmap_id_list:
                        processmold_db = ProcessMold(
                            processId = process_db.id,
                            ltmoldmapId = id
                        )
                        processmold_db_list.append(processmold_db)
                    db.session.add_all(processmold_db_list)
                    db.session.flush()
                
                if "materials" in data:
                    # delete data from processmaterial table where processId = process_db.id
                    db.session.query(ProcessMaterial).filter(ProcessMaterial.processId == process_db.id).delete()
                    db.session.flush()
                    # insert data to processmaterial table
                    for material in data["materials"]:
                        processmaterial_db = ProcessMaterial(
                            processId=process_db.id,
                            materialId = material["id"],
                        )
                        db.session.add(processmaterial_db)
                        db.session.flush()
                
            db.session.commit()

            process_dto = process_schema.dump(process_db_list, many=True)
            resp = message(True, "processes have been updated..")
            resp["data"] = process_dto

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    @staticmethod
    def delete_process(id):
        try:
            if check_isEditable_isDeletable(id) == False:
                    return err_resp("process cannot be deleted", "process_409", 409)
            
            # Get the process by id
            process_db = Process.query.filter(Process.id == id).first()
            if process_db is None:
                return err_resp("process not found", "process_404", 404)
            
            # delete data from processmold table where processId = id
            ltmoldmapId_list = db.session.execute(
                                    db.select(ProcessMold.ltmoldmapId).filter(ProcessMold.processId == id)
                                ).scalars().all()
            db.session.query(ProcessMold).filter(ProcessMold.processId == id).delete()
            db.session.flush()

            # delete data from ltmoldmap table where no = processmold.ltmoldmapId
            db.session.query(LtMoldMap).filter(
                LtMoldMap.no.in_(ltmoldmapId_list)
            ).delete()
            db.session.flush()

            # delete data from processmaterial table where processId = id
            db.session.query(ProcessMaterial).filter(ProcessMaterial.processId == id).delete()
            db.session.flush()

            db.session.delete(process_db)
            db.session.flush()
            db.session.commit()

            resp = message(True, "process has been deleted")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error