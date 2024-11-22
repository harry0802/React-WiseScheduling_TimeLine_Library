/**
 * @constant {Object} PROCESS_DATA_KEYS
 * @description 定義製程相關數據的存取鍵值,對應quotationData中processes陣列內的數據結構
 * @property {string} MATERIAL_SETTING - 材料成本設置
 * @property {string} MATERIAL_COSTS - 材料成本列表
 * @property {string} PACKAGING_COSTS - 包裝成本列表
 * @property {string} INJECTION_MOLDING_COSTS - 成型成本列表
 * @property {string} IN_POST_PROCESSING_COSTS - 廠內後製成本
 * @property {string} OUT_POST_PROCESSING_COSTS - 委外後製成本
 * @property {string} FREIGHTS - 運輸費用列表
 * @property {string} CUSTOMS_DUTIES - 關稅列表
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
 * @constant {Object} PROCESS_TYPES
 * @description 定義所有製程類型的常量
 * @property {string} IN_INJECTION - 廠內成型製程
 * @property {string} OUT_INJECTION - 委外成型製程
 * @property {string} IN_BACKEND - 廠內後製製程
 * @property {string} OUT_BACKEND - 委外後製製程
 * @property {string} IN_TESTING - 廠內出貨檢驗
 * @property {string} TRANSPORTATION - 運輸與關稅
 */
export const PROCESS_TYPES = {
  IN_INJECTION: "In-IJ(廠內成型)",
  OUT_INJECTION: "Out-IJ(委外成型)",
  IN_BACKEND: "In-BE(廠內後製程)",
  OUT_BACKEND: "Out-BE(委外後製程)",
  IN_TESTING: "In-TS(廠內出貨檢驗)",
  TRANSPORTATION: "TRANSPORTATION",
};

/**
 * @constant {Object} PROCESS_TITLES
 * @description 定義所有製程的顯示標題
 */
export const PROCESS_TITLES = {
  [PROCESS_TYPES.IN_INJECTION]: "廠內成型製程費用",
  [PROCESS_TYPES.OUT_INJECTION]: "委外成型製程費用",
  [PROCESS_TYPES.IN_BACKEND]: "廠內後製製程費用",
  [PROCESS_TYPES.OUT_BACKEND]: "委外後製製程費用",
  [PROCESS_TYPES.IN_TESTING]: "廠內出貨檢驗費用",
  [PROCESS_TYPES.TRANSPORTATION]: "運輸費用與關稅成本",
};

/**
 * @constant {Object} PROCESS_TABLE_CONFIG
 * @description 製程表格配置對象,定義了各種製程類型的表格結構
 * @property {Object} In-IJ - 廠內成型製程配置
 * @property {Object} Out-IJ - 委外成型製程配置
 * @property {Object} In-BE - 廠內後製製程配置
 * @property {Object} Out-BE - 委外後製製程配置
 * @property {Object} In-TS - 廠內出貨檢驗配置
 * @property {Object} TRANSPORTATION - 運輸與關稅配置
 *
 * @typedef {Object} ProcessSection
 * @property {string} sectionTitle - 區段標題
 * @property {Array<Object>} headers - 表頭配置
 * @property {string} dataKey - 數據鍵值
 * @property {boolean} showSubtotal - 是否顯示小計
 * @property {string} subtotalLabel - 小計標籤
 * @property {string} costKey - 成本鍵值
 */
export const PROCESS_TABLE_CONFIG = {
  [PROCESS_TYPES.IN_INJECTION]: {
    title: PROCESS_TITLES[PROCESS_TYPES.IN_INJECTION],
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "抽料費用", key: "extractionCost", unit: "元" },
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
          { label: "金額", key: "amount", unit: "元", span: 6 },
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
        sectionTitle: "加工成本與電費計算",
        headers: [
          { label: "生產機台", key: "machineName" },
          { label: "工時比例", key: "workHoursRatio", unit: "%" },
          { label: "不良率", key: "defectiveRate", unit: "%" },
          { label: "灌包工時(秒)", key: "packageTime", unit: "秒" },
          { label: "成型週期", key: "cycleTime", unit: "秒" },
          { label: "穴數", key: "moldCavity" },
          { label: "單價", key: "unitPrice", unit: "元" },
          { label: "金額", key: "amount", unit: "元" },
          { label: "小計", key: "subtotal", unit: "元" },
          // 每秒電費
          { label: "每秒電費", key: "electricityCostPerSecond", unit: "元" },
          { label: "電費", key: "electricityCost", unit: "元" },
        ],
        dataKey: PROCESS_DATA_KEYS.INJECTION_MOLDING_COSTS,
        showSubtotal: false,
        subtotalLabel: "成型成本小計",
        costKey: "moldingCost",
      },
    ],
    finalSubtotalLabel: "廠內成型總成本",
    showFinalSubtotal: true,
  },

  [PROCESS_TYPES.OUT_INJECTION]: {
    title: PROCESS_TITLES[PROCESS_TYPES.OUT_INJECTION],
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

  [PROCESS_TYPES.IN_BACKEND]: {
    title: PROCESS_TITLES[PROCESS_TYPES.IN_BACKEND],
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "抽料費用", key: "extractionCost", unit: "元" },
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

  [PROCESS_TYPES.OUT_BACKEND]: {
    title: PROCESS_TITLES[PROCESS_TYPES.OUT_BACKEND],
    summaryFields: [
      { label: "預估不良率", key: "estimatedDefectRate", unit: "%" },
      { label: "預估材料浮動", key: "estimatedMaterialFluctuation", unit: "%" },
      { label: "抽料費用", key: "extractionCost", unit: "元" },
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

  [PROCESS_TYPES.IN_TESTING]: {
    title: PROCESS_TITLES[PROCESS_TYPES.IN_TESTING],
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

  [PROCESS_TYPES.TRANSPORTATION]: {
    title: PROCESS_TITLES[PROCESS_TYPES.TRANSPORTATION],
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
        costKey: "transportCost",
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
        costKey: "freightCost",
      },
    ],
    finalSubtotalLabel: "運輸與關稅總成本",
    showFinalSubtotal: true,
  },
};
