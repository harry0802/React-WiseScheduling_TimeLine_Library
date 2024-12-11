/**
 * @file commonConfigs_v1.js
 * @description 報價系統通用配置與字段定義
 * @version 1.0.0
 * @lastModified 2024-03-21
 */

import { createMaterialScope } from "../../../services/QuotationManagement/materialService";
import { createPackagingScope } from "../../../services/QuotationManagement/packagingService";
import { optionsService } from "../../../services/QuotationManagement/optionsService";

//! =============== 1. 設定與常量 ===============

//* API 端點配置

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
// 已移至獨立的服務文件

//* ========= 工廠函數 Factory Functions =========

// 初始化 scopes
const materialScope = createMaterialScope();
const packagingScope = createPackagingScope();

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
  hidden = false
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
  ...(getOptions ? { getOptions } : {}),
  ...(options ? { options } : {}),
  hidden,
});

//! =============== 5. 段定義 ===============
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
const materialCostFields = {
  materialName: {
    ...createField(
      "materialName",
      "物料名稱",
      "autocomplete",
      {
        placeholder: "請選擇物料名稱",
        freeSolo: true,
      },
      createRequiredRule("物料名稱")
    ),
    getOptions: () => materialScope.getMaterials(),
    getDependentValues: (materialName) =>
      materialScope.getDependentValues(materialName),
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
    () => optionsService.getMaterialOptions()
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
    () => optionsService.getCommonUnits()
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
const packagingCostFields = {
  materialName: {
    ...createField(
      "materialName",
      "包材名稱",
      "autocomplete",
      {
        placeholder: "請選擇包材名稱",
        freeSolo: true,
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
      dependsOn: "materialName",
    },
    createRequiredRule("單位"),
    null,
    3,
    () => optionsService.getCommonUnits()
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
    {
      required: "容量為必填",
      setValueAs: (value) => {
        if (value === "" || value === null) return null;
        return Number(value);
      },
    }
  ),
  bagsPerKg: createField(
    "bagsPerKg",
    "每公斤袋數",
    "number",
    createInputProps("袋/公斤", "每公斤袋數"),
    {
      setValueAs: (value) => {
        if (value === "" || value === null) return null;
        return Number(value);
      },
    }
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

// /**
//  * @notes
//  * - 主要功能：
//  *   1. API 端點管理
//  *   2. 表單字段配置
//  *   3. 選項數據獲取
//  *   4. 狀態管理
//  *
//  * @optimization
//  * - 使用 Map 優化查找操作
//  * - 實現數據緩存
//  * - 添加錯誤重試機制
//  */

// /**
//  * @file commonConfigs_v1.js
//  * @description 報價系統通用配置與字段定義
//  * @version 1.0.0
//  * @lastModified 2024-03-21
//  */

// import { API_BASE } from "../../../store/api/apiConfig";
// import { cacheService } from "../../../services/cacheService";

// //! =============== 1. 設定與常量 ===============

// //* API 端點配置
// const API_ENDPOINTS = {
//   MATERIAL_UNIT: `${API_BASE}option/materialUnit`,
//   PACKAGING_UNIT: `${API_BASE}option/packagingUnit`,
//   MACHINE_LIST: `${API_BASE}machine/list`,
//   MACHINE_DETAIL: `${API_BASE}machine`,
//   MATERIAL_PACKAGINGS: `${API_BASE}material/packagings`,
//   MATERIAL_MATERIALS: `${API_BASE}material/materials`,
//   MATERIAL_MATERIALUNITPRICE: `${API_BASE}material/materialUnitPrice`,
//   MATERIAL_OPTION: `${API_BASE}materialOption/`,
// };

// //! =============== 2. 類型與介面 ===============
// /**
//  * @typedef {Object} OptionItem
//  * @property {string|number} id - 選項ID
//  * @property {string} value - 選項值
//  * @property {string} label - 選項標籤
//  * @property {string} [productionArea] - 生產區域（可選）
//  */

// /**
//  * @typedef {Object} ApiResponse
//  * @property {boolean} status - API 響應狀態
//  * @property {Array} data - 響應數據
//  * @property {string} message - 響應消息
//  */

// //! =============== 3. 核心功能 ===============
// //* ========= 服務層 Service Layer =========
// export const optionsService = {
//   pendingRequests: {},

//   /**
//    * @function getCommonUnits
//    * @description 獲取通用單位選項
//    * @returns {Promise<OptionItem[]>} 單位選項列表
//    */

//   async getCommonUnits() {
//     const cacheKey = "commonUnits";
//     const cached = cacheService.get(cacheKey);
//     if (cached) return cached;

//     if (this.pendingRequests[cacheKey]) {
//       return this.pendingRequests[cacheKey];
//     }

//     const request = fetch(API_ENDPOINTS.MATERIAL_UNIT)
//       .then((response) => response.json())
//       .then((data) => {
//         const result = data?.data?.map((item) => ({
//           id: item.id,
//           value: item.name,
//           label: `${item.name} (${item.schema})`,
//         }));
//         cacheService.set(cacheKey, result);
//         delete this.pendingRequests[cacheKey];
//         return result;
//       })
//       .catch((error) => {
//         delete this.pendingRequests[cacheKey];
//         throw error;
//       });

//     this.pendingRequests[cacheKey] = request;
//     return request;
//   },

//   /**
//    * @function getPackagingTypes
//    * @description 獲取包裝類型選項
//    * @returns {Promise<OptionItem[]>} 包裝類型選項列表
//    */
//   async getPackagingTypes() {
//     const cacheKey = "packagingTypes";
//     const cached = cacheService.get(cacheKey);
//     if (cached) return cached;

//     if (this.pendingRequests[cacheKey]) {
//       return this.pendingRequests[cacheKey];
//     }

//     const request = fetch(API_ENDPOINTS.PACKAGING_UNIT)
//       .then((response) => response.json())
//       .then((data) => {
//         const result = data?.data?.map((item) => ({
//           id: item.id,
//           value: item.name,
//           label: `${item.name} (${item.schema})`,
//         }));
//         cacheService.set(cacheKey, result);
//         delete this.pendingRequests[cacheKey];
//         return result;
//       })
//       .catch((error) => {
//         delete this.pendingRequests[cacheKey];
//         throw error;
//       });

//     this.pendingRequests[cacheKey] = request;
//     return request;
//   },

//   /**
//    * @function getFreightTypes
//    * @description 獲取貨運類型選項
//    * @returns {Promise<OptionItem[]>} 貨運類型選項列表
//    * @throws {Error} 當獲取失敗時拋出錯誤
//    */
//   async getFreightTypes() {
//     const cacheKey = "freightTypes";
//     const cached = cacheService.get(cacheKey);
//     if (cached) return cached;

//     if (this.pendingRequests[cacheKey]) {
//       return this.pendingRequests[cacheKey];
//     }

//     const request = fetch(API_ENDPOINTS.MACHINE_LIST)
//       .then((response) => response.json())
//       .then(({ data }) => {
//         const areaMap = new Map();
//         data?.forEach((machine) => {
//           if (!areaMap.has(machine.productionArea)) {
//             areaMap.set(machine.productionArea, {
//               id: machine.id,
//               value: machine.id,
//               label: machine.productionArea,
//             });
//           }
//         });
//         const result = Array.from(areaMap.values());
//         cacheService.set(cacheKey, result);
//         delete this.pendingRequests[cacheKey];
//         return result;
//       })
//       .catch((error) => {
//         delete this.pendingRequests[cacheKey];
//         console.error("獲取產線區域失敗:", error);
//         throw error;
//       });

//     this.pendingRequests[cacheKey] = request;
//     return request;
//   },

//   /**
//    * @function getMachineAreas
//    * @description 獲取指定區域的機台列表
//    * @param {string} areaFilter - 區域過濾條件
//    * @returns {Promise<OptionItem[]>} 機台選項列表
//    * @throws {Error} 當獲取失敗時拋出錯誤
//    */
//   async getMachineAreas(areaFilter) {
//     const cacheKey = `machineAreas_${areaFilter}`;
//     const cached = cacheService.get(cacheKey);
//     if (cached) return cached;

//     if (this.pendingRequests[cacheKey]) {
//       return this.pendingRequests[cacheKey];
//     }

//     const request = Promise.all([
//       fetch(`${API_ENDPOINTS.MACHINE_DETAIL}/?id=${areaFilter}`),
//       fetch(API_ENDPOINTS.MACHINE_LIST),
//     ])
//       .then(([detailResponse, listResponse]) =>
//         Promise.all([detailResponse.json(), listResponse.json()])
//       )
//       .then(([detailResult, listResult]) => {
//         if (!detailResult.status || !detailResult.data?.[0]) {
//           throw new Error(detailResult.message || "獲取機台資訊失敗");
//         }

//         if (!listResult.status) {
//           throw new Error(listResult.message || "獲取機台列表失敗");
//         }

//         const targetArea = detailResult.data[0].productionArea;
//         const result = listResult.data
//           .filter((machine) => machine.productionArea === targetArea)
//           .map(({ id, machineSN, productionArea }) => ({
//             id,
//             value: machineSN,
//             label: machineSN,
//             productionArea,
//           }));

//         cacheService.set(cacheKey, result);
//         delete this.pendingRequests[cacheKey];
//         return result;
//       })
//       .catch((error) => {
//         delete this.pendingRequests[cacheKey];
//         console.error("取得機台資料失敗:", error);
//         throw error;
//       });

//     this.pendingRequests[cacheKey] = request;
//     return request;
//   },

//   /**
//    * @function getMaterialOptions
//    * @description 獲取物料選項
//    * @returns {Promise<OptionItem[]>} 物料選項列表
//    */
//   async getMaterialOptions() {
//     const cacheKey = "materialOptions";
//     const cached = cacheService.get(cacheKey);
//     if (cached) return cached;

//     if (this.pendingRequests[cacheKey]) {
//       return this.pendingRequests[cacheKey];
//     }

//     const request = fetch(API_ENDPOINTS.MATERIAL_OPTION)
//       .then((response) => response.json())
//       .then((data) => {
//         const result = data?.data?.map((item) => ({
//           id: item.id,
//           value: item.id,
//           label: item.materialType,
//         }));
//         cacheService.set(cacheKey, result);
//         delete this.pendingRequests[cacheKey];
//         return result;
//       })
//       .catch((error) => {
//         delete this.pendingRequests[cacheKey];
//         console.error("獲取物料選項失敗:", error);
//         throw error;
//       });

//     this.pendingRequests[cacheKey] = request;
//     return request;
//   },
// };

// //* ========= 工廠函數 Factory Functions =========
// const createSharedRequest = (cacheKey, fetchFn, ttl = 300000) => {
//   let sharedPromise = null;
//   let lastFetchTime = 0;

//   return async (forceRefresh = false) => {
//     const now = Date.now();
//     const cached = cacheService.get(cacheKey);

//     // 如果有緩存且未過期，直接返回
//     if (cached && !forceRefresh) {
//       return cached;
//     }

//     // 如果已經有進行中的請求且未超時，返回該請求
//     if (sharedPromise && now - lastFetchTime < 5000) {
//       return sharedPromise;
//     }

//     // 創建新的請求
//     lastFetchTime = now;
//     sharedPromise = fetchFn()
//       .then((result) => {
//         cacheService.set(cacheKey, result, ttl);
//         return result;
//       })
//       .finally(() => {
//         // 5秒後清除共享請求
//         setTimeout(() => {
//           sharedPromise = null;
//         }, 5000);
//       });

//     return sharedPromise;
//   };
// };

// // 修改 createMaterialScope
// const createMaterialScope = () => {
//   let currentMaterial = null;

//   // 一般共享請求 - 不需要參數
//   const fetchMaterials = createSharedRequest("materials", async () => {
//     const response = await fetch(API_ENDPOINTS.MATERIAL_MATERIALS);
//     const result = await response.json();
//     return result.data.map((item) => ({
//       value: item.materialName,
//       label: item.materialName,
//       materialSN: item.materialSN,
//       unitPrice: item.unitPrice,
//       materialOptionId: item.materialOptionId,
//       unit: item.unit,
//     }));
//   });

//   // 特殊處理 - 需要參數的請求
//   const materialPriceCache = new Map();
//   const getMaterialPrice = async (material) => {
//     if (!material) return null;

//     const cacheKey = `${material.label}_${material.materialSN}`;
//     if (materialPriceCache.has(cacheKey)) {
//       return materialPriceCache.get(cacheKey);
//     }

//     const response = await fetch(
//       `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${material.label}&materialSN=${material.materialSN}`
//     );
//     const result = await response.json();
//     const price = result.status ? result.data : null;

//     materialPriceCache.set(cacheKey, price);

//     // 5分鐘後清除緩存
//     setTimeout(() => {
//       materialPriceCache.delete(cacheKey);
//     }, 300000);

//     return price;
//   };

//   return {
//     getMaterials: () => fetchMaterials(),

//     async setSelectedMaterial(materialName) {
//       if (!materialName) return null;

//       const materials = await fetchMaterials();
//       currentMaterial = materials.find((m) => m.label === materialName.label);

//       if (!currentMaterial) return null;
//       const unitPrice = await getMaterialPrice(currentMaterial);

//       return {
//         materialSN: currentMaterial.materialSN,
//         unitPrice,
//         materialOptionId: currentMaterial.materialOptionId,
//       };
//     },

//     getCurrentMaterial() {
//       return currentMaterial;
//     },

//     getMaterialPrice,

//     async getDependentValues(materialName) {
//       if (!materialName) return null;
//       const result = await this.setSelectedMaterial(materialName);
//       if (!result) return null;

//       return {
//         materialName: materialName.label,
//         materialSN: result.materialSN,
//         unitPrice: result.unitPrice,
//         materialOptionId: result.materialOptionId,
//       };
//     },
//   };
// };

// const createPackagingScope = () => {
//   let currentPackaging = null;

//   // 使用共享請求獲取包材列表
//   const fetchPackagings = createSharedRequest("packagings", async () => {
//     const response = await fetch(API_ENDPOINTS.MATERIAL_PACKAGINGS);
//     const result = await response.json();
//     return result.data.map((item) => ({
//       value: item.materialName,
//       label: item.materialName,
//       materialSN: item.materialSN,
//       unitPrice: item.unitPrice,
//       unit: item.unit,
//     }));
//   });

//   // 特殊處理包材單價的緩存
//   const packagingPriceCache = new Map();
//   const getPackagingPrice = async (packaging) => {
//     if (!packaging) return null;

//     const cacheKey = `${packaging.label}_${packaging.materialSN}`;
//     if (packagingPriceCache.has(cacheKey)) {
//       return packagingPriceCache.get(cacheKey);
//     }

//     const response = await fetch(
//       `${API_ENDPOINTS.MATERIAL_MATERIALUNITPRICE}?materialName=${packaging.label}&materialSN=${packaging.materialSN}`
//     );
//     const result = await response.json();
//     const price = result.status ? result.data : null;

//     packagingPriceCache.set(cacheKey, price);

//     // 5分鐘後清除緩存
//     setTimeout(() => {
//       packagingPriceCache.delete(cacheKey);
//     }, 300000);

//     return price;
//   };

//   return {
//     getPackagings: () => fetchPackagings(),

//     async setSelectedPackaging(packagingName) {
//       if (!packagingName) return null;

//       const packagings = await fetchPackagings();
//       currentPackaging = packagings.find(
//         (p) => p.label === packagingName.label
//       );

//       if (!currentPackaging) return null;
//       const unitPrice = await getPackagingPrice(currentPackaging);

//       return {
//         packagingSN: currentPackaging.materialSN,
//         unit: currentPackaging.unit,
//         unitPrice,
//       };
//     },

//     getPackagingPrice,

//     async getDependentValues(packagingName) {
//       if (!packagingName) return null;
//       const result = await this.setSelectedPackaging(packagingName);
//       if (!result) return null;

//       return {
//         materialName: packagingName.label,
//         materialSN: result.packagingSN,
//         unitPrice: result.unitPrice,
//         packagingType: "包材",
//       };
//     },
//   };
// };

// //! =============== 4. 工具函數 ===============
// const createInputProps = (unit, label) => ({
//   InputProps: { endAdornment: unit },
//   placeholder: `請輸入${label || (unit === "元" ? "金額" : unit)}`,
// });

// const createRequiredRule = (label) => ({ required: `${label}為必填` });

// export const createField = (
//   name,
//   label,
//   type,
//   props = {},
//   rules = {},
//   options = null,
//   span,
//   getOptions,
//   hidden = false // 新增參數
// ) => ({
//   name,
//   label,

//   type,
//   ...props,
//   rules: {
//     ...rules,
//     ...(type === "number" && {
//       setValueAs: (value) => {
//         if (value === "" || value === null) return null;
//         return Number(value);
//       },
//     }),
//   },
//   ...(span && { span }),
//   // 為直接傳入 getOptions 函數，而不呼叫
//   ...(getOptions ? { getOptions } : {}),
//   ...(options ? { options } : {}),
//   hidden,
// });

// //! =============== 5. 段定義 ===============
// //* 基礎成本設置字段
// const materialCostSettingFields = {
//   estimatedDefectRate: createField(
//     "estimatedDefectRate",
//     "預估不良率",
//     "number",
//     createInputProps("%", "預不良率"),
//     createRequiredRule("預估不良率")
//   ),
//   estimatedMaterialFluctuation: createField(
//     "estimatedMaterialFluctuation",
//     "預估材料浮動",
//     "number",
//     createInputProps("%", "預估材料浮動"),
//     createRequiredRule("預估材料浮動")
//   ),
//   extractionCost: createField(
//     "extractionCost",
//     "抽料費用",
//     "number",
//     createInputProps("元", "抽料費用"),
//     createRequiredRule("抽料費用")
//   ),
//   processingCost: createField(
//     "processingCost",
//     "加工費用",
//     "number",
//     createInputProps("元", "加工費用"),
//     createRequiredRule("加工費用")
//   ),
// };

// //* 材料成本字段
// const materialScope = createMaterialScope();
// const materialCostFields = {
//   materialName: {
//     ...createField(
//       "materialName",
//       "物料名稱",
//       "autocomplete",
//       {
//         placeholder: "請選擇物料名稱",
//         freeSolo: true,
//       },
//       createRequiredRule("物料名稱")
//     ),
//     getOptions: () => materialScope.getMaterials(),
//     getDependentValues: (materialName) =>
//       materialScope.getDependentValues(materialName),
//   },
//   materialSN: {
//     ...createField(
//       "materialSN",
//       "物料編號",
//       "input",
//       {
//         placeholder: "物料編號將自動填入",
//         readOnly: true,
//       },
//       createRequiredRule("物料編號")
//     ),
//   },
//   materialOptionId: createField(
//     "materialOptionId",
//     "原物料種類",
//     "select",
//     { placeholder: "請選擇原物料種類" },
//     createRequiredRule("原物料種類"),
//     null,
//     3,
//     () => optionsService.getMaterialOptions()
//   ),
//   unit: createField(
//     "unit",
//     "單位",
//     "select",
//     {
//       placeholder: "請選擇單位",
//       dependsOn: "materialName",
//     },
//     createRequiredRule("單位"),
//     null,
//     3,
//     () => optionsService.getCommonUnits()
//   ),
//   weight: createField(
//     "weight",
//     "重量",
//     "number",
//     createInputProps("公克", "重量"),
//     createRequiredRule("重量")
//   ),
//   unitPrice: createField(
//     "unitPrice",
//     "單價",
//     "number",
//     {
//       ...createInputProps("元", "單價"),
//       dependsOn: "materialName",
//       readOnly: true,
//     },
//     createRequiredRule("單價")
//   ),
// };

// //* 包裝成本字段
// const packagingScope = createPackagingScope();
// const packagingCostFields = {
//   materialName: {
//     ...createField(
//       "materialName",
//       "包材名稱",
//       "autocomplete",
//       {
//         placeholder: "請選擇包材名稱",
//         freeSolo: true,
//       },
//       createRequiredRule("包材名稱")
//     ),
//     getOptions: packagingScope.getPackagings,
//     getDependentValues: async (packagingName) => {
//       if (!packagingName) return null;
//       const packaging = await packagingScope.setSelectedPackaging(
//         packagingName
//       );
//       if (packaging) {
//         return {
//           materialName: packagingName.label,
//           materialSN: packaging.packagingSN || "",
//           unitPrice: packaging.unitPrice,
//           packagingType: "包材",
//         };
//       }
//       return null;
//     },
//   },
//   materialSN: {
//     ...createField(
//       "materialSN",
//       "包材編號",
//       "input",
//       {
//         placeholder: "包材編號將自動填入",
//         readOnly: true,
//         dependsOn: "materialName",
//       },
//       createRequiredRule("包材編號")
//     ),
//   },
//   packagingType: createField(
//     "packagingType",
//     "包材類型",
//     "input",
//     {
//       placeholder: "請選擇包材類型",
//       readOnly: true,
//     },
//     {
//       ...createRequiredRule("包材類型"),
//     },
//     null,
//     3,
//     null
//   ),
//   unit: createField(
//     "unit",
//     "單位",
//     "select",
//     {
//       placeholder: "請選擇單位",
//       readOnly: true,
//       dependsOn: "materialName",
//     },
//     createRequiredRule("單位"),
//     null,
//     3,
//     () => optionsService.getCommonUnits()
//   ),
//   quantity: createField(
//     "quantity",
//     "數量",
//     "number",
//     createInputProps("個", "數量"),
//     createRequiredRule("數量")
//   ),
//   capacity: createField(
//     "capacity",
//     "容量",
//     "number",
//     createInputProps("件/箱", "容量"),
//     {
//       required: "容量為必填",
//       setValueAs: (value) => {
//         if (value === "" || value === null) return null;
//         return Number(value);
//       },
//     }
//   ),
//   bagsPerKg: createField(
//     "bagsPerKg",
//     "每公斤袋數",
//     "number",
//     createInputProps("袋/公斤", "每公斤袋數"),
//     {
//       setValueAs: (value) => {
//         if (value === "" || value === null) return null;
//         return Number(value);
//       },
//     }
//   ),
//   unitPrice: {
//     ...createField(
//       "unitPrice",
//       "單價",
//       "number",
//       {
//         ...createInputProps("元", "單價"),
//         dependsOn: "materialName",
//         readOnly: true,
//       },
//       createRequiredRule("單價")
//     ),
//   },
//   // amount: createField(
//   //   "amount",
//   //   "金額",
//   //   "number",
//   //   {
//   //     ...createInputProps("元", "金額"),
//   //     readOnly: true,
//   //     dependsOn: ["quantity", "unitPrice"],
//   //   },
//   //   createRequiredRule("金額")
//   // ),
// };

// //* 其他成本字段
// const injectionMoldingCostFields = {
//   workHoursRatio: createField(
//     "workHoursRatio",
//     "工時比例",
//     "number",
//     createInputProps("%", "工時比例"),
//     createRequiredRule("工時比例")
//   ),
//   defectiveRate: createField(
//     "defectiveRate",
//     "不良率",
//     "number",
//     createInputProps("%", "不良率"),
//     createRequiredRule("不良率")
//   ),
//   cycleTime: createField(
//     "cycleTime",
//     "週期時間",
//     "number",
//     createInputProps("秒", "週期時間"),
//     createRequiredRule("週期時間")
//   ),
//   packageTime: createField(
//     "packageTime",
//     "包裝時間",
//     "number",
//     createInputProps("秒", "包裝時間"),
//     createRequiredRule("包裝時間")
//   ),
//   moldCavity: createField(
//     "moldCavity",
//     "模具穴數",
//     "number",
//     { placeholder: "請輸入模具穴數" },
//     createRequiredRule("模具穴數")
//   ),
//   unitPrice: createField(
//     "unitPrice",
//     "單價",
//     "number",
//     createInputProps("元", "單價"),
//     createRequiredRule("單價")
//   ),
//   amount: createField(
//     "amount",
//     "金額",
//     "number",
//     createInputProps("元", "金額"),
//     createRequiredRule("金額")
//   ),
//   subtotal: createField(
//     "subtotal",
//     "小計",
//     "number",
//     createInputProps("元", "小計"),
//     createRequiredRule("小計")
//   ),
//   electricityCost: createField(
//     "electricityCost",
//     "電費",
//     "number",
//     createInputProps("元", "電費"),
//     createRequiredRule("電費")
//   ),
// };

// const freightFields = {
//   deliveryDistance: createField(
//     "deliveryDistance",
//     "運送距離",
//     "number",
//     createInputProps("公里", "運送距離"),
//     createRequiredRule("運送距離")
//   ),
//   driverWorkHours: createField(
//     "driverWorkHours",
//     "司機工時",
//     "number",
//     createInputProps("小時", "司機工時"),
//     createRequiredRule("司機工時")
//   ),
//   fuelCostPerKM: createField(
//     "fuelCostPerKM",
//     "每公里油費",
//     "number",
//     createInputProps("元/公里", "每公里油費"),
//     createRequiredRule("每公里油費")
//   ),
//   estimatedShipment: createField(
//     "estimatedShipment",
//     "預估出貨量",
//     "number",
//     { placeholder: "請輸入預估出貨量" },
//     createRequiredRule("預估出貨量")
//   ),
// };

// const customsDutyFields = {
//   feeType: createField(
//     "feeType",
//     "費用類型",
//     "select",
//     { placeholder: "請選擇費用類型" },
//     createRequiredRule("費用類型"),
//     [
//       { value: "運費", label: "運費" },
//       { value: "關稅", label: "關稅" },
//       { value: "其他", label: "其他" },
//     ]
//   ),
//   freight: createField(
//     "freight",
//     "運費",
//     "number",
//     createInputProps("元", "運費"),
//     createRequiredRule("運費")
//   ),
//   estimatedShipment: createField(
//     "estimatedShipment",
//     "預估出貨量",
//     "number",
//     { placeholder: "請輸入預估出貨量" },
//     createRequiredRule("預估出貨量")
//   ),
// };

// const outsourcedProcessingFields = {
//   unitPrice: {
//     ...createField(
//       "unitPrice",
//       "單價",
//       "number",
//       createInputProps("元", "單價"),
//       createRequiredRule("單價")
//     ),
//   },
//   amount: {
//     ...createField(
//       "amount",
//       "金額",
//       "number",
//       createInputProps("元", "金額"),
//       createRequiredRule("金額")
//     ),
//   },
// };

// const internalProcessingFields = {
//   workSecond: createField(
//     "workSecond",
//     "工時",
//     "number",
//     createInputProps("秒", "工時"),
//     createRequiredRule("工時")
//   ),
//   unitPrice: createField(
//     "unitPrice",
//     "單價",
//     "number",
//     createInputProps("元", "單價"),
//     createRequiredRule("單價")
//   ),
//   amount: createField(
//     "amount",
//     "金額",
//     "number",
//     createInputProps("元", "金額"),
//     createRequiredRule("金額")
//   ),
// };

// //! =============== 6. 導出配置 ===============
// export const commonFields = {
//   ...materialCostSettingFields,
//   ...materialCostFields,
//   ...packagingCostFields,
//   ...injectionMoldingCostFields,
//   ...freightFields,
//   ...customsDutyFields,
//   ...outsourcedProcessingFields,
//   ...internalProcessingFields,
// };

// export const commonSections = {
//   materialCostSetting: {
//     title: "材料成本設置",
//     fields: Object.values(materialCostSettingFields).map((field) => ({
//       ...field,
//       span: 12,
//     })),
//   },
//   materialCosts: {
//     title: "材料成本",
//     fields: Object.values(materialCostFields).map((field) => ({
//       ...field,
//       span: field.span || 3,
//     })),
//   },
//   packagingCosts: {
//     title: "包裝成本",
//     fields: Object.values(packagingCostFields).map((field) => ({
//       ...field,
//       span: field.span || 3,
//     })),
//   },
//   injectionMoldingCosts: {
//     title: "注塑成型成本",
//     fields: Object.values(injectionMoldingCostFields).map((field) => ({
//       ...field,
//       span: field.span || 3,
//     })),
//   },
//   freightCosts: {
//     title: "運輸成本",
//     fields: Object.values(freightFields).map((field) => ({
//       ...field,
//       span: field.span || 2,
//     })),
//   },
//   customsDutyCosts: {
//     title: "關稅成本",
//     fields: Object.values(customsDutyFields).map((field) => ({
//       ...field,
//       span: field.span || 2,
//     })),
//   },
//   outsourcedProcessingCosts: {
//     title: "委外加工成本",
//     fields: Object.values(outsourcedProcessingFields).map((field) => ({
//       ...field,
//       span: field.span || 3,
//     })),
//   },
//   internalProcessingCosts: {
//     title: "廠內加工成本",
//     fields: Object.values(internalProcessingFields).map((field) => ({
//       ...field,
//       span: field.span || 2,
//     })),
//   },
// };

// /**
//  * @notes
//  * - 主要功能：
//  *   1. API 端點管理
//  *   2. 表單字段配置
//  *   3. 選項數據獲取
//  *   4. 狀態管理
//  *
//  * @optimization
//  * - 使用 Map 優化查找操作
//  * - 實現數據緩存
//  * - 添加錯誤重試機制
//  */
