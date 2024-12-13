def sync_processes(factoryQuotationId, productSN):
    try:
        # 先確認此次選擇的產品是否跟資料庫中的產品一樣
        factoryQuotation_db = FactoryQuotation.query.filter(FactoryQuotation.id == factoryQuotationId).first()
        if factoryQuotation_db is None:
            raise ValueError("factoryQuotation not found", "factoryQuotation_404")
        
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

        # 更新 FactoryQuotation 的 subtotalCostWithoutOverhead
        update_subtotalCostWithoutOverhead(factoryQuotationId)
    
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