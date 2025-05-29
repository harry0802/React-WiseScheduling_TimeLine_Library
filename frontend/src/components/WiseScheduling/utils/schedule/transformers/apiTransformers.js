/**
 * @file apiTransformers.js
 * @description API 資料與內部資料格式互相轉換的工具函數
 * @version 2.5.0 - 移除測試程式碼，專注於核心轉換邏輯
 * @author Claude / Harry
 *
 * 重要注意點：
 * 1. 【計畫時間與實際時間處理】 - 搜尋 "TIME_HANDLING" 關鍵字快速找到
 * 2. 製令單時間處理 - 搜尋 "WORK_ORDER_TIME" 關鍵字快速找到
 * 3. 機台狀態時間處理 - 搜尋 "MACHINE_STATUS_TIME" 關鍵字快速找到
 */

import dayjs from "dayjs";
import { getStatusClass } from "../../../configs/validations/schedule/constants";
import {
  validateApiStatusTransition,
  validateApiItemCompleteness,
} from "../apiValidators";
import { v4 as uuidv4 } from "uuid";

//! =============== 1. 常量定義 ===============
//* 預設值與常量
const DEFAULT_GROUP = "A-1";
const DEFAULT_STATUS = "待機中";
const DEFAULT_AREA = "A";
const ORDER_STATUS = "製令單";
const TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

//* API資料空值模板
const API_DATA_DEFAULTS = {
  machineStatusId: null,
  machineStatusPlanStartTime: null,
  machineStatusPlanEndTime: null,
  machineStatusActualStartTime: null,
  machineStatusActualEndTime: null,
  machineStatusReason: null,
  machineStatusProduct: null,
  productionScheduleId: null,
  planOnMachineDate: null,
  planFinishDate: null,
  actualOnMachineDate: null,
  actualFinishDate: null,
  postponeTime: null,
  productSN: null,
  productName: null,
  workOrderQuantity: null,
  productionQuantity: null,
  processName: null,
  productionScheduleStatus: null,
};

//! =============== 2. 輔助工具函數 ===============

/**
 * @function formatDate
 * @description 安全地格式化日期
 * @param {Date|string} date - 要格式化的日期
 * @param {string} format - 日期格式
 * @param {boolean} toUTC - 是否轉換為 UTC 時間
 * @returns {string} 格式化的日期字符串，無效則返回null
 */
function formatDate(date, format = TIME_FORMAT, toUTC = true) {
  if (!date) return null;

  if (toUTC) {
    // 直接返回標準 UTC 格式
    return dayjs(date).utc().toISOString();
  }

  return dayjs(date).format(format);
}

/**
 * @function safeParseInt
 * @description 安全地解析整數
 * @param {any} value - 要解析的值
 * @param {number} defaultValue - 解析失敗時的默認值
 * @returns {number} 解析後的整數
 */
function safeParseInt(value, defaultValue = 0) {
  if (value == null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * @function determineItemType
 * @description 根據資料結構判斷項目類型
 * @param {Object} data - 內部資料
 * @returns {string} 狀態類型
 */
function determineItemType(data) {
  // 使用邏輯短路特性，按優先順序判斷
  return (
    (data.orderInfo?.productName && data.orderInfo?.process && ORDER_STATUS) ||
    (data.status?.reason === "機台故障" && "機台停機") ||
    (data.status?.product && "產品試模") ||
    (data.status && "待機中") ||
    DEFAULT_STATUS
  );
}

/**
 * @function validateInputData
 * @description 驗證輸入資料的基本有效性
 * @param {Object} data - 待驗證的資料
 * @param {string} type - 資料類型 ("api" 或 "internal")
 * @returns {boolean} 驗證結果
 */
function validateInputData(data, type = "internal") {
  if (!data) {
    console.error(`轉換錯誤: ${type}資料為空`);
    return false;
  }

  if (type === "api" && !data.machineSN && !data.timeLineStatus) {
    console.warn("API資料缺少關鍵欄位");
    return false;
  }

  return true;
}

//! =============== 3. 資料修復與標準化 ===============

/**
 * @function findStartTime
 * @description 從內部資料中找出開始時間
 * @param {Object} data - 內部資料
 * @returns {Date} 開始時間
 */
function findStartTime(data) {
  // 使用邏輯短路簡化判斷
  return (
    data.start ||
    data.status?.startTime ||
    data.orderInfo?.scheduledStartTime ||
    (console.warn("缺少開始時間信息，使用當前時間"), new Date())
  );
}

/**
 * @function findEndTime
 * @description 從內部資料中找出結束時間
 * @param {Object} data - 內部資料
 * @param {Date} startTime - 開始時間，用於計算默認結束時間
 * @returns {Date} 結束時間
 */
function findEndTime(data, startTime) {
  // 使用邏輯短路簡化判斷
  return (
    data.end ||
    data.status?.endTime ||
    data.orderInfo?.scheduledEndTime ||
    dayjs(startTime).add(1, "hour").toDate()
  );
}

/**
 * @function repairInternalData
 * @description 修復和標準化內部資料
 * @param {Object} internalData - 內部資料
 * @param {Object} originalData - 原始資料（可選）
 * @returns {Object} 修復後的關鍵資訊
 */
function repairInternalData(internalData, originalData) {
  // 獲取並標準化時間資訊
  const startTime = findStartTime(internalData);
  const endTime = findEndTime(internalData, startTime);

  // 獲取並標準化機台信息
  const group = internalData.group || originalData?.group || DEFAULT_GROUP;

  // 獲取並標準化狀態類型
  let timeLineStatus =
    internalData.timeLineStatus || determineItemType(internalData);
  const isWorkOrder = timeLineStatus === ORDER_STATUS;

  return { startTime, endTime, group, timeLineStatus, isWorkOrder };
}

//! =============== 4. API轉內部格式 ===============

/**
 * @function extractOrderInfoFromApi
 * @description 從API資料提取訂單信息
 * @param {Object} apiData - API資料
 * @param {Object} times - 時間資訊
 * @returns {Object} 訂單信息
 */
function extractOrderInfoFromApi(apiData, { startTime, endTime }) {
  // TIME_HANDLING - 訂單信息 - 從API轉換到內部格式
  return {
    id: apiData.productionScheduleId || "",
    scheduledStartTime: dayjs(apiData.planOnMachineDate || startTime).toDate(),
    scheduledEndTime: dayjs(apiData.planFinishDate || endTime).toDate(),
    actualStartTime: apiData.actualOnMachineDate
      ? dayjs(apiData.actualOnMachineDate).toDate()
      : null,
    actualEndTime: apiData.actualFinishDate
      ? dayjs(apiData.actualFinishDate).toDate()
      : null,
    productId: apiData.productSN || "",
    productName: apiData.productName || "",
    quantity: safeParseInt(apiData.workOrderQuantity),
    completedQty: safeParseInt(apiData.productionQuantity),
    process: apiData.processName || "",
    orderStatus: apiData.productionScheduleStatus || "",
  };
}

/**
 * @function extractStatusInfoFromApi
 * @description 從API資料提取狀態信息
 * @param {Object} apiData - API資料
 * @param {Object} times - 時間資訊
 * @returns {Object} 狀態信息
 */
function extractStatusInfoFromApi(apiData, { startTime, endTime }) {
  // TIME_HANDLING - 狀態信息 - 從API轉換到內部格式
  // 分別處理計劃時間和實際時間
  const planStartTime = apiData.machineStatusPlanStartTime || startTime;
  const planEndTime = apiData.machineStatusPlanEndTime || endTime;
  const actualStartTime = apiData.machineStatusActualStartTime;
  const actualEndTime = apiData.machineStatusActualEndTime;

  return {
    id: apiData.machineStatusId || "",
    // 計劃時間
    startTime: dayjs(planStartTime).toDate(),
    endTime: dayjs(planEndTime).toDate(),
    // 實際時間 (只有當實際執行時才會有值)
    actualStartTime: actualStartTime ? dayjs(actualStartTime).toDate() : null,
    actualEndTime: actualEndTime ? dayjs(actualEndTime).toDate() : null,
    reason: apiData.machineStatusReason || "",
    product: apiData.machineStatusProduct || apiData.productName || "",
  };
}

/**
 * @function transformApiToInternalFormat
 * @description 將 API 資料轉換為內部格式
 * @param {Object} apiData - API 回傳的資料
 * @returns {Object} 內部結構的資料
 */
export const transformApiToInternalFormat = (apiData) => {
  if (!validateInputData(apiData, "api")) return null;

  // 處理 timeLineStatus，確保在系統內部使用「製令單」
  const timeLineStatus =
    apiData.timeLineStatus === "製令單" ? ORDER_STATUS : apiData.timeLineStatus;
  const isWorkOrder = timeLineStatus === ORDER_STATUS;

  // WORK_ORDER_TIME - 提取時間資訊
  let startTime, endTime;

  if (isWorkOrder) {
    // 製令單時間處理 - 優先使用實際時間，其次是計劃時間
    startTime = dayjs(apiData.actualOnMachineDate || apiData.planOnMachineDate);
    endTime = apiData.actualFinishDate
      ? dayjs(apiData.actualFinishDate)
      : apiData.planFinishDate
      ? dayjs(apiData.planFinishDate)
      : startTime.add(1, "hour");
  } else {
    // MACHINE_STATUS_TIME - 機台狀態時間處理
    // 優先使用實際時間，其次是計畫時間
    startTime = dayjs(
      apiData.machineStatusActualStartTime || apiData.machineStatusPlanStartTime
    );

    // 使用邏輯短路簡化結束時間判斷
    endTime = apiData.machineStatusActualEndTime
      ? dayjs(apiData.machineStatusActualEndTime)
      : apiData.machineStatusPlanEndTime
      ? dayjs(apiData.machineStatusPlanEndTime)
      : startTime.add(1, "hour");
  }

  // 提取訂單與狀態信息
  const times = { startTime, endTime };
  const orderInfo = extractOrderInfoFromApi(apiData, times);
  const status = extractStatusInfoFromApi(apiData, times);

  // 組裝內部格式資料
  const internalData = {
    // 設置ID - 優先使用API提供的ID，否則生成新的UUID
    id: isWorkOrder
      ? apiData.productionScheduleId || uuidv4()
      : apiData.machineStatusId || uuidv4(),
    group: apiData.machineSN,
    area: apiData.productionArea,
    timeLineStatus,
    className: getStatusClass(apiData.timeLineStatus),
    content:
      apiData.timeLineStatus === "製令單"
        ? apiData.productName
        : apiData.timeLineStatus,
    _originalApiData: apiData, // 保存原始API資料供除錯
  };

  // 根據項目類型添加適當的屬性
  if (isWorkOrder) {
    // 製令單只使用 orderInfo
    internalData.orderInfo = orderInfo;
    internalData.status = null; // 確保不使用 status
    internalData.start = orderInfo.scheduledStartTime; // 添加開始時間
    internalData.end = orderInfo.scheduledEndTime; // 添加結束時間
    // 添加實際時間到頂層，方便歷史紀錄檢查
    internalData.actualStartTime = orderInfo.actualStartTime;
    internalData.actualEndTime = orderInfo.actualEndTime;
  } else {
    // 機台狀態只使用 status

    internalData.status = status;
    internalData.orderInfo = null; // 確保不使用 orderInfo
    internalData.start = status.startTime; // 添加開始時間
    internalData.end = status.endTime; // 添加結束時間
    // 添加實際時間到頂層，方便歷史紀錄檢查
    internalData.actualStartTime = status.actualStartTime;
    internalData.actualEndTime = status.actualEndTime;
  }

  return internalData;
};

//! =============== 5. 內部格式轉API - 工作訂單 ===============

/**
 * @function fillWorkOrderData
 * @description 填充製令單特定資料
 * @param {Object} internalData - 內部資料
 * @param {Object} apiData - API資料
 * @param {Date} startTime - 開始時間
 * @param {Date} endTime - 結束時間
 */
function fillWorkOrderData(internalData, apiData, startTime, endTime) {
  // WORK_ORDER_TIME - 將多次使用的時間格式提前處理
  const formattedStartTime = formatDate(startTime, TIME_FORMAT, true);
  const formattedEndTime = formatDate(endTime, TIME_FORMAT, true);

  // 修正: 使用 orderInfo.id 作為 productionScheduleId，而不是 internalData.id
  apiData.productionScheduleId =
    internalData.orderInfo?.id ||
    internalData._originalApiData?.productionScheduleId ||
    "";

  // 計劃時間處理 - 使用邏輯短路簡化判斷
  apiData.planOnMachineDate = internalData.orderInfo?.scheduledStartTime
    ? formatDate(internalData.orderInfo.scheduledStartTime, TIME_FORMAT, true)
    : formattedStartTime;

  apiData.planFinishDate = internalData.orderInfo?.scheduledEndTime
    ? formatDate(internalData.orderInfo.scheduledEndTime, TIME_FORMAT, true)
    : formattedEndTime;

  // 實際時間處理
  apiData.actualOnMachineDate = internalData.orderInfo?.actualStartTime
    ? formatDate(internalData.orderInfo.actualStartTime, TIME_FORMAT, true)
    : null;

  apiData.actualFinishDate = internalData.orderInfo?.actualEndTime
    ? formatDate(internalData.orderInfo.actualEndTime, TIME_FORMAT, true)
    : null;

  // 產品資訊 - 使用邏輯短路簡化
  apiData.productSN = internalData.orderInfo?.productId || "";
  apiData.productName =
    internalData.orderInfo?.productName || internalData.content || "";

  // 數量資訊 - 確保數值轉換安全
  apiData.workOrderQuantity =
    internalData.orderInfo?.quantity != null
      ? String(internalData.orderInfo.quantity)
      : "0";

  apiData.productionQuantity =
    internalData.orderInfo?.completedQty != null
      ? String(internalData.orderInfo.completedQty)
      : "0";

  // 其他資訊
  apiData.processName = internalData.orderInfo?.process || "";
  apiData.productionScheduleStatus = internalData.orderInfo?.orderStatus || "";
}

//! =============== 6. 內部格式轉API - 機台狀態 ===============

/**
 * @function fillMachineStatusData
 * @description 填充機台狀態特定資料
 * @param {Object} internalData - 內部資料
 * @param {Object} apiData - API資料
 * @param {Date} startTime - 開始時間
 * @param {Date} endTime - 結束時間
 */
function fillMachineStatusData(internalData, apiData, startTime, endTime) {
  console.log("🚀 ~ fillMachineStatusData ~ internalData:", internalData);

  const formattedStartTime = formatDate(startTime, TIME_FORMAT, true);
  const formattedEndTime = formatDate(endTime, TIME_FORMAT, true);
  const { status, _originalApiData } = internalData;

  apiData.machineStatusId = status.id || "";
  apiData.status = internalData.timeLineStatus || "";

  // 計劃時間處理
  apiData.planStartDate = status?.startTime
    ? formatDate(status.startTime, TIME_FORMAT, true)
    : formattedStartTime;

  apiData.planEndDate = status?.endTime
    ? formatDate(status.endTime, TIME_FORMAT, true)
    : formattedEndTime;

  // 實際開始時間處理
  if (_originalApiData?.machineStatusActualStartTime) {
    apiData.actualStartDate = formatDate(
      _originalApiData.machineStatusActualStartTime,
      TIME_FORMAT,
      true
    );
  } else if (status?.startTime) {
    apiData.actualStartDate = formatDate(status.startTime, TIME_FORMAT, true);
  } else {
    apiData.actualStartDate = formattedStartTime;
  }

  // 實際結束時間處理
  if (_originalApiData?.machineStatusActualEndTime) {
    apiData.actualEndDate = formatDate(
      _originalApiData.machineStatusActualEndTime,
      TIME_FORMAT,
      true
    );
  } else {
    apiData.actualEndDate = null;
  }

  // 狀態詳情
  apiData.machineStatusReason = status?.reason || null;
  apiData.machineStatusProduct = status?.product || null;
}
//! =============== 7. 主要轉換函數 ===============

/**
 * @function transformInternalToApiFormat
 * @description 將內部格式的資料轉換為 API 格式，用於送出表單或修改
 * @param {Object} internalData - 內部結構的資料
 * @param {Object} originalData - 原始內部結構資料，用於狀態轉換驗證
 * @param {boolean} isTest - 是否為測試模式，測試模式下跳過某些驗證
 * @returns {Object} API 格式的資料
 */
export const transformInternalToApiFormat = (
  internalData,
  originalData = null,
  isTest = false
) => {
  if (!validateInputData(internalData, "internal")) return null;

  // 修復和標準化數據
  const { startTime, endTime, group, timeLineStatus, isWorkOrder } =
    repairInternalData(internalData, originalData);

  // 驗證狀態轉換 - 只在非測試模式且有原始資料時執行
  if (originalData && !isTest) {
    validateApiStatusTransition(internalData, originalData);
  }
  // TODO: 添加 這裡決定 回傳資料
  // 創建基本 API 結構 - 使用預設值初始化
  const apiData = {
    ...API_DATA_DEFAULTS,
    timeLineStatus: isWorkOrder ? "製令單" : timeLineStatus,
    productionArea: internalData.area || DEFAULT_AREA,
    machineSN: group,
    machineId: internalData.machineId || null, // 添加 machineId
  };

  // 根據類型填充特定欄位 - 使用簡單的條件判斷
  if (isWorkOrder) {
    fillWorkOrderData(internalData, apiData, startTime, endTime);
  } else {
    fillMachineStatusData(internalData, apiData, startTime, endTime);
  }

  return apiData;
};

/**
 * @function transformNewStatusToApi
 * @description 將內部格式的新狀態轉換為 API 格式
 * @param {Object} internalData - 內部結構的新狀態資料
 * @param {boolean} isTest - 是否為測試模式，測試模式下跳過某些驗證
 * @returns {Object} API 格式的資料
 */
export const transformNewStatusToApi = (internalData, isTest = false) => {
  const apiData = transformInternalToApiFormat(internalData, null, isTest);

  // 驗證 API 資料的完整性 - 只在非測試模式時執行
  if (!isTest) {
    validateApiItemCompleteness(apiData);
  }

  return apiData;
};

export const transformUpdateStatusToApi = (
  internalData,
  originalData,
  isTest = false
) => {
  // 驗證狀態轉換是否合法 - 只在非測試模式時執行
  if (!isTest) {
    validateApiStatusTransition(internalData, originalData);
  }

  const apiData = transformInternalToApiFormat(
    internalData,
    originalData,
    isTest
  );

  // 驗證 API 資料的完整性 - 只在非測試模式時執行
  if (!isTest) {
    validateApiItemCompleteness(apiData);
  }

  return apiData;
};
