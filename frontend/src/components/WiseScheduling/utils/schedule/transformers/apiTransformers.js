/**
 * @file apiTransformers.js
 * @description API 資料與內部資料格式互相轉換的工具函數
 * @version 1.1.0 - 更新於 2025-05-16，添加狀態驗證
 * @author Claude / Harry
 */

import dayjs from "dayjs";
import { getStatusClass } from "../../../configs/validations/schedule/constants";
import {
  validateApiStatusTransition,
  validateApiItemCompleteness,
} from "../apiValidators";

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
  const itemId = isWorkOrder
    ? apiData.productionScheduleId
    : apiData.machineStatusId;

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
      : startTime.add(2, "hour");
  } else {
    // 機台狀態時間處理
    startTime = dayjs(apiData.machineStatusActualStartTime);
    endTime = apiData.machineStatusActualEndTime
      ? dayjs(apiData.machineStatusActualEndTime)
      : dayjs(apiData.machineStatusPlanEndTime) || startTime.add(2, "hour");
  }

  return {
    id:
      itemId ||
      `API-SCHEDULE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    group: machineGroup,
    area,
    timeLineStatus: timeLineStatus, // 使用更新後的狀態名稱

    status: {
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
      reason: apiData.machineStatusReason || "",
      product: apiData.machineStatusProduct || apiData.productName || "",
    },

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
  if (!internalData.start || !internalData.group) {
    console.warn("transformInternalToApiFormat: 缺少關鍵信息，嘗試修復");

    // 修復缺失的開始時間
    if (!internalData.start) {
      // 嘗試從所有可能的位置加載開始時間
      internalData.start =
        internalData.status?.startTime ||
        internalData.orderInfo?.scheduledStartTime ||
        new Date(); // 最後才使用當前時間
    }

    // 修復缺失的機台組
    if (!internalData.group) {
      internalData.group = originalData?.group || "A-1"; // 預設使用 A-1
    }
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

  // 創建基本 API 結構
  const apiData = {
    timeLineStatus: isWorkOrder ? "製令單" : timeLineStatus, // 確保使用「製令單」而非「製令單」
    productionArea: internalData.area,
    machineSN: internalData.group,
    group: internalData.group, // 確保 group 和 machineSN 都設置為相同的值
    start: internalData.start ? dayjs(internalData.start).format() : null, // 增加直接的 start 欄位
  };

  if (isWorkOrder) {
    // 製令單資料
    Object.assign(apiData, {
      machineStatusId: null,
      machineStatusPlanStartTime: null,
      machineStatusPlanEndTime: null,
      machineStatusActualStartTime: null,
      machineStatusActualEndTime: null,
      machineStatusReason: null,
      machineStatusProduct: null,

      // 特定製令單欄位
      productionScheduleId: internalData.id,
      planOnMachineDate: internalData.orderInfo.scheduledStartTime
        ? dayjs(internalData.orderInfo.scheduledStartTime).format()
        : dayjs().format(), // 確保有值
      planFinishDate: internalData.orderInfo.scheduledEndTime
        ? dayjs(internalData.orderInfo.scheduledEndTime).format()
        : null,
      actualOnMachineDate: internalData.orderInfo.actualStartTime
        ? dayjs(internalData.orderInfo.actualStartTime).format()
        : dayjs().format(), // 確保有值
      actualFinishDate: internalData.orderInfo.actualEndTime
        ? dayjs(internalData.orderInfo.actualEndTime).format()
        : null,
      productSN: internalData.orderInfo.productId || "",
      productName: internalData.orderInfo.productName || "",
      workOrderQuantity: internalData.orderInfo.quantity
        ? internalData.orderInfo.quantity.toString()
        : "0",
      productionQuantity: internalData.orderInfo.completedQty
        ? internalData.orderInfo.completedQty.toString()
        : null,
      processName: internalData.orderInfo.process || "",
      productionScheduleStatus: internalData.orderInfo.orderStatus || "",
    });
  } else {
    // 機台狀態資料
    Object.assign(apiData, {
      machineStatusId: internalData.id,
      machineStatusPlanStartTime: internalData.status.startTime
        ? dayjs(internalData.status.startTime).format()
        : dayjs().format(), // 確保有值
      machineStatusPlanEndTime: internalData.status.endTime
        ? dayjs(internalData.status.endTime).format()
        : null,
      machineStatusActualStartTime: internalData.status.startTime
        ? dayjs(internalData.status.startTime).format()
        : dayjs().format(), // 確保有值
      machineStatusActualEndTime: internalData.status.endTime
        ? dayjs(internalData.status.endTime).format()
        : null,
      machineStatusReason: internalData.status.reason || null,
      machineStatusProduct: internalData.status.product || null,

      // 清空製令單相關欄位
      productionScheduleId: null,
      planOnMachineDate: null,
      planFinishDate: null,
      actualOnMachineDate: null,
      actualFinishDate: null,
      productSN: null,
      productName: null,
      workOrderQuantity: null,
      productionQuantity: null,
      processName: null,
      productionScheduleStatus: null,
    });
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
