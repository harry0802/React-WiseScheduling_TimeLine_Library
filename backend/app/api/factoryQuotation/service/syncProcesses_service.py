from sqlalchemy import literal
import sys
from app import db
from app.utils_log import message, err_resp
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
from app.api.option.optionEnum import ProcessCategoryEnum
from ..schemas import FactoryQuotationSchema, FQProcessSchema, FQMaterialCostSettingSchema, FQMaterialCostSchema, FQPackagingCostSchema, FQInjectionMoldingCostSchema, FQInPostProcessingCostSchema, FQOutPostProcessingCostSchema, FQFreightSchema, FQCustomsDutySchema
from .material_service import create_materialSetting, create_material
from .packaging_service import create_packaging
from .injectionMolding_service import create_injectionMolding
from .inPostProcessing_service import create_inPostProcessing
from .outPostProcessing_service import create_outPostProcessing
factoryQuotation_schema = FactoryQuotationSchema()


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
        query = query.join(ProcessMaterial, ProcessMaterial.processId == Process.id, isouter=True)
        query = query.join(Material, Material.id == ProcessMaterial.materialId, isouter=True)
        query = query.join(MaterialOption, MaterialOption.id == Material.materialOptionId, isouter=True)
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
            ).order_by(LY0000AODetail.SD_DATE.desc()).first()
            
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
        elif item['materialSN']: # Skip materials without SN
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
                    process["FQInjectionMoldingCosts"] = [{"machineId": None}]
                if schema == "FQInPostProcessingCosts":
                    process["FQInPostProcessingCosts"] = [{"FQProcessId": None}]
                if schema == "FQOutPostProcessingCosts":
                    process["FQOutPostProcessingCosts"] = [{"FQProcessId": None}]

            payloads.append(process)
        return payloads
    except Exception as error:
        raise error



def sync_processes(factoryQuotationId, productSN):
    """根據選擇的產品，將其BOM表製程同步到廠內報價單中

    Args:
        factoryQuotationId (_type_): _description_
        productSN (_type_): _description_

    Raises:
        ValueError: _description_
        error: _description_
    """
    try:
        # 如果選擇的產品與資料庫中的產品不一樣，則先刪除所有製程，再新增。
        # 刪除所有製程
        delete_all_processes(factoryQuotationId)

        # 透過產品編號，從BOM表取得製程，並轉換成payload格式
        process_db_list = get_processes_by_productSN(productSN)
        payloads = convert_processes_to_payload_format(process_db_list)
        
        # 新增全部製程以及費用
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
                # 原物料費用
                elif cost_function == create_material:
                    estimatedMaterialFluctuation = materialSetting_db.estimatedMaterialFluctuation if materialSetting_db else None
                    material_db_list = cost_function(newProcessId, payload, estimatedMaterialFluctuation)
                    if material_db_list:
                        db.session.add_all(material_db_list)
                # 包材費用
                elif cost_function == create_packaging:
                    packaging_db_list = cost_function(newProcessId, payload)
                    if packaging_db_list:
                        db.session.add_all(packaging_db_list)
                # 成型加工費用
                elif cost_function == create_injectionMolding:
                    injectionMolding_db_list = cost_function(newProcessId, payload)
                    if injectionMolding_db_list:
                        db.session.add_all(injectionMolding_db_list)
                # 廠內後製程與檢驗費用
                elif cost_function == create_inPostProcessing:
                    inPostProcessing_db_list = cost_function(newProcessId, payload)
                    if inPostProcessing_db_list:
                        db.session.add_all(inPostProcessing_db_list)
                # 委外後製程與檢驗費用
                elif cost_function == create_outPostProcessing:
                    outPostProcessing_db_list = cost_function(newProcessId, payload)
                    if outPostProcessing_db_list:
                        db.session.add_all(outPostProcessing_db_list)
            
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        raise error