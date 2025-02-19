from datetime import datetime
import sys
from app import db
from app.utils_log import message, err_resp
from app.models.machine import Machine
from app.models.process import Process
from app.models.product import Product
from app.models.processOption import ProcessOption
from app.models.factoryQuotation.factoryQuotation import FactoryQuotation
from app.models.factoryQuotation.FQProcess import FQProcess
from app.models.factoryQuotation.FQMaterialCostSetting import FQMaterialCostSetting
from app.models.factoryQuotation.FQMaterialCost import FQMaterialCost
from app.models.factoryQuotation.FQPackagingCost import FQPackagingCost
from app.models.factoryQuotation.FQInjectionMoldingCost import FQInjectionMoldingCost
from app.models.factoryQuotation.FQInPostProcessingCost import FQInPostProcessingCost
from app.models.factoryQuotation.FQOutPostProcessingCost import FQOutPostProcessingCost
from app.models.factoryQuotation.FQFreight import FQFreight
from app.models.factoryQuotation.FQCustomsDuty import FQCustomsDuty
from app.api.option.optionEnum import ProcessCategoryEnum
from ..schemas import FactoryQuotationSchema, ShippingCostSchema, FQProcessSchema, FQMaterialCostSettingSchema, FQMaterialCostSchema, FQPackagingCostSchema, FQInjectionMoldingCostSchema, FQInPostProcessingCostSchema, FQOutPostProcessingCostSchema, FQFreightSchema, FQCustomsDutySchema
from .syncProcesses_service import sync_processes
from .material_service import update_materialSetting, update_material
from .packaging_service import update_packaging
from .injectionMolding_service import update_injectionMolding
from .inPostProcessing_service import create_update_delete_inPostProcessing
from .outPostProcessing_service import create_update_delete_outPostProcessing
from .shipping_service import create_update_delete_freight, create_update_delete_customsDuty
from app.api.product.schemas import productSchema
factoryQuotation_schema = FactoryQuotationSchema()


def generate_quotationSN():
    """Generate quotationSN
       Format: FYYYYMMDDXXX
    """
    try:
        prefix = "F"
        today = datetime.now()
        year = today.strftime("%Y")
        month = today.strftime("%m")
        day = today.strftime("%d")
        # get the last quotationSN
        last_factoryQuotation = db.session.query(FactoryQuotation).order_by(FactoryQuotation.id.desc()).first()
        if last_factoryQuotation is None:
            return f"{prefix}{year}{month}{day}001"
        else:
            last_quotationSN = last_factoryQuotation.quotationSN
            last_quotationSN_date = last_quotationSN[1:9]
            last_quotationSN_num = last_quotationSN[9:]
            if last_quotationSN_date == f"{year}{month}{day}":
                num = int(last_quotationSN_num) + 1
                return f"{prefix}{year}{month}{day}{num:03}"
            else:
                return f"{prefix}{year}{month}{day}001"
    except Exception as error:
        raise error


def calculate_subtotalCostWithoutOverhead(factoryQuotationId):
    # Get all processes for the factoryQuotation
    processes = FQProcess.query.filter(FQProcess.factoryQuotationId == factoryQuotationId).all()
    subtotalCostWithoutOverhead = 0
    # Calculate all costs for each process
    for process in processes:
        # 原物料費用小計(FQMaterialCost) = (「金額」加總 + 抽料費用) * (1+預估不良率)
        FQMaterialCost_total = 0
        FQMaterialCostSetting_db = FQMaterialCostSetting.query.filter(FQMaterialCostSetting.FQProcessId == process.id).first()
        if FQMaterialCostSetting_db:
            FQMaterialCost_db_list = FQMaterialCost.query.filter(FQMaterialCost.FQProcessId == process.id).all()
            FQMaterialCost_total = sum([material.amount if material.amount else 0 for material in FQMaterialCost_db_list])
            FQMaterialCost_total = (FQMaterialCost_total + FQMaterialCostSetting_db.extractionCost) * (1 + FQMaterialCostSetting_db.estimatedDefectRate)
        # 包材費用小計(FQPackagingCost) = 「金額」加總
        FQPackagingCost_db_list = FQPackagingCost.query.filter(FQPackagingCost.FQProcessId == process.id).all()
        FQPackagingCost_total = sum([packaging.amount if packaging.amount else 0 for packaging in FQPackagingCost_db_list])
        # 成型加工費用小計(FQInjectionMoldingCost) = 小計 + 電費
        FQInjectionMoldingCost_db_list = FQInjectionMoldingCost.query.filter(FQInjectionMoldingCost.FQProcessId == process.id).all()
        FQInjectionMoldingCost_total = sum([injectionMolding.subtotal if injectionMolding.subtotal else 0 for injectionMolding in FQInjectionMoldingCost_db_list]) + \
                                    sum([injectionMolding.electricityCost if injectionMolding.electricityCost else 0 for injectionMolding in FQInjectionMoldingCost_db_list])
        # 廠內後製程費用小計(FQInPostProcessingCost) = 「金額」加總
        FQInPostProcessingCost_db_list = FQInPostProcessingCost.query.filter(FQInPostProcessingCost.FQProcessId == process.id).all()
        FQInPostProcessingCost_total = sum([inPostProcessing.amount if inPostProcessing.amount else 0 for inPostProcessing in FQInPostProcessingCost_db_list])
        # 委外後製程費用小計(FQOutPostProcessingCost) = 「金額」加總
        FQOutPostProcessingCost_db_list = FQOutPostProcessingCost.query.filter(FQOutPostProcessingCost.FQProcessId == process.id).all()
        FQOutPostProcessingCost_total = sum([outPostProcessing.amount if outPostProcessing.amount else 0 for outPostProcessing in FQOutPostProcessingCost_db_list])

        subtotalCostWithoutOverhead += FQMaterialCost_total + FQPackagingCost_total + \
                                    FQInjectionMoldingCost_total + FQInPostProcessingCost_total + FQOutPostProcessingCost_total

    return subtotalCostWithoutOverhead


def update_subtotalCostWithoutOverhead(factoryQuotationId):
    """當廠內報價的製程有變動時，更新廠內報價的成本小計(不含管銷研)

    Args:
        factoryQuotationId (_type_): _description_
    """
    factoryQuotation_db = FactoryQuotation.query.get(factoryQuotationId)
    factoryQuotation_db.subtotalCostWithoutOverhead = calculate_subtotalCostWithoutOverhead(factoryQuotationId)
    db.session.add(factoryQuotation_db)
    db.session.commit()


def complete_factoryQuotation(db_obj, payload):
    db_obj.customerName = payload["customerName"] \
        if payload.get("customerName") is not None else db_obj.customerName
    db_obj.productSN = payload["productSN"] \
        if payload.get("productSN") is not None else db_obj.productSN
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


class FactoryQuotationService:
    @staticmethod
    def get_factoryQuotation_index(page, size, sort, productSN, productName, customerName):
        """廠內報價系統首頁，列出所有的產品

        Args:
            page (_type_): _description_
            size (_type_): _description_
            sort (_type_): _description_
            productSN (_type_): _description_
            productName (_type_): _description_
            customerName (_type_): _description_

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            query = FactoryQuotation.query
            query = query.with_entities(FactoryQuotation.id, FactoryQuotation.quotationSN, FactoryQuotation.createDate, FactoryQuotation.customerName, FactoryQuotation.productSN, FactoryQuotation.productName)
            query = query.filter(FactoryQuotation.productSN.like(f"%{productSN}%")) if productSN else query
            query = query.filter(FactoryQuotation.productName.like(f"%{productName}%")) if productName else query
            query = query.filter(FactoryQuotation.customerName.like(f"%{customerName}%")) if customerName else query
            if hasattr(FactoryQuotation, sort):
                query = query.order_by(getattr(FactoryQuotation, sort).desc())
            else:
                query = query.order_by(FactoryQuotation.id.desc())
            if size:
                pagination = query.paginate(page=page, per_page=size)
                factoryQuotation_db = pagination.items
                total_pages = pagination.pages
                total_count = pagination.total
            else:
                factoryQuotation_db = query.all()
                total_pages = 1
                total_count = len(factoryQuotation_db)

            FactoryQuotation_dump = factoryQuotation_schema.dump(factoryQuotation_db, many=True)
            resp = message(True, "products data sent")
            resp["data"] = FactoryQuotation_dump
            resp["meta"] = {
                "page": page,
                "size": size,
                "sort": sort if hasattr(FactoryQuotation, sort) else "id",
                "total_pages": total_pages,
                "total_count": total_count,
            }
            return resp, 200
        except Exception as error:
            raise error
        

    @staticmethod
    def get_products():
        """廠內報價，產品下拉選單的資料來源，只列出BOM表有製程的產品

        Raises:
            error: _description_

        Returns:
            _type_: _description_
        """
        try:
            query = Product.query
            query = query.with_entities(Product.id, Product.productSN, Product.productName)
            query = query.filter(Product.id.in_(db.session.query(Process.productId).distinct()))
            query = query.order_by(Product.productSN.asc())
            product_db = query.all()

            product_dump = productSchema().dump(product_db, many=True)
            resp = message(True, "products data sent")
            resp["data"] = product_dump
            return resp, 200
        except Exception as error:
            raise error
    
    
    @staticmethod
    def get_factoryQuotation(factoryQuotationId):
        try:
            if (factoryQuotation_db := FactoryQuotation.query.get(factoryQuotationId)) is None:
                return err_resp("factoryQuotation not found", "factoryQuotation_404", 404)
            
            # get FQFreight by factoryQuotationId
            freight_db = db.session.execute(
                db.select(FQFreight)
                .filter(FQFreight.factoryQuotationId == factoryQuotationId)
            ).scalars().all()
            freight_dump = FQFreightSchema().dump(freight_db, many=True)
            factoryQuotation_db.freights = freight_dump

            # get FQCustomsDuty by factoryQuotationId
            customsDuty_db = db.session.execute(
                db.select(FQCustomsDuty)
                .filter(FQCustomsDuty.factoryQuotationId == factoryQuotationId)
            ).scalars().all()
            customsDuty_dump = FQCustomsDutySchema().dump(customsDuty_db, many=True)
            factoryQuotation_db.customsDuties = customsDuty_dump

            # ShippingCostSchema
            shipping = {"FQFreights": freight_db, "FQCustomsDuties": customsDuty_db}
            factoryQuotation_db.shippingCosts = ShippingCostSchema().dump(shipping)
            
            # get FQProcess by factoryQuotationId
            query = FQProcess.query
            query = query.join(ProcessOption, FQProcess.processOptionId == ProcessOption.id)
            process_db_list = query.filter(FQProcess.factoryQuotationId == factoryQuotationId).all()
            if process_db_list:
                process_dump_list = []
                for process_db in process_db_list:
                    process_db.processCategory = process_db.processOptions.processCategory
                    process_db.processSN = process_db.processOptions.processSN
                    process_db.processName = process_db.processOptions.processName
                    
                    # get FQMaterialCostSetting by FQProcessId
                    materialSetting_db = db.session.execute(
                        db.select(FQMaterialCostSetting)
                        .filter(FQMaterialCostSetting.FQProcessId == process_db.id)
                    ).scalars().first()
                    if materialSetting_db:
                        materialSetting_dump = FQMaterialCostSettingSchema().dump(materialSetting_db)
                        process_db.FQMaterialCostSetting = materialSetting_dump

                    # get FQMaterialCost by FQProcessId
                    material_db = db.session.execute(
                        db.select(FQMaterialCost)
                        .filter(FQMaterialCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    if material_db:
                        material_dump = FQMaterialCostSchema().dump(material_db, many=True)
                        process_db.FQMaterialCosts = material_dump

                    # get FQPackagingCost by FQProcessId
                    packaging_db = db.session.execute(
                        db.select(FQPackagingCost)
                        .filter(FQPackagingCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    if packaging_db:
                        packaging_dump = FQPackagingCostSchema().dump(packaging_db, many=True)
                        process_db.FQPackagingCosts = packaging_dump

                    # get FQInjectionMoldingCost by FQProcessId
                    # left join machine on FQInjectionMoldingCost.machineId = machine.id
                    injectionMolding_db_list = db.session.execute(
                        db.select(FQInjectionMoldingCost)
                        .join(Machine, FQInjectionMoldingCost.machineId == Machine.id, isouter=True)
                        .filter(FQInjectionMoldingCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    for injectionMolding_db in injectionMolding_db_list:
                        injectionMolding_db.productionArea = injectionMolding_db.machines.productionArea if injectionMolding_db.machines else None
                        injectionMolding_db.machineSN = injectionMolding_db.machines.machineSN if injectionMolding_db.machines else None
                        injectionMolding_db.electricityCostPerSec = injectionMolding_db.machines.electricityCostPerSec if injectionMolding_db.machines else None
                    if injectionMolding_db_list:
                        injectionMolding_dump = FQInjectionMoldingCostSchema().dump(injectionMolding_db_list, many=True)
                        process_db.FQInjectionMoldingCosts = injectionMolding_dump

                    # get FQInPostProcessingCost by FQProcessId
                    inPostProcessing_db = db.session.execute(
                        db.select(FQInPostProcessingCost)
                        .filter(FQInPostProcessingCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    if inPostProcessing_db:
                        inPostProcessing_dump = FQInPostProcessingCostSchema().dump(inPostProcessing_db, many=True)
                        process_db.FQInPostProcessingCosts = inPostProcessing_dump

                    # get FQOutPostProcessingCost by FQProcessId
                    outPostProcessing_db = db.session.execute(
                        db.select(FQOutPostProcessingCost)
                        .filter(FQOutPostProcessingCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    if outPostProcessing_db:
                        outPostProcessing_dump = FQOutPostProcessingCostSchema().dump(outPostProcessing_db, many=True)
                        process_db.FQOutPostProcessingCosts = outPostProcessing_dump

                    process_dump = FQProcessSchema().dump(process_db)
                    process_dump_list.append(process_dump)

                factoryQuotation_db.processes = process_dump_list

            factoryQuotation_dto = factoryQuotation_schema.dump(factoryQuotation_db)
            resp = message(True, "factoryQuotation data sent")
            resp["data"] = factoryQuotation_dto
            return resp, 200
        except Exception as error:
            raise error
    
        
    # create FactoryQuotation
    @staticmethod
    def create_factoryQuotation(payload):
        try:
            # 新增報價單
            factoryQuotation_db = FactoryQuotation()
            factoryQuotation_db.quotationSN = generate_quotationSN()
            factoryQuotation_db.createDate = datetime.fromisoformat(payload["createDate"])
            # 給予利潤管裡的預設值
            factoryQuotation_db.overheadRnd = 0.07
            factoryQuotation_db.profit = 0.05
            factoryQuotation_db.risk = 0.02
            factoryQuotation_db.annualDiscount = 0.02
            factoryQuotation_db.rebate = 0.02
            db.session.add(factoryQuotation_db)
            db.session.flush()
            
            # 新增運費、貨運與關稅
            FQFreight_db = FQFreight()
            FQFreight_db.factoryQuotationId = factoryQuotation_db.id
            FQCustomsDuty_db = FQCustomsDuty()
            FQCustomsDuty_db.factoryQuotationId = factoryQuotation_db.id
            
            db.session.add_all([FQFreight_db, FQCustomsDuty_db])
            db.session.commit()

            factoryQuotation_dump = factoryQuotation_schema.dump(factoryQuotation_db)
            resp = message(True, "factoryQuotation have been created..")
            resp["data"] = factoryQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # update FactoryQuotation
    @staticmethod
    def update_factoryQuotation(factoryQuotationId, payload):
        try:
            if(factoryQuotation_db := FactoryQuotation.query.get(factoryQuotationId)) is None:
                return err_resp("factoryQuotation not found", "factoryQuotation_404", 404)
            
            # 如果payload有productSN，則同步產品履歷(BOM表)的製程到報價單，並更新報價單的subtotalCostWithoutOverhead
            if "productSN" in payload:
                # 先確認此次選擇的產品是否跟資料庫中的產品一樣
                # 產品不一樣才同步，如果選擇的產品與資料庫中的產品一樣，則不重複新增，不做任何動作
                if factoryQuotation_db.productSN != payload["productSN"]:
                    sync_processes(factoryQuotationId, payload["productSN"])
                    update_subtotalCostWithoutOverhead(factoryQuotationId)

            factoryQuotation_db = complete_factoryQuotation(factoryQuotation_db, payload)
            db.session.add(factoryQuotation_db)
            db.session.commit()

            factoryQuotation_dump = factoryQuotation_schema.dump(factoryQuotation_db)
            resp = message(True, "factoryQuotation have been updated.")
            resp["data"] = factoryQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
        
    
    # delete FactoryQuotation
    @staticmethod
    def delete_factoryQuotation(factoryQuotationId):
        try:
            if(factoryQuotation_db := FactoryQuotation.query.get(factoryQuotationId)) is None:
                return err_resp("factoryQuotation not found", "factoryQuotation_404", 404)
            # check if factoryQuotation is empty, except quotationSN and createDate
            if factoryQuotation_db.customerName is not None or factoryQuotation_db.productSN is not None or factoryQuotation_db.productName is not None:
                return err_resp("factoryQuotation cannot be deleted", "factoryQuotation_409", 409)
            
            # delete freight and customsDuty
            if (FQFreight_db := FQFreight.query.filter(FQFreight.factoryQuotationId == factoryQuotationId).first()) is not None:
                db.session.delete(FQFreight_db)
            if (FQCustomsDuty_db := FQCustomsDuty.query.filter(FQCustomsDuty.factoryQuotationId == factoryQuotationId).first()) is not None:
                db.session.delete(FQCustomsDuty_db)

            db.session.delete(factoryQuotation_db)
            db.session.commit()

            resp = message(True, "factoryQuotation have been deleted.")

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
    
    
    # update FactoryQuotationProcess
    @staticmethod
    def update_factoryQuotationProcess(factoryQuotationId, payload):
        try:
            # Get the process category from payload["id"]
            process_db = FQProcess.query.get(payload["id"])
            if process_db is None:
                return err_resp("FQProcess not found", "FQProcess_404", 404)
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == process_db.processOptionId).first()) is None:
                return err_resp("process not found", "process_404", 404)
            
            created_update_session_list = []
            deleted_session_list = []
            # 更新 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                updated_material_db_list = update_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list = update_packaging(payload)
                FQInjectionMoldingCost_db_list = update_injectionMolding(payload)
                created_update_session_list.extend([FQMaterialCostSetting_db, *updated_material_db_list, *created_updated_packaging_db_list, *FQInjectionMoldingCost_db_list])
            
            # 更新 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                updated_material_db_list = update_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list = update_packaging(payload)
                created_updated_FQOutPostProcessingCost_db_list, deleted_FQOutPostProcessingCost_db_list = create_update_delete_outPostProcessing(payload)
                created_update_session_list.extend([FQMaterialCostSetting_db, *updated_material_db_list, *created_updated_packaging_db_list, *created_updated_FQOutPostProcessingCost_db_list])
                deleted_session_list.extend(deleted_FQOutPostProcessingCost_db_list)
            
            # 更新 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                updated_material_db_list = update_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list = update_packaging(payload)
                created_updated_FQInPostProcessingCost_db_list, deleted_FQInPostProcessingCost_db_list = create_update_delete_inPostProcessing(payload)
                created_update_session_list.extend([FQMaterialCostSetting_db, *updated_material_db_list, *created_updated_packaging_db_list, *created_updated_FQInPostProcessingCost_db_list])
                deleted_session_list.extend(deleted_FQInPostProcessingCost_db_list)
           
            # 更新 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                updated_material_db_list = update_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list = update_packaging(payload)
                created_updated_FQOutPostProcessingCost_db_list, deleted_FQOutPostProcessingCost_db_list = create_update_delete_outPostProcessing(payload)
                created_update_session_list.extend([FQMaterialCostSetting_db, *updated_material_db_list, *created_updated_packaging_db_list, *created_updated_FQOutPostProcessingCost_db_list])
                deleted_session_list.extend(deleted_FQOutPostProcessingCost_db_list)
            
            # 更新 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                created_updated_FQInPostProcessingCost_db_list, deleted_FQInPostProcessingCost_db_list = create_update_delete_inPostProcessing(payload)
                created_update_session_list.extend(created_updated_FQInPostProcessingCost_db_list)
                deleted_session_list.extend(deleted_FQInPostProcessingCost_db_list)
            
            db.session.add_all(created_update_session_list)
            for deleted_session in deleted_session_list:
                db.session.delete(deleted_session)
            db.session.commit()

            # 更新 FactoryQuotation 的 subtotalCostWithoutOverhead
            update_subtotalCostWithoutOverhead(factoryQuotationId)

            resp = message(True, "factoryQuotation process have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
    

    @staticmethod
    def update_shippingCosts(factoryQuotationId, payload):
        try:
            created_update_session_list = []
            deleted_session_list = []
            created_updated_FQFreight_db_list, deleted_FQFreight_db_list = create_update_delete_freight(factoryQuotationId, payload)
            created_updated_FQCustomsDuty_db_list, deleted_FQCustomsDuty_db_list = create_update_delete_customsDuty(factoryQuotationId, payload)
            created_update_session_list.extend([*created_updated_FQFreight_db_list, *created_updated_FQCustomsDuty_db_list])
            deleted_session_list.extend([*deleted_FQFreight_db_list, *deleted_FQCustomsDuty_db_list])
            db.session.add_all(created_update_session_list)
            for deleted_session in deleted_session_list:
                db.session.delete(deleted_session)
            db.session.commit()

            resp = message(True, "factoryQuotation ShippingCost have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
