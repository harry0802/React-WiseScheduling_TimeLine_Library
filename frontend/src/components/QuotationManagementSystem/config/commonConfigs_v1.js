/**
 * @file commonConfigs_v1.js
 * @description 報價系統通用配置與字段定義
 * @version 1.0.0
 * @lastModified 2024-03-21
 */

//! =============== 1. 設定與常量 ===============
const API_BASE_URL = "http://localhost:5000/api";

//* API 端點配置
const API_ENDPOINTS = {
  MATERIAL_UNIT: `${API_BASE_URL}/option/materialUnit`,
  PACKAGING_UNIT: `${API_BASE_URL}/option/packagingUnit`,
  MACHINE_LIST: `${API_BASE_URL}/machine/list`,
  MACHINE_DETAIL: `${API_BASE_URL}/machine`,
  MATERIAL_PACKAGINGS: `${API_BASE_URL}/material/packagings`,
  MATERIAL_MATERIALS: `${API_BASE_URL}/material/materials`,
  MATERIAL_MATERIALUNITPRICE: `${API_BASE_URL}/material/materialUnitPrice`,
  MATERIAL_OPTION: `${API_BASE_URL}/materialOption`,
};

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} OptionItem
 * @property {string|number} id - 選項ID
 * @property {string} value - 選項值
 * @property {string} label - 選項標籤
 * @property {string} [productionArea] - 生產區域（可選）
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} status - API 響應狀態
 * @property {Array} data - 響應數據
 * @property {string} message - 響應消息
 */

//! =============== 3. 核心功能 ===============
//* ========= 服務層 Service Layer =========
export const optionsService = {
  /**
   * @function getCommonUnits
   * @description 獲取通用單位選項
   * @returns {Promise<OptionItem[]>} 單位選項列表
   */

  getCommonUnits: async () => {
    const response = await fetch(API_ENDPOINTS.MATERIAL_UNIT);
    const data = await response.json();
    return data?.data?.map((item) => ({
      id: item.id,
      value: item.name,
      label: `${item.name} (${item.schema})`,
    }));
  },

  /**
   * @function getPackagingTypes
   * @description 獲取包裝類型選項
   * @returns {Promise<OptionItem[]>} 包裝類型選項列表
   */
  getPackagingTypes: async () => {
    const response = await fetch(API_ENDPOINTS.PACKAGING_UNIT);
    const data = await response.json();
    return data?.data?.map((item) => ({
      id: item.id,
      value: item.name,
      label: `${item.name} (${item.schema})`,
    }));
  },

  /**
   * @function getFreightTypes
   * @description 獲取貨運類型選項
   * @returns {Promise<OptionItem[]>} 貨運類型選項列表
   * @throws {Error} 當獲取失敗時拋出錯誤
   */
  getFreightTypes: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.MACHINE_LIST);
      const { data } = await response.json();
      const areaMap = new Map();
      data?.forEach((machine) => {
        if (!areaMap.has(machine.productionArea)) {
          areaMap.set(machine.productionArea, {
            id: machine.id,
            value: machine.id,
            label: machine.productionArea,
          });
        }
      });

      return Array.from(areaMap.values());
    } catch (error) {
      console.error("獲取產線區域失敗:", error);
      throw error;
    }
  },

  /**
   * @function getMachineAreas
   * @description 獲取指定區域的機台列表
   * @param {string} areaFilter - 區域過濾條件
   * @returns {Promise<OptionItem[]>} 機台選項列表
   * @throws {Error} 當獲取失敗時拋出錯誤
   */
  getMachineAreas: async (areaFilter) => {
    try {
      const [detailResponse, listResponse] = await Promise.all([
        fetch(`${API_ENDPOINTS.MACHINE_DETAIL}/?id=${areaFilter}`),
        fetch(API_ENDPOINTS.MACHINE_LIST),
      ]);

      const [detailResult, listResult] = await Promise.all([
        detailResponse.json(),
        listResponse.json(),
      ]);
      if (!detailResult.status || !detailResult.data?.[0]) {
        throw new Error(detailResult.message || "獲取機台資訊失敗");
      }

      if (!listResult.status) {
        throw new Error(listResult.message || "獲取機台列表失敗");
      }

      const targetArea = detailResult.data[0].productionArea;

      return listResult.data
        .filter((machine) => machine.productionArea === targetArea)
        .map(({ id, machineSN, productionArea }) => ({
          id,
          value: machineSN,
          label: machineSN,
          productionArea,
        }));
    } catch (error) {
      console.error("取得機台資料失敗:", error);
      throw error;
    }
  },

  /**
   * @function getMaterialOptions
   * @description 獲取物料選項
   * @returns {Promise<OptionItem[]>} 物料選項列表
   */
  getMaterialOptions: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.MATERIAL_OPTION);
      const data = await response.json();
      return data?.data?.map((item) => ({
        id: item.id,
        value: item.id,
        label: item.materialType,
      }));
    } catch (error) {
      console.error("獲取物料選項失敗:", error);
      throw error;
    }
  },
};

//* ========= 工廠函數 Factory Functions =========
const createMaterialScope = () => {
  // 存放資料狀態
  let materials = [];
  let materialOptions = [];
  let currentMaterial = null;

  return {
    // 1. 獲取物料選項
    async getMaterials() {
      if (!materials.length) {
        const response = await fetch(API_ENDPOINTS.MATERIAL_MATERIALS);
        const result = await response.json();
        materials = result.data;
        materialOptions = materials.map((item) => ({
          value: item.materialName,
          label: item.materialName,
          materialSN: item.materialSN,
          unitPrice: item.unitPrice,
          materialOptionId: item.materialOptionId,
        }));
      }
      return materialOptions;
    },

    // 2. 根據物料名稱獲取相關資料
    async setSelectedMaterial(materialName) {
      if (!materials.length || !materialName) return null;

      currentMaterial = materials.find(
        (m) => m.materialName === materialName.label
      );

      if (!currentMaterial) return null;
      // 獲取物料單價
      const unitPrice = await this.getMaterialPrice(currentMaterial);
      return {
        materialSN: currentMaterial.materialSN,
        unit: currentMaterial.unit,
        unitPrice: unitPrice,
        materialOptionId: currentMaterial.materialOptionId,
      };
    },

    // 3. 獲取物料單價
    async getMaterialPrice(material) {
      if (!material) return null;
      try {
        const response = await fetch(
          `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${material.label}&materialSN=${material.materialSN}`
        );
        const result = await response.json();
        return result.status ? result.data : null;
      } catch (error) {
        console.error("取得單價失敗:", error);
        return null;
      }
    },
  };
};

const createPackagingScope = () => {
  let packagings = [];
  let packagingOptions = [];
  let currentPackaging = null;

  return {
    // 1. 獲取包材選項
    async getPackagings() {
      if (!packagings.length) {
        const response = await fetch(API_ENDPOINTS.MATERIAL_PACKAGINGS);
        const result = await response.json();
        packagings = result.data;
        packagingOptions = packagings.map((item) => ({
          value: item.materialName,
          label: item.materialName,
          materialSN: item.materialSN,
          unitPrice: item.unitPrice,
        }));
      }
      return packagingOptions;
    },

    // 2. 設置選中的包材
    async setSelectedPackaging(packagingName) {
      if (!packagings.length || !packagingName) return null;
      currentPackaging = packagings.find(
        (p) => p.materialName === packagingName.label
      );

      if (!currentPackaging) return null;
      // 獲取包材單價
      const unitPrice = await this.getPackagingPrice(currentPackaging);

      return {
        packagingSN: currentPackaging.materialSN,
        unit: currentPackaging.unit,
        unitPrice: unitPrice,
      };
    },

    // 3. 獲取包材單價
    async getPackagingPrice(packaging) {
      if (!packaging) return null;
      try {
        const response = await fetch(
          `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${packaging.label}&materialSN=${packaging.materialSN}`
        );
        const result = await response.json();
        return result.status ? result.data : null;
      } catch (error) {
        console.error("取得包材單價失敗:", error);
        return null;
      }
    },
  };
};

//! =============== 4. 工具函數 ===============
const createInputProps = (unit, label) => ({
  InputProps: { endAdornment: unit },
  placeholder: `請輸入${label || (unit === "元" ? "金額" : unit)}`,
});

const createRequiredRule = (label) => ({ required: `${label}為必填` });

export const createField = (
  name,
  label,
  type,
  props = {},
  rules = {},
  options = null,
  span,
  getOptions,
  hidden = false // 新增參數
) => ({
  name,
  label,

  type,
  ...props,
  rules: {
    ...rules,
    ...(type === "number" && {
      setValueAs: (value) => {
        if (value === "" || value === null) return null;
        return Number(value);
      },
    }),
  },
  ...(span && { span }),
  // 改為直接傳入 getOptions 函數，而不呼叫
  ...(getOptions ? { getOptions } : {}),
  ...(options ? { options } : {}),
  hidden,
});

//! =============== 5. 字段定義 ===============
//* 基礎成本設置字段
const materialCostSettingFields = {
  estimatedDefectRate: createField(
    "estimatedDefectRate",
    "預估不良率",
    "number",
    createInputProps("%", "預不良率"),
    createRequiredRule("預估不良率")
  ),
  estimatedMaterialFluctuation: createField(
    "estimatedMaterialFluctuation",
    "預估材料浮動",
    "number",
    createInputProps("%", "預估材料浮動"),
    createRequiredRule("預估材料浮動")
  ),
  extractionCost: createField(
    "extractionCost",
    "抽料費用",
    "number",
    createInputProps("元", "抽料費用"),
    createRequiredRule("抽料費用")
  ),
  processingCost: createField(
    "processingCost",
    "加工費用",
    "number",
    createInputProps("元", "加工費用"),
    createRequiredRule("加工費用")
  ),
};

//* 材料成本字段
const materialScope = createMaterialScope();
const materialCostFields = {
  materialName: {
    ...createField(
      "materialName",
      "物料名稱",
      "autocomplete",
      {
        placeholder: "請選擇物料名稱",
      },
      createRequiredRule("物料名稱")
    ),
    getOptions: materialScope.getMaterials,
    getDependentValues: async (materialName) => {
      if (!materialName) return null;
      const material = await materialScope.setSelectedMaterial(materialName);
      if (material) {
        return {
          materialName: materialName.label,
          materialSN: material.materialSN,
          unitPrice: material.unitPrice,
          materialOptionId: material.materialOptionId,
        };
      }
      return null;
    },
  },
  materialSN: {
    ...createField(
      "materialSN",
      "物料編號",
      "input",
      {
        placeholder: "物料編號將自動填入",
        readOnly: true,
      },
      createRequiredRule("物料編號")
    ),
  },
  materialOptionId: createField(
    "materialOptionId",
    "原物料種類",
    "select",
    { placeholder: "請選擇原物料種類" },
    createRequiredRule("原物料種類"),
    null,
    3,
    optionsService.getMaterialOptions
  ),
  unit: createField(
    "unit",
    "單位",
    "select",
    {
      placeholder: "請選擇單位",
      dependsOn: "materialName",
    },
    createRequiredRule("單位"),
    null,
    3,
    optionsService.getCommonUnits
  ),
  weight: createField(
    "weight",
    "重量",
    "number",
    createInputProps("公克", "重量"),
    createRequiredRule("重量")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    {
      ...createInputProps("元", "單價"),
      dependsOn: "materialName",
      readOnly: true,
    },
    createRequiredRule("單價")
  ),
};

//* 包裝成本字段
const packagingScope = createPackagingScope();
const packagingCostFields = {
  materialName: {
    ...createField(
      "materialName",
      "包材名稱",
      "autocomplete",
      {
        placeholder: "請選擇包材名稱",
      },
      createRequiredRule("包材名稱")
    ),
    getOptions: packagingScope.getPackagings,
    getDependentValues: async (packagingName) => {
      if (!packagingName) return null;
      const packaging = await packagingScope.setSelectedPackaging(
        packagingName
      );
      if (packaging) {
        return {
          materialName: packagingName.label,
          materialSN: packaging.packagingSN || "",
          unitPrice: packaging.unitPrice,
          packagingType: "包材",
        };
      }
      return null;
    },
  },
  materialSN: {
    ...createField(
      "materialSN",
      "包材編號",
      "input",
      {
        placeholder: "包材編號將自動填入",
        readOnly: true,
        dependsOn: "materialName",
      },
      createRequiredRule("包材編號")
    ),
  },
  packagingType: createField(
    "packagingType",
    "包材類型",
    "input",
    {
      placeholder: "請選擇包材類型",
      readOnly: true,
    },
    {
      ...createRequiredRule("包材類型"),
    },
    null,
    3,
    null
  ),
  unit: createField(
    "unit",
    "單位",
    "select",
    {
      placeholder: "請選擇單位",
      readOnly: true,
    },
    createRequiredRule("單位"),
    null,
    3,
    optionsService.getPackagingTypes
  ),
  quantity: createField(
    "quantity",
    "數量",
    "number",
    createInputProps("個", "數量"),
    createRequiredRule("數量")
  ),
  capacity: createField(
    "capacity",
    "容量",
    "number",
    createInputProps("件/箱", "容量"),
    createRequiredRule("容量")
  ),
  bagsPerKg: createField(
    "bagsPerKg",
    "每公斤袋數",
    "number",
    createInputProps("袋/公斤", "每公斤袋數")
  ),
  unitPrice: {
    ...createField(
      "unitPrice",
      "單價",
      "number",
      {
        ...createInputProps("元", "單價"),
        dependsOn: "materialName",
        readOnly: true,
      },
      createRequiredRule("單價")
    ),
  },
  amount: createField(
    "amount",
    "金額",
    "number",
    {
      ...createInputProps("元", "金額"),
      readOnly: true,
      dependsOn: ["quantity", "unitPrice"],
    },
    createRequiredRule("金額")
  ),
};

//* 其他成本字段
const injectionMoldingCostFields = {
  workHoursRatio: createField(
    "workHoursRatio",
    "工時比例",
    "number",
    createInputProps("%", "工時比例"),
    createRequiredRule("工時比例")
  ),
  defectiveRate: createField(
    "defectiveRate",
    "不良率",
    "number",
    createInputProps("%", "不良率"),
    createRequiredRule("不良率")
  ),
  cycleTime: createField(
    "cycleTime",
    "週期時間",
    "number",
    createInputProps("秒", "週期時間"),
    createRequiredRule("週期時間")
  ),
  packageTime: createField(
    "packageTime",
    "包裝時間",
    "number",
    createInputProps("秒", "包裝時間"),
    createRequiredRule("包裝時間")
  ),
  moldCavity: createField(
    "moldCavity",
    "模具穴數",
    "number",
    { placeholder: "請輸入模具穴數" },
    createRequiredRule("模具穴數")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
  subtotal: createField(
    "subtotal",
    "小計",
    "number",
    createInputProps("元", "小計"),
    createRequiredRule("小計")
  ),
  electricityCost: createField(
    "electricityCost",
    "電費",
    "number",
    createInputProps("元", "電費"),
    createRequiredRule("電費")
  ),
};

const freightFields = {
  deliveryDistance: createField(
    "deliveryDistance",
    "運送距離",
    "number",
    createInputProps("公里", "運送距離"),
    createRequiredRule("運送距離")
  ),
  driverWorkHours: createField(
    "driverWorkHours",
    "司機工時",
    "number",
    createInputProps("小時", "司機工時"),
    createRequiredRule("司機工時")
  ),
  fuelCostPerKM: createField(
    "fuelCostPerKM",
    "每公里油費",
    "number",
    createInputProps("元/公里", "每公里油費"),
    createRequiredRule("每公里油費")
  ),
  estimatedShipment: createField(
    "estimatedShipment",
    "預估出貨量",
    "number",
    { placeholder: "請輸入預估出貨量" },
    createRequiredRule("預估出貨量")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

const customsDutyFields = {
  feeType: createField(
    "feeType",
    "費用類型",
    "select",
    { placeholder: "請選擇費用類型" },
    createRequiredRule("費用類型"),
    [
      { value: "運費", label: "運費" },
      { value: "關稅", label: "關稅" },
      { value: "其他", label: "其他" },
    ]
  ),
  freight: createField(
    "freight",
    "運費",
    "number",
    createInputProps("元", "運費"),
    createRequiredRule("運費")
  ),
  estimatedShipment: createField(
    "estimatedShipment",
    "預估出貨量",
    "number",
    { placeholder: "請輸入預估出貨量" },
    createRequiredRule("預估出貨量")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

const outsourcedProcessingFields = {
  unitPrice: {
    ...createField(
      "unitPrice",
      "單價",
      "number",
      createInputProps("元", "單價"),
      createRequiredRule("單價")
    ),
  },
  amount: {
    ...createField(
      "amount",
      "金額",
      "number",
      createInputProps("元", "金額"),
      createRequiredRule("金額")
    ),
  },
};

const internalProcessingFields = {
  workSecond: createField(
    "workSecond",
    "工時",
    "number",
    createInputProps("秒", "工時"),
    createRequiredRule("工時")
  ),
  unitPrice: createField(
    "unitPrice",
    "單價",
    "number",
    createInputProps("元", "單價"),
    createRequiredRule("單價")
  ),
  amount: createField(
    "amount",
    "金額",
    "number",
    createInputProps("元", "金額"),
    createRequiredRule("金額")
  ),
};

//! =============== 6. 導出配置 ===============
export const commonFields = {
  ...materialCostSettingFields,
  ...materialCostFields,
  ...packagingCostFields,
  ...injectionMoldingCostFields,
  ...freightFields,
  ...customsDutyFields,
  ...outsourcedProcessingFields,
  ...internalProcessingFields,
};

export const commonSections = {
  materialCostSetting: {
    title: "材料成本設置",
    fields: Object.values(materialCostSettingFields).map((field) => ({
      ...field,
      span: 12,
    })),
  },
  materialCosts: {
    title: "材料成本",
    fields: Object.values(materialCostFields).map((field) => ({
      ...field,
      span: field.span || 3,
    })),
  },
  packagingCosts: {
    title: "包裝成本",
    fields: Object.values(packagingCostFields).map((field) => ({
      ...field,
      span: field.span || 3,
    })),
  },
  injectionMoldingCosts: {
    title: "注塑成型成本",
    fields: Object.values(injectionMoldingCostFields).map((field) => ({
      ...field,
      span: field.span || 3,
    })),
  },
  freightCosts: {
    title: "運輸成本",
    fields: Object.values(freightFields).map((field) => ({
      ...field,
      span: field.span || 2,
    })),
  },
  customsDutyCosts: {
    title: "關稅成本",
    fields: Object.values(customsDutyFields).map((field) => ({
      ...field,
      span: field.span || 2,
    })),
  },
  outsourcedProcessingCosts: {
    title: "委外加工成本",
    fields: Object.values(outsourcedProcessingFields).map((field) => ({
      ...field,
      span: field.span || 3,
    })),
  },
  internalProcessingCosts: {
    title: "廠內加工成本",
    fields: Object.values(internalProcessingFields).map((field) => ({
      ...field,
      span: field.span || 2,
    })),
  },
};

/**
 * @notes
 * - 主要功能：
 *   1. API 端點管理
 *   2. 表單字段配置
 *   3. 選項數據獲取
 *   4. 狀態管理
 *
 * @optimization
 * - 使用 Map 優化查找操作
 * - 實現數據緩存
 * - 添加錯誤重試機制
 */
