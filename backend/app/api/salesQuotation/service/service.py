from datetime import datetime
import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.machine import Machine
from app.models.processOption import ProcessOption
from app.models.salesQuotation.salesQuotation import SalesQuotation
from app.models.salesQuotation.SQProcess import SQProcess
from app.models.salesQuotation.SQMaterialCostSetting import SQMaterialCostSetting
from app.models.salesQuotation.SQMaterialCost import SQMaterialCost
from app.models.salesQuotation.SQPackagingCost import SQPackagingCost
from app.models.salesQuotation.SQInjectionMoldingCost import SQInjectionMoldingCost
from app.models.salesQuotation.SQInPostProcessingCost import SQInPostProcessingCost
from app.models.salesQuotation.SQOutPostProcessingCost import SQOutPostProcessingCost
from app.models.salesQuotation.SQFreight import SQFreight
from app.models.salesQuotation.SQCustomsDuty import SQCustomsDuty
from app.api.option.optionEnum import ProcessCategoryEnum
from .material_service import create_materialSetting, create_material, update_materialSetting, create_update_delete_material
from .packaging_service import create_packaging, create_update_delete_packaging
from .injectionMolding_service import create_injectionMolding, update_injectionMolding
from .inPostProcessing_service import create_inPostProcessing, create_update_delete_inPostProcessing
from .outPostProcessing_service import create_outPostProcessing, create_update_delete_outPostProcessing
from .shipping_service import create_update_delete_freight, create_update_delete_customsDuty
from ..schemas import SalesQuotationSchema, ShippingCostSchema, SQProcessSchema, SQMaterialCostSettingSchema, SQMaterialCostSchema, SQPackagingCostSchema, SQInjectionMoldingCostSchema, SQInPostProcessingCostSchema, SQOutPostProcessingCostSchema, SQFreightSchema, SQCustomsDutySchema
salesQuotation_schema = SalesQuotationSchema()


def generate_quotationSN():
    """Generate quotationSN
       Format: SYYYYMMDDXXX
    """
    try:
        prefix = "S"
        today = datetime.now()
        year = today.strftime("%Y")
        month = today.strftime("%m")
        day = today.strftime("%d")
        # get the last quotationSN
        last_salesQuotation = db.session.query(SalesQuotation).order_by(SalesQuotation.id.desc()).first()
        if last_salesQuotation is None:
            return f"{prefix}{year}{month}{day}001"
        else:
            last_quotationSN = last_salesQuotation.quotationSN
            last_quotationSN_date = last_quotationSN[1:9]
            last_quotationSN_num = last_quotationSN[9:]
            if last_quotationSN_date == f"{year}{month}{day}":
                num = int(last_quotationSN_num) + 1
                return f"{prefix}{year}{month}{day}{num:03}"
            else:
                return f"{prefix}{year}{month}{day}001"
    except Exception as error:
        raise error


def calculate_subtotalCostWithoutOverhead(salesQuotationId):
    # Get all processes for the salesQuotation
    processes = SQProcess.query.filter(SQProcess.salesQuotationId == salesQuotationId).all()
    subtotalCostWithoutOverhead = 0
    # Calculate all costs for each process
    for process in processes:
        # 原物料費用小計(SQMaterialCost) = (「金額」加總 + 抽料費用) * (1+預估不良率)
        SQMaterialCost_total = 0
        SQMaterialCostSetting_db = SQMaterialCostSetting.query.filter(SQMaterialCostSetting.SQProcessId == process.id).first()
        if SQMaterialCostSetting_db:
            SQMaterialCost_db_list = SQMaterialCost.query.filter(SQMaterialCost.SQProcessId == process.id).all()
            SQMaterialCost_total = sum([material.amount for material in SQMaterialCost_db_list])
            SQMaterialCost_total = (SQMaterialCost_total + SQMaterialCostSetting_db.extractionCost) * (1 + SQMaterialCostSetting_db.estimatedDefectRate)
        # 包材費用小計(SQPackagingCost) = 「金額」加總
        SQPackagingCost_db_list = SQPackagingCost.query.filter(SQPackagingCost.SQProcessId == process.id).all()
        SQPackagingCost_total = sum([packaging.amount for packaging in SQPackagingCost_db_list])
        # 成型加工費用小計(SQInjectionMoldingCost) = 小計 + 電費
        SQInjectionMoldingCost_db_list = SQInjectionMoldingCost.query.filter(SQInjectionMoldingCost.SQProcessId == process.id).all()
        SQInjectionMoldingCost_total = sum([injectionMolding.subtotal for injectionMolding in SQInjectionMoldingCost_db_list]) + \
                                    sum([injectionMolding.electricityCost for injectionMolding in SQInjectionMoldingCost_db_list])
        # 廠內後製程費用小計(SQInPostProcessingCost) = 「金額」加總
        SQInPostProcessingCost_db_list = SQInPostProcessingCost.query.filter(SQInPostProcessingCost.SQProcessId == process.id).all()
        SQInPostProcessingCost_total = sum([inPostProcessing.amount for inPostProcessing in SQInPostProcessingCost_db_list])
        # 委外後製程費用小計(SQOutPostProcessingCost) = 「金額」加總
        SQOutPostProcessingCost_db_list = SQOutPostProcessingCost.query.filter(SQOutPostProcessingCost.SQProcessId == process.id).all()
        SQOutPostProcessingCost_total = sum([outPostProcessing.amount for outPostProcessing in SQOutPostProcessingCost_db_list])

        subtotalCostWithoutOverhead += SQMaterialCost_total + SQPackagingCost_total + \
                                    SQInjectionMoldingCost_total + SQInPostProcessingCost_total + SQOutPostProcessingCost_total

    return subtotalCostWithoutOverhead


def update_subtotalCostWithoutOverhead(salesQuotationId):
    salesQuotation_db = SalesQuotation.query.get(salesQuotationId)
    salesQuotation_db.subtotalCostWithoutOverhead = calculate_subtotalCostWithoutOverhead(salesQuotationId)
    db.session.add(salesQuotation_db)
    db.session.commit()


def complete_salesQuotation(db_obj, payload):
    db_obj.customerName = payload["customerName"] \
        if payload.get("customerName") is not None else db_obj.customerName
    db_obj.productName = payload["productName"] \
        if payload.get("productName") is not None else db_obj.productName
    db_obj.subtotalCostWithoutOverhead = float(payload["subtotalCostWithoutOverhead"]) \
        if payload.get("subtotalCostWithoutOverhead") is not None else db_obj.subtotalCostWithoutOverhead
    db_obj.overheadRnd = float(payload["overheadRnd"]) \
        if payload.get("overheadRnd") is not None else db_obj.overheadRnd
    db_obj.profit = float(payload["profit"]) \
        if payload.get("profit") is not None else db_obj.profit
    db_obj.risk = float(payload["risk"]) \
        if payload.get("risk") is not None else db_obj.risk
    db_obj.annualDiscount = float(payload["annualDiscount"]) \
        if payload.get("annualDiscount") is not None else db_obj.annualDiscount
    db_obj.rebate = float(payload["rebate"]) \
        if payload.get("rebate") is not None else db_obj.rebate
    db_obj.actualQuotation = float(payload["actualQuotation"]) \
        if payload.get("actualQuotation") is not None else db_obj.actualQuotation
    return db_obj


class SalesQuotationService:
    @staticmethod
    def get_salesQuotation(salesQuotationId):
        try:
            if (salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            
            # get SQFreight by salesQuotationId
            freight_db = db.session.execute(
                db.select(SQFreight)
                .filter(SQFreight.salesQuotationId == salesQuotationId)
            ).scalars().all()
            freight_dump = SQFreightSchema().dump(freight_db, many=True)
            salesQuotation_db.freights = freight_dump

            # get SQCustomsDuty by salesQuotationId
            customsDuty_db = db.session.execute(
                db.select(SQCustomsDuty)
                .filter(SQCustomsDuty.salesQuotationId == salesQuotationId)
            ).scalars().all()
            customsDuty_dump = SQCustomsDutySchema().dump(customsDuty_db, many=True)
            salesQuotation_db.customsDuties = customsDuty_dump

            # ShippingCostSchema
            shipping = {"SQFreights": freight_db, "SQCustomsDuties": customsDuty_db}
            salesQuotation_db.shippingCosts = ShippingCostSchema().dump(shipping)
            
            # get SQProcess by salesQuotationId
            query = SQProcess.query
            query = query.join(ProcessOption, SQProcess.processOptionId == ProcessOption.id)
            process_db_list = query.filter(SQProcess.salesQuotationId == salesQuotationId).all()
            if process_db_list:
                process_dump_list = []
                for process_db in process_db_list:
                    process_db.processCategory = process_db.processOptions.processCategory
                    process_db.processSN = process_db.processOptions.processSN
                    process_db.processName = process_db.processOptions.processName
                    
                    # get SQMaterialCostSetting by SQProcessId
                    materialSetting_db = db.session.execute(
                        db.select(SQMaterialCostSetting)
                        .filter(SQMaterialCostSetting.SQProcessId == process_db.id)
                    ).scalars().first()
                    if materialSetting_db:
                        materialSetting_dump = SQMaterialCostSettingSchema().dump(materialSetting_db)
                        process_db.SQMaterialCostSetting = materialSetting_dump

                    # get SQMaterialCost by SQProcessId
                    material_db = db.session.execute(
                        db.select(SQMaterialCost)
                        .filter(SQMaterialCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if material_db:
                        material_dump = SQMaterialCostSchema().dump(material_db, many=True)
                        process_db.SQMaterialCosts = material_dump

                    # get SQPackagingCost by SQProcessId
                    packaging_db = db.session.execute(
                        db.select(SQPackagingCost)
                        .filter(SQPackagingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if packaging_db:
                        packaging_dump = SQPackagingCostSchema().dump(packaging_db, many=True)
                        process_db.SQPackagingCosts = packaging_dump

                    # get SQInjectionMoldingCost by SQProcessId
                    # inner join machine on SQInjectionMoldingCost.machineId = machine.id
                    injectionMolding_db_list = db.session.execute(
                        db.select(SQInjectionMoldingCost)
                        .join(Machine, SQInjectionMoldingCost.machineId == Machine.id)
                        .filter(SQInjectionMoldingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    for injectionMolding_db in injectionMolding_db_list:
                        injectionMolding_db.machineSN = injectionMolding_db.machines.machineSN
                        injectionMolding_db.electricityCostPerSec = injectionMolding_db.machines.electricityCostPerSec
                    if injectionMolding_db_list:
                        injectionMolding_dump = SQInjectionMoldingCostSchema().dump(injectionMolding_db_list, many=True)
                        process_db.SQInjectionMoldingCosts = injectionMolding_dump

                    # get SQInPostProcessingCost by SQProcessId
                    inPostProcessing_db = db.session.execute(
                        db.select(SQInPostProcessingCost)
                        .filter(SQInPostProcessingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if inPostProcessing_db:
                        inPostProcessing_dump = SQInPostProcessingCostSchema().dump(inPostProcessing_db, many=True)
                        process_db.SQInPostProcessingCosts = inPostProcessing_dump

                    # get SQOutPostProcessingCost by SQProcessId
                    outPostProcessing_db = db.session.execute(
                        db.select(SQOutPostProcessingCost)
                        .filter(SQOutPostProcessingCost.SQProcessId == process_db.id)
                    ).scalars().all()
                    if outPostProcessing_db:
                        outPostProcessing_dump = SQOutPostProcessingCostSchema().dump(outPostProcessing_db, many=True)
                        process_db.SQOutPostProcessingCosts = outPostProcessing_dump

                    process_dump = SQProcessSchema().dump(process_db)
                    process_dump_list.append(process_dump)

                salesQuotation_db.processes = process_dump_list

            salesQuotation_dto = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation data sent")
            resp["data"] = salesQuotation_dto
            return resp, 200
        except Exception as error:
            raise error
        
        

    @staticmethod
    def get_products():
        try:
            query = SalesQuotation.query
            query = query.with_entities(SalesQuotation.id, SalesQuotation.quotationSN, SalesQuotation.createDate, SalesQuotation.customerName, SalesQuotation.productName)
            SalesQuotation_db = query.all()
            SalesQuotation_dump = salesQuotation_schema.dump(SalesQuotation_db, many=True)
            resp = message(True, "products data sent")
            resp["data"] = SalesQuotation_dump
            return resp, 200
        except Exception as error:
            raise error


    # create SalesQuotation
    @staticmethod
    def create_salesQuotation(payload):
        try:
            # 新增報價單
            salesQuotation_db = SalesQuotation()
            salesQuotation_db.quotationSN = generate_quotationSN()
            salesQuotation_db.createDate = datetime.fromisoformat(payload["createDate"])
            # 給予利潤管裡的預設值
            salesQuotation_db.overheadRnd = 0.07
            salesQuotation_db.profit = 0.05
            salesQuotation_db.risk = 0.02
            salesQuotation_db.annualDiscount = 0.02
            salesQuotation_db.rebate = 0.02
            
            db.session.add(salesQuotation_db)
            db.session.flush()
            
            # 新增運費、貨運與關稅
            SQFreight_db = SQFreight()
            SQFreight_db.salesQuotationId = salesQuotation_db.id
            SQCustomsDuty_db = SQCustomsDuty()
            SQCustomsDuty_db.salesQuotationId = salesQuotation_db.id
            
            db.session.add_all([SQFreight_db, SQCustomsDuty_db])
            db.session.commit()

            salesQuotation_dump = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation have been created..")
            resp["data"] = salesQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # update SalesQuotation
    @staticmethod
    def update_salesQuotation(salesQuotationId, payload):
        try:
            if(salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            salesQuotation_db = complete_salesQuotation(salesQuotation_db, payload)
            db.session.add(salesQuotation_db)
            db.session.commit()

            salesQuotation_dump = salesQuotation_schema.dump(salesQuotation_db)
            resp = message(True, "salesQuotation have been updated.")
            resp["data"] = salesQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # delete SalesQuotation
    @staticmethod
    def delete_salesQuotation(salesQuotationId):
        try:
            if(salesQuotation_db := SalesQuotation.query.get(salesQuotationId)) is None:
                return err_resp("salesQuotation not found", "salesQuotation_404", 404)
            # check if salesQuotation is empty, except quotationSN and createDate
            if salesQuotation_db.customerName is not None or salesQuotation_db.productName is not None:
                return err_resp("salesQuotation cannot be deleted", "salesQuotation_409", 409)
            
            # delete freight and customsDuty
            if (SQFreight_db := SQFreight.query.filter(SQFreight.salesQuotationId == salesQuotationId).first()) is not None:
                db.session.delete(SQFreight_db)
            if (SQCustomsDuty_db := SQCustomsDuty.query.filter(SQCustomsDuty.salesQuotationId == salesQuotationId).first()) is not None:
                db.session.delete(SQCustomsDuty_db)

            db.session.delete(salesQuotation_db)
            db.session.commit()

            resp = message(True, "salesQuotation have been deleted.")

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    
    
    # create SalesQuotationProcess
    @staticmethod
    def create_salesQuotationProcess(salesQuotationId, payload):
        try:
            # Get the process category
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == payload["processOptionId"]).first()) is None:
                return err_resp("process not found", "process_404", 404)

            # 新增製程
            SQProcess_db = SQProcess()
            SQProcess_db.salesQuotationId = salesQuotationId
            SQProcess_db.processOptionId = payload["processOptionId"]
            db.session.add(SQProcess_db)
            db.session.flush()
            # Get the new id of SQProcess
            newSQProcessId = SQProcess_db.id

            add_to_session_list = []
            # 新增 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if  processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQInjectionMoldingCost_db_list = create_injectionMolding(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQInjectionMoldingCost_db_list])
            # 新增 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQOutPostProcessingCost_db_list = create_outPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQOutPostProcessingCost_db_list])
            # 新增 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQInPostProcessingCost_db_list = create_inPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQInPostProcessingCost_db_list])
            # 新增 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                SQMaterialCostSetting_db = create_materialSetting(newSQProcessId, payload)
                SQMaterialCost_db_list = create_material(newSQProcessId, payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                SQPackagingCost_db_list = create_packaging(newSQProcessId, payload)
                SQOutPostProcessingCost_db_list = create_outPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend([SQMaterialCostSetting_db, *SQMaterialCost_db_list, *SQPackagingCost_db_list, *SQOutPostProcessingCost_db_list])
            # 新增 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                SQInPostProcessingCost_db_list = create_inPostProcessing(newSQProcessId, payload)
                add_to_session_list.extend(SQInPostProcessingCost_db_list)
            
            db.session.add_all(add_to_session_list)
            db.session.commit()

            # 更新 SalesQuotation 的 subtotalCostWithoutOverhead
            update_subtotalCostWithoutOverhead(salesQuotationId)

            resp = message(True, "salesQuotation process have been created..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # update SalesQuotationProcess
    @staticmethod
    def update_salesQuotationProcess(salesQuotationId, payload):
        try:
            # Get the process category from payload["id"]
            process_db = SQProcess.query.get(payload["id"])
            if process_db is None:
                return err_resp("SQProcess not found", "SQProcess_404", 404)
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == process_db.processOptionId).first()) is None:
                return err_resp("process not found", "process_404", 404)
            
            create_update_session_list = []
            delete_session_list = []
            # 更新 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                SQInjectionMoldingCost_db_list = update_injectionMolding(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *SQInjectionMoldingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            # 更新 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                created_updated_outPostProcessingCost_db_list, deleted_outPostProcessingCost_db_list = create_update_delete_outPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *created_updated_outPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list, *deleted_outPostProcessingCost_db_list])
            # 更新 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                created_updated_inPostProcessingCost_db_list, deleted_inPostProcessingCost_db_list = create_update_delete_inPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *created_updated_inPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list, *deleted_inPostProcessingCost_db_list])
            # 更新 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                SQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, SQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                created_updated_outPostProcessingCost_db_list, deleted_outPostProcessingCost_db_list = create_update_delete_outPostProcessing(payload)
                create_update_session_list.extend([SQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *created_updated_outPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list, *deleted_outPostProcessingCost_db_list])
            # 更新 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                created_updated_inPostProcessingCost_db_list, deleted_inPostProcessingCost_db_list = create_update_delete_inPostProcessing(payload)
                create_update_session_list.extend(created_updated_inPostProcessingCost_db_list)
                delete_session_list.extend([*deleted_inPostProcessingCost_db_list])
            
            db.session.add_all(create_update_session_list)
            for delete_session in delete_session_list:
                db.session.delete(delete_session)
            db.session.commit()

            # 更新 SalesQuotation 的 subtotalCostWithoutOverhead
            update_subtotalCostWithoutOverhead(salesQuotationId)

            resp = message(True, "salesQuotation process have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
    

    # update SalesQuotationProcess
    @staticmethod
    def delete_salesQuotationProcess(salesQuotationId, SQProcessId):
        try:
            # Retrieve main SQProcess record
            if (SQProcess_db := SQProcess.query.get(SQProcessId)) is None:
                return err_resp("salesQuotation process not found", "salesQuotation process_404", 404)
            
            # Get the process category
            processOption_db = ProcessOption.query.filter_by(id=SQProcess_db.processOptionId).first()
            if processOption_db is None:
                return err_resp("process not found", "process_404", 404)
            
            # Define deletions by process category
            deletion_map = {
                ProcessCategoryEnum.In_IJ.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQInjectionMoldingCost
                ],
                ProcessCategoryEnum.Out_IJ.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQOutPostProcessingCost
                ],
                ProcessCategoryEnum.In_BE.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQInPostProcessingCost
                ],
                ProcessCategoryEnum.Out_BE.value: [
                    SQMaterialCostSetting, SQMaterialCost, SQPackagingCost, SQOutPostProcessingCost
                ],
                ProcessCategoryEnum.In_TS.value: [
                    SQInPostProcessingCost
                ]
            }

            # Get models to delete based on the process category
            models_to_delete = deletion_map.get(processOption_db.processCategory, [])

            # Perform deletions for related records
            for model in models_to_delete:
                related_records = model.query.filter_by(SQProcessId=SQProcessId).all()
                for record in related_records:
                    db.session.delete(record)

            # Delete the main SQProcess record
            db.session.delete(SQProcess_db)
            db.session.commit()

            # 更新 SalesQuotation 的 subtotalCostWithoutOverhead
            update_subtotalCostWithoutOverhead(salesQuotationId)

            resp = message(True, "salesQuotation process has been deleted.")
            return resp, 200
        
        except Exception as error:
            db.session.rollback()
            raise error


    @staticmethod
    def update_shippingCosts(salesQuotationId, payload):
        try:
            create_update_session_list = []
            delete_session_list = []
            created_updated_SQFreight_db_list, deleted_SQFreight_db_list = create_update_delete_freight(salesQuotationId, payload)
            created_updated_SQCustomsDuty_db_list, deleted_SQCustomsDuty_db_list = create_update_delete_customsDuty(salesQuotationId, payload)
            create_update_session_list.extend([*created_updated_SQFreight_db_list, *created_updated_SQCustomsDuty_db_list])
            delete_session_list.extend([*deleted_SQFreight_db_list, *deleted_SQCustomsDuty_db_list])
            db.session.add_all(create_update_session_list)
            for delete_session in delete_session_list:
                db.session.delete(delete_session)
            db.session.commit()

            resp = message(True, "salesQuotation ShippingCost have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
