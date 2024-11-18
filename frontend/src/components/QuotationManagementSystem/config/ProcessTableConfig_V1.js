/**
 * 定義製程相關數據的存取鍵值
 * 對應到 quotationData 中的 processes 陣列內的數據結構
 */
export const PROCESS_DATA_KEYS = {
  // 基本成本設置
  MATERIAL_SETTING: "SQMaterialCostSetting", // 材料成本設置
  MATERIAL_COSTS: "SQMaterialCosts", // 材料成本列表
  PACKAGING_COSTS: "SQPackagingCosts", // 包裝成本列表
  INJECTION_MOLDING_COSTS: "SQInjectionMoldingCosts", // 成型成本列表
  IN_POST_PROCESSING_COSTS: "SQInPostProcessingCosts", // 廠內後製成本
  OUT_POST_PROCESSING_COSTS: "SQOutPostProcessingCosts", // 委外後製成本
  FREIGHTS: "SQFreights", // 運輸費用列表
  CUSTOMS_DUTIES: "SQCustomsDuties", // 關稅列表
};

/**
 * 製程表格配置
 * key 需與 quotationData 中的 processCategory 完全對應
 */
export const PROCESS_TABLE_CONFIG = {
  // 廠內成型製程
  "In-IJ(廠內成型)": {
    title: "廠內成型製程費用",
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "取出費用", key: "extractionCost", unit: "元" },
      { label: "加工費用", key: "processingCost", unit: "元" },
    ],
    sections: [
      {
        sectionTitle: "材料成本",
        headers: [
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "重量", key: "weight", unit: "公克" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.MATERIAL_COSTS,
        showSubtotal: true,
        subtotalLabel: "材料成本小計",
        costKey: "materialCost",
      },
      {
        sectionTitle: "包裝材料費用",
        headers: [
          { label: "包材類型", key: "packagingType" },
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "數量", key: "quantity" },
          { label: "容量", key: "capacity", unit: "件/箱" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.PACKAGING_COSTS,
        showSubtotal: true,
        subtotalLabel: "包裝成本小計",
        costKey: "packagingCost",
      },
      {
        sectionTitle: "成型加工成本",
        headers: [
          { label: "工時比例", key: "workHoursRatio", unit: "%" },
          { label: "不良率", key: "defectiveRate", unit: "%" },
          { label: "週期時間", key: "cycleTime", unit: "秒" },
          { label: "包裝時間", key: "packageTime", unit: "秒" },
          { label: "模具穴數", key: "moldCavity" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
          { label: "小計", key: "subtotal", unit: "元" },
          { label: "電費", key: "electricityCost", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.INJECTION_MOLDING_COSTS,
        showSubtotal: true,
        subtotalLabel: "成型成本小計",
        costKey: "moldingCost",
      },
    ],
    finalSubtotalLabel: "廠內成型總成本",
    showFinalSubtotal: true,
  },

  // 委外成型製程
  "Out-IJ(委外成型)": {
    title: "委外成型製程費用",
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "取出費用", key: "extractionCost", unit: "元" },
      { label: "加工費用", key: "processingCost", unit: "元" },
    ],
    sections: [
      {
        sectionTitle: "材料成本",
        headers: [
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "重量", key: "weight", unit: "公克" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.MATERIAL_COSTS,
        showSubtotal: true,
        subtotalLabel: "材料成本小計",
        costKey: "materialCost",
      },
      {
        sectionTitle: "包裝材料費用",
        headers: [
          { label: "包材類型", key: "packagingType" },
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "數量", key: "quantity" },
          { label: "容量", key: "capacity", unit: "件/箱" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.PACKAGING_COSTS,
        showSubtotal: true,
        subtotalLabel: "包裝成本小計",
        costKey: "packagingCost",
      },
      {
        sectionTitle: "委外加工費用",
        headers: [
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.OUT_POST_PROCESSING_COSTS,
        showSubtotal: true,
        subtotalLabel: "委外加工小計",
        costKey: "processingCost",
      },
    ],
    finalSubtotalLabel: "委外成型總成本",
    showFinalSubtotal: true,
  },

  // 廠內後製製程
  "In-BE(廠內後製程)": {
    title: "廠內後製製程費用",
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "取出費用", key: "extractionCost", unit: "元" },
      { label: "加工費用", key: "processingCost", unit: "元" },
    ],
    sections: [
      {
        sectionTitle: "材料成本",
        headers: [
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "重量", key: "weight", unit: "公克" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.MATERIAL_COSTS,
        showSubtotal: true,
        subtotalLabel: "材料成本小計",
        costKey: "materialCost",
      },
      {
        sectionTitle: "包裝材料費用",
        headers: [
          { label: "包材類型", key: "packagingType" },
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "數量", key: "quantity" },
          { label: "容量", key: "capacity", unit: "件/箱" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.PACKAGING_COSTS,
        showSubtotal: true,
        subtotalLabel: "包裝成本小計",
        costKey: "packagingCost",
      },
      {
        sectionTitle: "廠內加工費用",
        headers: [
          { label: "工時", key: "workSecond", unit: "秒" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.IN_POST_PROCESSING_COSTS,
        showSubtotal: true,
        subtotalLabel: "廠內加工小計",
        costKey: "processingCost",
      },
    ],
    finalSubtotalLabel: "廠內後製總成本",
    showFinalSubtotal: true,
  },

  // 委外後製製程
  "Out-BE(委外後製程)": {
    title: "委外後製製程費用",
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "取出費用", key: "extractionCost", unit: "元" },
      { label: "加工費用", key: "processingCost", unit: "元" },
    ],
    sections: [
      {
        sectionTitle: "材料成本",
        headers: [
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "重量", key: "weight", unit: "公克" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.MATERIAL_COSTS,
        showSubtotal: true,
        subtotalLabel: "材料成本小計",
        costKey: "materialCost",
      },
      {
        sectionTitle: "包裝材料費用",
        headers: [
          { label: "包材類型", key: "packagingType" },
          { label: "物料編號", key: "materialSN" },
          { label: "物料名稱", key: "materialName" },
          { label: "單位", key: "unit" },
          { label: "數量", key: "quantity" },
          { label: "容量", key: "capacity", unit: "件/箱" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.PACKAGING_COSTS,
        showSubtotal: true,
        subtotalLabel: "包裝成本小計",
        costKey: "packagingCost",
      },
      {
        sectionTitle: "委外加工費用",
        headers: [
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.OUT_POST_PROCESSING_COSTS,
        showSubtotal: true,
        subtotalLabel: "委外加工小計",
        costKey: "processingCost",
      },
    ],
    finalSubtotalLabel: "委外後製總成本",
    showFinalSubtotal: true,
  },

  // 廠內出貨檢驗
  "In-TS(廠內出貨檢驗)": {
    title: "廠內出貨檢驗費用",
    summaryFields: [],
    sections: [
      {
        sectionTitle: "檢驗費用",
        headers: [
          { label: "工時", key: "workSecond", unit: "秒" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.IN_POST_PROCESSING_COSTS,
        showSubtotal: true,
        subtotalLabel: "檢驗費用小計",
        costKey: "inspectionCost",
      },
    ],
    finalSubtotalLabel: "檢驗總成本",
    showFinalSubtotal: true,
  },

  // 運輸費用與關稅
  TRANSPORTATION: {
    title: "運輸費用與關稅成本",
    summaryFields: [],
    sections: [
      {
        sectionTitle: "運輸費用",
        headers: [
          { label: "運送距離", key: "deliveryDistance", unit: "公里" },
          { label: "司機工時", key: "driverWorkHours", unit: "小時" },
          { label: "每公里油費", key: "fuelCostPerKM", unit: "元" },
          { label: "預估出貨量", key: "estimatedShipment", unit: "pcs" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.FREIGHTS,
        showSubtotal: true,
        subtotalLabel: "運輸費用小計",
        costKey: "transportationCost",
      },
      {
        sectionTitle: "關稅費用",
        headers: [
          { label: "費用類型", key: "feeType" },
          { label: "運費", key: "freight", unit: "元" },
          { label: "預估出貨量", key: "estimatedShipment", unit: "pcs" },
          { label: "金額", key: "amount", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.CUSTOMS_DUTIES,
        showSubtotal: true,
        subtotalLabel: "關稅費用小計",
        costKey: "customsDutyCost",
      },
    ],
    finalSubtotalLabel: "運輸與關稅總成本",
    showFinalSubtotal: true,
  },
};
