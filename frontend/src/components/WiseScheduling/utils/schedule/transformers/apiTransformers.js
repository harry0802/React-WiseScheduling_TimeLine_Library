/**
 * @file apiTransformers.js
 * @description API 資料與內部資料格式互相轉換的工具函數
 * @version 2.0.0 - 更新於 2025-05-19，適配扁平化API結構
 * @author Claude / Harry
 */

import dayjs from "dayjs";
import { getStatusClass } from "../../../configs/validations/schedule/constants";
import {
  validateApiStatusTransition,
  validateApiItemCompleteness,
} from "../apiValidators";
import { v4 as uuidv4 } from "uuid";

/**
 * @function transformApiToInternalFormat
 * @description 將 API 資料轉換為內部格式
 * @param {Object} apiData - API 回傳的資料
 * @returns {Object} 內部結構的資料
 */
export const transformApiToInternalFormat = (apiData) => {
  if (!apiData) return null;

  // 處理 timeLineStatus，確保在系統內部使用「製令單」
  let timeLineStatus = apiData.timeLineStatus;
  const isWorkOrder = timeLineStatus === "製令單";

  // 如果是製令單，內部使用「製令單」
  if (isWorkOrder) {
    timeLineStatus = "製令單";
  }

  // 設置ID
  // 根據不同類型使用不同 ID，製令單使用 productionScheduleId，其他狀態使用 machineStatusId
  const itemId = isWorkOrder
    ? apiData.productionScheduleId
    : apiData.machineStatusId;

  // 如果沒有 id，則生成一個
  const generatedId = uuidv4();

  // 設置機台和區域
  const machineGroup = apiData.machineSN;
  const area = apiData.productionArea;

  // 基於項目類型獲取開始和結束時間
  let startTime, endTime;

  if (isWorkOrder) {
    // 製令單時間處理
    startTime = dayjs(apiData.planOnMachineDate);
    endTime = apiData.planFinishDate
      ? dayjs(apiData.planFinishDate)
      : startTime.add(1, "hour");
  } else {
    // 機台狀態時間處理
    startTime = dayjs(
      apiData.machineStatusActualStartTime || apiData.machineStatusPlanStartTime
    );
    endTime = apiData.machineStatusActualEndTime
      ? dayjs(apiData.machineStatusActualEndTime)
      : apiData.machineStatusPlanEndTime
      ? dayjs(apiData.machineStatusPlanEndTime)
      : startTime.add(1, "hour");
  }

  return {
    id: generatedId,
    group: machineGroup,
    area,
    timeLineStatus: timeLineStatus,

    // 狀態信息，對應新的扁平化結構
    status: {
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
      reason: apiData.machineStatusReason || "",
      product: apiData.machineStatusProduct || apiData.productName || "",
    },

    // 訂單信息，對應新的扁平化結構
    orderInfo: {
      scheduledStartTime: dayjs(
        apiData.planOnMachineDate || startTime
      ).toDate(),
      scheduledEndTime: dayjs(apiData.planFinishDate || endTime).toDate(),
      actualStartTime: apiData.actualOnMachineDate
        ? dayjs(apiData.actualOnMachineDate).toDate()
        : null,
      actualEndTime: apiData.actualFinishDate
        ? dayjs(apiData.actualFinishDate).toDate()
        : null,
      productId: apiData.productSN || "",
      productName: apiData.productName || "",
      quantity: parseInt(apiData.workOrderQuantity) || 0,
      completedQty: parseInt(apiData.productionQuantity) || 0,
      process: apiData.processName || "",
      orderStatus: apiData.productionScheduleStatus || "",
    },

    className: getStatusClass(apiData.timeLineStatus),
    content:
      apiData.productName ||
      apiData.machineStatusProduct ||
      apiData.timeLineStatus,

    // 保存原始 API 資料的參考，用於除錯
    _originalApiData: apiData,
  };
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

  // 驗證 API 資料的完整性
  validateApiItemCompleteness(apiData, isTest);

  return apiData;
};

/**
 * @function transformUpdateStatusToApi
 * @description 將內部格式的更新狀態轉換為 API 格式，並驗證狀態轉換是否合法
 * @param {Object} internalData - 內部結構的更新資料
 * @param {Object} originalData - 原始內部結構資料
 * @param {boolean} isTest - 是否為測試模式，測試模式下跳過某些驗證
 * @returns {Object} API 格式的資料
 */
export const transformUpdateStatusToApi = (
  internalData,
  originalData,
  isTest = false
) => {
  // 驗證狀態轉換是否合法
  if (!isTest) {
    validateApiStatusTransition(internalData, originalData);
  }

  const apiData = transformInternalToApiFormat(
    internalData,
    originalData,
    isTest
  );

  // 驗證 API 資料的完整性
  validateApiItemCompleteness(apiData, isTest);

  return apiData;
};

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
  console.log(
    "🚀 ~ transformInternalToApiFormat ~ internalData:",
    internalData
  );
  if (!internalData) return null;

  // 前置式檢查，確保關鍵欄位存在
  if (
    !internalData.start &&
    !internalData.status?.startTime &&
    !internalData.orderInfo?.scheduledStartTime
  ) {
    console.warn("transformInternalToApiFormat: 缺少開始時間信息，嘗試修復");
    internalData.start = new Date();
  }

  if (!internalData.group) {
    console.warn("transformInternalToApiFormat: 缺少機台信息，嘗試修復");
    internalData.group = originalData?.group || "A-1"; // 預設使用 A-1
  }

  // 檢查資料中是否包含 timeLineStatus，若沒有則嘗試判斷
  let timeLineStatus = internalData.timeLineStatus;
  if (!timeLineStatus) {
    // 嘗試從資料結構判斷類型
    if (
      internalData.orderInfo?.productName &&
      internalData.orderInfo?.process
    ) {
      timeLineStatus = "製令單";
    } else if (internalData.status?.reason === "機台故障") {
      timeLineStatus = "機台停機";
    } else if (internalData.status?.product) {
      timeLineStatus = "產品試模";
    } else if (internalData.status) {
      timeLineStatus = "待機中";
    } else {
      console.warn("無法確定 timeLineStatus，預設使用「待機中」");
      timeLineStatus = "待機中";
    }
  }

  const isWorkOrder =
    timeLineStatus === "製令單" || timeLineStatus === "製令單";

  // 如果有原始資料，驗證狀態轉換是否合法
  if (originalData && !isTest) {
    validateApiStatusTransition(internalData, originalData);
  }

  // 處理時間字段
  const startTime =
    internalData.start ||
    internalData.status?.startTime ||
    internalData.orderInfo?.scheduledStartTime;
  const endTime =
    internalData.end ||
    internalData.status?.endTime ||
    internalData.orderInfo?.scheduledEndTime;

  // 創建基本 API 結構 - 對應新的扁平化結構
  const apiData = {
    timeLineStatus: isWorkOrder ? "製令單" : timeLineStatus,
    productionArea: internalData.area,
    machineSN: internalData.group,

    // 初始化所有字段為null
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

  if (isWorkOrder) {
    // 製令單資料
    apiData.productionScheduleId = internalData.id;
    apiData.planOnMachineDate = internalData.orderInfo?.scheduledStartTime
      ? dayjs(internalData.orderInfo.scheduledStartTime).format()
      : dayjs(startTime).format();
    apiData.planFinishDate = internalData.orderInfo?.scheduledEndTime
      ? dayjs(internalData.orderInfo.scheduledEndTime).format()
      : dayjs(endTime).format();
    apiData.actualOnMachineDate = internalData.orderInfo?.actualStartTime
      ? dayjs(internalData.orderInfo.actualStartTime).format()
      : null;
    apiData.actualFinishDate = internalData.orderInfo?.actualEndTime
      ? dayjs(internalData.orderInfo.actualEndTime).format()
      : null;
    apiData.productSN = internalData.orderInfo?.productId || "";
    apiData.productName = internalData.orderInfo?.productName || "";
    apiData.workOrderQuantity = internalData.orderInfo?.quantity
      ? internalData.orderInfo.quantity.toString()
      : "0";
    apiData.productionQuantity = internalData.orderInfo?.completedQty
      ? internalData.orderInfo.completedQty.toString()
      : "0";
    apiData.processName = internalData.orderInfo?.process || "";
    apiData.productionScheduleStatus =
      internalData.orderInfo?.orderStatus || "";
  } else {
    // 機台狀態資料
    apiData.machineStatusId = internalData.id;
    apiData.machineStatusPlanStartTime = internalData.status?.startTime
      ? dayjs(internalData.status.startTime).format()
      : dayjs(startTime).format();
    apiData.machineStatusPlanEndTime = internalData.status?.endTime
      ? dayjs(internalData.status.endTime).format()
      : dayjs(endTime).format();
    apiData.machineStatusActualStartTime = internalData.status?.startTime
      ? dayjs(internalData.status.startTime).format()
      : dayjs(startTime).format();
    apiData.machineStatusActualEndTime = internalData.status?.endTime
      ? dayjs(internalData.status.endTime).format()
      : dayjs(endTime).format();
    apiData.machineStatusReason = internalData.status?.reason || null;
    apiData.machineStatusProduct = internalData.status?.product || null;
  }

  // 驗證 API 資料的完整性
  validateApiItemCompleteness(apiData, isTest);

  return apiData;
};

// 測試轉換功能
export const testTransformer = (apiData) => {
  try {
    if (!apiData) {
      console.warn("測試轉換: 沒有提供有效的 API 數據");
      return null;
    }

    const internalFormat = transformApiToInternalFormat(apiData);

    // 測試模式，跳過某些驗證
    const backToApi = transformInternalToApiFormat(internalFormat, null, true);

    // 測試更詳細的日誌
    // console.log("原始 API 資料:", apiData);
    // console.log("轉換為內部格式:", internalFormat);
    // console.log("轉回 API 格式:", backToApi);

    return { internalFormat, backToApi };
  } catch (error) {
    console.error("測試轉換出錯:", error);
    return null;
  }
};
