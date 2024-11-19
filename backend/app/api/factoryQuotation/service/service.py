from datetime import datetime
from sqlalchemy import literal
import sys
from app import db
from app.utils_log import message, err_resp, internal_err_resp
from app.models.process import Process
from app.models.product import Product
from app.models.processMaterial import ProcessMaterial
from app.models.material import Material
from app.models.materialOption import MaterialOption
from app.models.processOption import ProcessOption
from app.models.ly0000AO import LY0000AODetail
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
from .material_service import create_materialSetting, create_material, create_update_delete_material, update_materialSetting
from .packaging_service import create_packaging, create_update_delete_packaging
from .injectionMolding_service import create_injectionMolding, update_injectionMolding
from .inPostProcessing_service import create_inPostProcessing, update_inPostProcessing
from .outPostProcessing_service import create_outPostProcessing, update_outPostProcessing
from .shipping_service import update_freight, update_customsDuty
factoryQuotation_schema = FactoryQuotationSchema()


def generate_quotationSN():
    """Generate quotationSN
       Format: FYYYYMMDDXXX
    """
    try:
        today = datetime.now()
        year = today.strftime("%Y")
        month = today.strftime("%m")
        day = today.strftime("%d")
        # get the last quotationSN
        last_factoryQuotation = db.session.query(FactoryQuotation).order_by(FactoryQuotation.id.desc()).first()
        if last_factoryQuotation is None:
            return f"F{year}{month}{day}001"
        else:
            last_quotationSN = last_factoryQuotation.quotationSN
            last_quotationSN_date = last_quotationSN[1:9]
            last_quotationSN_num = last_quotationSN[9:]
            if last_quotationSN_date == f"{year}{month}{day}":
                num = int(last_quotationSN_num) + 1
                return f"F{year}{month}{day}{num:03}"
            else:
                return f"F{year}{month}{day}001"
    except Exception as error:
        raise error


def get_processes_by_productSN(productSN):
    """根據產品編號，到Process表中找出該產品所有製程

    Args:
        productSN (_type_): 產品編號

    Raises:
        ValueError: _description_
        error: _description_

    Returns:
        _type_: _description_
    """
    try:
        query = Process.query
        query = query.with_entities(
            Process.id, 
            Process.processOptionId, 
            ProcessOption.processCategory, 
            ProcessOption.processName,
            Product.productSN, 
            Product.productName,
            Material.materialOptionId,
            Material.materialSN, 
            Material.materialName, 
            Material.quantity,
            Material.unit,
            MaterialOption.materialType,
            literal(None).label("unitPrice")  # Default unitPrice to NULL
        )
        query = query.join(Product, Product.id == Process.productId)
        query = query.join(ProcessOption, ProcessOption.id == Process.processOptionId)
        query = query.join(ProcessMaterial, ProcessMaterial.processId == Process.id)
        query = query.join(Material, Material.id == ProcessMaterial.materialId)
        query = query.join(MaterialOption, MaterialOption.id == Material.materialOptionId)
        query = query.filter(Product.productSN == productSN)
        
        # Use _mapping to convert rows to dictionaries
        process_db_list = [dict(row._mapping) for row in query.all()]
        if not process_db_list:
            raise ValueError("Product not found", "Product_404")
        # Update unitPrice dynamically
        for process_db in process_db_list:
            ly0000AO_db = db.session.query(LY0000AODetail).filter(
                LY0000AODetail.SD_SKNO == process_db["materialSN"],
                LY0000AODetail.SD_NAME == process_db["materialName"]
            ).first()
            
            # Set `unitPrice` if found in LY0000AODetail
            if ly0000AO_db:
                process_db["unitPrice"] = ly0000AO_db.SD_PRICE
        return process_db_list
    
    except Exception as error:
        raise error


def convert_prosses_list_to_nested(process_db_list):
    """透過產品編號找出來的所有製程，轉換成以製程編號為 key 的 dictionary

    Args:
        process_db_list (_type_): 透過產品編號找出來的所有製程

    Returns:
        _type_: _description_
    """
    # Create a dictionary to group by process ID
    grouped_processes = {}
    
    for item in process_db_list:
        process_id = item['id']
        
        # Create material dict for current item
        material = {
            'materialOptionId': item['materialOptionId'],
            'materialSN': item['materialSN'],
            'materialName': item['materialName'],
            'quantity': item['quantity'],
            'unit': item['unit'],
            'materialType': item['materialType'],
            'unitPrice': item['unitPrice']
        }
        
        # If process ID doesn't exist in grouped_processes, create new process entry
        if process_id not in grouped_processes:
            grouped_processes[process_id] = {
                'id': item['id'],
                'processOptionId': item['processOptionId'],
                'processCategory': item['processCategory'],
                'processName': item['processName'],
                'productSN': item['productSN'],
                'productName': item['productName'],
                'materials': [],
                'packagings': []
            }
            
        # Add material to the process's materials list
        if item['materialType'] == '包材':
            grouped_processes[process_id]['packagings'].append(material)
        else:
            grouped_processes[process_id]['materials'].append(material)
    
    # Convert dictionary to list and sort by id
    result = list(grouped_processes.values())
    result.sort(key=lambda x: x['id'])
    # Output the result as JSON
    return result


def delete_all_processes(factoryQuotationId):
    """刪除該廠內報價單下的所有製程

    Args:
        factoryQuotationId (_type_): 廠內報價單ID
    """
    FQProcess_db_list = FQProcess.query.filter(FQProcess.factoryQuotationId == factoryQuotationId).all()
    for FQProcess_db in FQProcess_db_list:
        processOption_db = ProcessOption.query.filter_by(id = FQProcess_db.processOptionId).first()
        # Define deletions by process category
        deletion_map = {
            ProcessCategoryEnum.In_IJ.value: [
                FQMaterialCostSetting, FQMaterialCost, FQPackagingCost, FQInjectionMoldingCost
            ],
            ProcessCategoryEnum.Out_IJ.value: [
                FQMaterialCostSetting, FQMaterialCost, FQPackagingCost, FQOutPostProcessingCost
            ],
            ProcessCategoryEnum.In_BE.value: [
                FQMaterialCostSetting, FQMaterialCost, FQPackagingCost, FQInPostProcessingCost
            ],
            ProcessCategoryEnum.Out_BE.value: [
                FQMaterialCostSetting, FQMaterialCost, FQPackagingCost, FQOutPostProcessingCost
            ],
            ProcessCategoryEnum.In_TS.value: [
                FQInPostProcessingCost
            ]
        }
        # Get models to delete based on the process category
        models_to_delete = deletion_map.get(processOption_db.processCategory, [])
        # Perform deletions for related records
        for model in models_to_delete:
            related_records = model.query.filter_by(FQProcessId=FQProcess_db.id).all()
            for record in related_records:
                db.session.delete(record)
        # Delete the main FQProcess record
        db.session.delete(FQProcess_db)
    db.session.commit()
    

def convert_processes_to_payload_format(process_db_list):
    try:
        formatted_processes = convert_prosses_list_to_nested(process_db_list)
        payloads = []
        schema_map = {
            ProcessCategoryEnum.In_IJ.value: [
                "FQMaterialCostSetting", "FQMaterialCosts", "FQPackagingCosts", "FQInjectionMoldingCosts"
            ],
            ProcessCategoryEnum.Out_IJ.value: [
                "FQMaterialCostSetting", "FQMaterialCosts", "FQPackagingCosts", "FQOutPostProcessingCosts"
            ],
            ProcessCategoryEnum.In_BE.value: [
                "FQMaterialCostSetting", "FQMaterialCosts", "FQPackagingCosts", "FQInPostProcessingCosts"
            ],
            ProcessCategoryEnum.Out_BE.value: [
                "FQMaterialCostSetting", "FQMaterialCosts", "FQPackagingCosts", "FQOutPostProcessingCosts"
            ],
            ProcessCategoryEnum.In_TS.value: [
                "FQInPostProcessingCosts"
            ]
        }
        for process_db in formatted_processes:
            if process_db["processCategory"] not in schema_map:
                continue
            process = {
                "processOptionId": process_db["processOptionId"],
                "processCategory": process_db["processCategory"],
                'processName': process_db['processName'],
                'productSN': process_db['productSN'],
                'productName': process_db['productName'],
            }
            for schema in schema_map[process_db["processCategory"]]:
                if schema == "FQMaterialCostSetting":
                    process["FQMaterialCostSetting"] = {
                        "estimatedDefectRate": 0.05,
                        "estimatedMaterialFluctuation": 0,
                        "extractionCost": 0,
                        "processingCost": 0
                    }
                if schema == "FQMaterialCosts":
                    materials = []
                    for material in process_db["materials"]:
                        materials.append(
                            {
                                "materialOptionId": material["materialOptionId"],
                                "materialSN": material["materialSN"],
                                "materialName": material["materialName"],
                                "unit": material["unit"],
                                "weight": material["quantity"],
                                "unitPrice": material["unitPrice"],
                                "amount": None
                            }
                        )
                    process["FQMaterialCosts"] = materials
                if schema == "FQPackagingCosts":
                    packagings = []
                    for packaging in process_db["packagings"]:
                        packagings.append(
                            {
                                "packagingType": "包材",
                                "materialSN": packaging["materialSN"],
                                "materialName": packaging["materialName"],
                                "unit": packaging["unit"],
                                "quantity": packaging["quantity"],
                                "capacity": None,
                                "bagsPerKg": None,
                                "unitPrice": packaging["unitPrice"],
                                "amount": None
                            }
                        )
                    process["FQPackagingCosts"] = packagings
                if schema == "FQInjectionMoldingCosts":
                    process["FQInjectionMoldingCosts"] = []
                if schema == "FQInPostProcessingCosts":
                    process["FQInPostProcessingCosts"] = []
                if schema == "FQOutPostProcessingCosts":
                    process["FQOutPostProcessingCosts"] = []

            payloads.append(process)
        return payloads
    except Exception as error:
        raise error


def calculate_subtotalCostWithoutOverhead(factoryQuotationId):
    # Get all processes for the factoryQuotation
    processes = FQProcess.query.filter(FQProcess.factoryQuotationId == factoryQuotationId).all()
    subtotalCostWithoutOverhead = 0
    # Calculate all costs for each process
    cost_models = [
        FQMaterialCost,
        FQPackagingCost,
        FQInjectionMoldingCost,
        FQInPostProcessingCost,
        FQOutPostProcessingCost
    ]

    for process in processes:
        for model in cost_models:
            costs = model.query.filter(model.FQProcessId == process.id).all()
            subtotalCostWithoutOverhead += sum(cost.amount or 0 for cost in costs)

    return subtotalCostWithoutOverhead


def complete_factoryQuotation(db_obj, payload):
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


class FactoryQuotationService:
    @staticmethod
    def sync_processes(factoryQuotationId, productSN):
        try:
            # 先確認此次選擇的產品是否跟資料庫中的產品一樣
            factoryQuotation_db = FactoryQuotation.query.filter(FactoryQuotation.id == factoryQuotationId).first()
            if factoryQuotation_db is None:
                raise err_resp("factoryQuotation not found", "factoryQuotation_404", 404)
            
            # 如果選擇的產品與資料庫中的產品一樣，則不重複新增，不做任何動作
            if factoryQuotation_db.productSN == productSN:
                return message(True, "This productSN is already synchronised."), 200
            
            # 如果選擇的產品與資料庫中的產品不一樣，則先刪除所有製程，再新增。
            # 刪除所有製程
            delete_all_processes(factoryQuotationId)

            # 透過產品編號，從BOM表取得製程，並轉換成payload格式
            process_db_list = get_processes_by_productSN(productSN)
            payloads = convert_processes_to_payload_format(process_db_list)

            # 更新產品編號和產品名稱到報價單
            factoryQuotation_db.productSN = productSN
            factoryQuotation_db.productName = payloads[0]['productName']
            db.session.add(factoryQuotation_db)
            
            # 新增全部製程以及費用
            process_dump_list = []
            for payload in payloads:
                # 新增製程
                process_db = FQProcess()
                process_db.factoryQuotationId = factoryQuotationId
                process_db.processOptionId = payload["processOptionId"]
                db.session.add(process_db)
                db.session.flush()
                # Get the new id of FQProcess
                newProcessId = process_db.id
                
                # Map process categories to cost creation functions
                process_category_map = {
                    # 新增 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
                    ProcessCategoryEnum.In_IJ.value: [create_materialSetting, create_material,create_packaging, create_injectionMolding,],
                    # 新增 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                    ProcessCategoryEnum.Out_IJ.value: [create_materialSetting, create_material, create_packaging, create_outPostProcessing,],
                    # 新增 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
                    ProcessCategoryEnum.In_BE.value: [create_materialSetting, create_material, create_packaging, create_inPostProcessing,],
                    # 新增 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
                    ProcessCategoryEnum.Out_BE.value: [create_materialSetting, create_material, create_packaging, create_outPostProcessing,],
                    # 新增 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
                    ProcessCategoryEnum.In_TS.value: [create_inPostProcessing,],
                }

                # Create costs based on process category
                materialSetting_db = None
                material_db_list = []
                packaging_db_list = []
                injectionMolding_db_list = []
                inPostProcessing_db_list = []
                outPostProcessing_db_list = []
                for cost_function in process_category_map.get(payload["processCategory"], []):
                    # 原物料費用參數設定
                    if cost_function == create_materialSetting:
                        materialSetting_db = cost_function(newProcessId, payload)
                        if materialSetting_db:
                            db.session.add(materialSetting_db)
                            db.session.flush()
                            materialSetting_dump = FQMaterialCostSettingSchema().dump(materialSetting_db)
                            process_db.FQMaterialCostSetting = materialSetting_dump
                    # 原物料費用
                    elif cost_function == create_material:
                        estimatedMaterialFluctuation = materialSetting_db.estimatedMaterialFluctuation if materialSetting_db else None
                        material_db_list = cost_function(newProcessId, payload, estimatedMaterialFluctuation)
                        if material_db_list:
                            db.session.add_all(material_db_list)
                            db.session.flush()
                            material_list_dump = FQMaterialCostSchema().dump(material_db_list, many=True)
                            process_db.FQMaterialCosts = material_list_dump
                    # 包材費用
                    elif cost_function == create_packaging:
                        packaging_db_list = cost_function(newProcessId, payload)
                        if packaging_db_list:
                            db.session.add_all(packaging_db_list)
                            db.session.flush()
                            packaging_list_dump = FQPackagingCostSchema().dump(packaging_db_list, many=True)
                            process_db.FQPackagingCosts = packaging_list_dump
                    # 成型加工費用
                    elif cost_function == create_injectionMolding:
                        injectionMolding_db_list = cost_function(newProcessId, payload)
                        if injectionMolding_db_list:
                            db.session.add_all(injectionMolding_db_list)
                            db.session.flush()
                            injectionMolding_list_dump = FQInjectionMoldingCostSchema().dump(injectionMolding_db_list, many=True)
                            process_db.FQInjectionMoldingCosts = injectionMolding_list_dump
                    # 廠內後製程與檢驗費用
                    elif cost_function == create_inPostProcessing:
                        inPostProcessing_db_list = cost_function(newProcessId, payload)
                        if inPostProcessing_db_list:
                            db.session.add_all(inPostProcessing_db_list)
                            db.session.flush()
                            inPostProcessing_list_dump = FQInPostProcessingCostSchema().dump(inPostProcessing_db_list, many=True)
                            process_db.FQInPostProcessingCosts = inPostProcessing_list_dump
                    # 委外後製程與檢驗費用
                    elif cost_function == create_outPostProcessing:
                        outPostProcessing_db_list = cost_function(newProcessId, payload)
                        if outPostProcessing_db_list:
                            db.session.add_all(outPostProcessing_db_list)
                            db.session.flush()
                            outPostProcessing_list_dump = FQOutPostProcessingCostSchema().dump(outPostProcessing_db_list, many=True)
                            process_db.FQOutPostProcessingCosts = outPostProcessing_list_dump
                
                process_dump = FQProcessSchema().dump(process_db)
                process_dump_list.append(process_dump)
            
            db.session.commit()
        
            factoryQuotation_db.processes = process_dump_list
            factoryQuotation_dto = factoryQuotation_schema.dump(factoryQuotation_db)
            resp = message(True, "BOM data have been synchronised to factoryQuotation successfully..")
            resp["data"] = factoryQuotation_dto
            return resp, 200
        
        except ValueError as error:
            msg = error.args[0] if len(error.args) > 0 else ""
            err_reason = error.args[1] if len(error.args) > 1 else ""
            return err_resp(msg, err_reason, 404)
        except Exception as error:
            db.session.rollback()
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
                    injectionMolding_db = db.session.execute(
                        db.select(FQInjectionMoldingCost)
                        .filter(FQInjectionMoldingCost.FQProcessId == process_db.id)
                    ).scalars().all()
                    if injectionMolding_db:
                        injectionMolding_dump = FQInjectionMoldingCostSchema().dump(injectionMolding_db, many=True)
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
            # 如果 payload裡面有actualQuotation，表示要更新利潤管理，要計算 subtotalCostWithoutOverhead，並更新到payload
            if payload.get("actualQuotation") is not None:
                subtotalCostWithoutOverhead = calculate_subtotalCostWithoutOverhead(factoryQuotation_db.id)
                payload["subtotalCostWithoutOverhead"] = subtotalCostWithoutOverhead
            factoryQuotation_db = complete_factoryQuotation(factoryQuotation_db, payload)
            db.session.add(factoryQuotation_db)
            db.session.commit()

            factoryQuotation_dump = factoryQuotation_schema.dump(factoryQuotation_db)
            resp = message(True, "factoryQuotation have been updated.")
            resp["data"] = factoryQuotation_dump

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # delete FactoryQuotation
    @staticmethod
    def delete_factoryQuotation(factoryQuotationId):
        try:
            if(factoryQuotation_db := FactoryQuotation.query.get(factoryQuotationId)) is None:
                return err_resp("factoryQuotation not found", "factoryQuotation_404", 404)
            # check if factoryQuotation is empty, except quotationSN and createDate
            if factoryQuotation_db.customerName is not None or factoryQuotation_db.productName is not None or factoryQuotation_db.overheadRnd is not None or factoryQuotation_db.profit is not None or factoryQuotation_db.risk is not None or factoryQuotation_db.annualDiscount is not None or factoryQuotation_db.rebate is not None or factoryQuotation_db.actualQuotation is not None:
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
    def update_factoryQuotationProcess(payload):
        try:
            # Get the process category
            if (processOption_db := ProcessOption.query.filter(ProcessOption.id == payload["processOptionId"]).first()) is None:
                return err_resp("process not found", "process_404", 404)
            
            create_update_session_list = []
            delete_session_list = []
            # 更新 In-IJ(廠內成型) 製程類別的原物料費用、包材費用、成型加工費用、成型加工電費
            if processOption_db.processCategory == ProcessCategoryEnum.In_IJ.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                FQInjectionMoldingCost_db_list = update_injectionMolding(payload)
                create_update_session_list.extend([FQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *FQInjectionMoldingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            
            # 更新 Out-IJ(委外成型) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_IJ.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                FQOutPostProcessingCost_db_list = update_outPostProcessing(payload)
                create_update_session_list.extend([FQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *FQOutPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            
            # 更新 In-BE(廠內後製程) 製程類別的原物料費用、包材費用、廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_BE.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                FQInPostProcessingCost_db_list = update_inPostProcessing(payload)
                create_update_session_list.extend([FQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *FQInPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
           
            # 更新 Out-BE(委外後製程) 製程類別的原物料費用、包材費用、委外後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.Out_BE.value:
                FQMaterialCostSetting_db = update_materialSetting(payload)
                created_updated_material_db_list, deleted_material_db_list = create_update_delete_material(payload, FQMaterialCostSetting_db.estimatedMaterialFluctuation)
                created_updated_packaging_db_list, deleted_packaging_db_list = create_update_delete_packaging(payload)
                FQOutPostProcessingCost_db_list = update_outPostProcessing(payload)
                create_update_session_list.extend([FQMaterialCostSetting_db, *created_updated_material_db_list, *created_updated_packaging_db_list, *FQOutPostProcessingCost_db_list])
                delete_session_list.extend([*deleted_material_db_list, *deleted_packaging_db_list])
            
            # 更新 In-TS(廠內出貨檢驗) 製程類別的廠內後製程與檢驗費用
            elif processOption_db.processCategory == ProcessCategoryEnum.In_TS.value:
                FQInPostProcessingCost_db_list = update_inPostProcessing(payload)
                create_update_session_list.extend(FQInPostProcessingCost_db_list)
            
            db.session.add_all(create_update_session_list)
            for delete_session in delete_session_list:
                db.session.delete(delete_session)
            db.session.commit()

            resp = message(True, "factoryQuotation process have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
    

    @staticmethod
    def update_shippingCosts(payload):
        try:
            add_to_session_list = []
            FQFreight_db_list = update_freight(payload)
            FQCustomsDuty_db_list = update_customsDuty(payload)
            add_to_session_list.extend([*FQFreight_db_list, *FQCustomsDuty_db_list])
            db.session.add_all(add_to_session_list)
            db.session.commit()

            resp = message(True, "factoryQuotation ShippingCost have been updated..")
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            db.session.rollback()
            raise error
