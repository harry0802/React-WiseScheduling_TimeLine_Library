//! =============== 1. 設定與常量 ===============
import dayjs from "dayjs";
import { formatToFormDateTime, formatToVisDateTime } from "./dateUtils";
import { transformInternalToApiFormat } from "./transformers/apiTransformers";

//! =============== 2. 工具函數 ===============
/**
 * @function initializeFormData
 * @description 將項目數據轉換為表單數據
 * @param {Object} item - 項目數據
 * @returns {Object} 表單數據
 */
const initializeFormData = (item) => {
  if (!item) return {};

  // 確保必要的屬性存在
  const safeItem = {
    ...item,
    orderInfo: item.orderInfo || {},
    status: item.status || {},
  };

  // 預設表單時間
  let defaultStartTime, defaultEndTime;

  if (safeItem.timeLineStatus === "製令單") {
    defaultStartTime = safeItem.orderInfo.scheduledStartTime || new Date();
    defaultEndTime =
      safeItem.orderInfo.scheduledEndTime ||
      dayjs(defaultStartTime).add(2, "hour").toDate();
  } else {
    defaultStartTime = safeItem.status.startTime || new Date();
    defaultEndTime =
      safeItem.status.endTime ||
      dayjs(defaultStartTime).add(2, "hour").toDate();
  }

  return {
    id: safeItem.id || "",
    group: safeItem.group || "",
    timeLineStatus: safeItem.timeLineStatus || "",
    content: safeItem.content || "",
    start: formatToFormDateTime(defaultStartTime),
    end: formatToFormDateTime(defaultEndTime),
    productId: safeItem.orderInfo?.productId || "",
    productName: safeItem.orderInfo?.productName || "",
    quantity: safeItem.orderInfo?.quantity || 0,
    completedQty: safeItem.orderInfo?.completedQty || 0,
    process: safeItem.orderInfo?.process || "",
    orderStatus: safeItem.orderInfo?.orderStatus || "",
    reason: safeItem.status?.reason || "",
    product: safeItem.status?.product || "",
    planStartDate: safeItem.planStartDate || null,
    planEndDate: safeItem.planEndDate || null,
    actualStartDate: safeItem.actualStartDate || null,
    actualEndDate: safeItem.actualEndDate || null,
  };
};

/**
 * @function calculateEndTime
 * @description 根據開始時間計算預計結束時間
 * @param {string} startTimeStr - 開始時間字符串
 * @returns {string} 計算的結束時間
 */
const calculateEndTime = (startTimeStr) => {
  if (!startTimeStr) return dayjs().add(2, "hour").format("YYYY-MM-DDTHH:mm");

  const startTime = dayjs(startTimeStr);
  if (!startTime.isValid())
    return dayjs().add(2, "hour").format("YYYY-MM-DDTHH:mm");

  return startTime.add(2, "hour").format("YYYY-MM-DDTHH:mm");
};

/**
 * @function createUpdatedItem
 * @description 根據表單數據創建更新的項目數據
 * @param {Object} formData - 表單數據
 * @param {Object} originalItem - 原始項目數據
 * @returns {Object} 更新的項目數據，同時包含內部格式和 API 格式
 */
const createUpdatedItem = (formData, originalItem) => {
  if (!originalItem) return null;

  // 清理輸入數據
  const safeOriginal = {
    ...originalItem,
    orderInfo: originalItem.orderInfo || {},
    status: originalItem.status || {},
  };

  // 處理表單日期轉換
  const startDate = dayjs(formData.start).toDate();
  const endDate = dayjs(formData.end).toDate();

  // 根據表單類型構建內部格式物件
  let updatedInternalItem;

  if (safeOriginal.timeLineStatus === "製令單") {
    // 更新製令單
    updatedInternalItem = {
      ...safeOriginal,
      group: formData.group,
      orderInfo: {
        ...safeOriginal.orderInfo,
        scheduledStartTime: startDate,
        scheduledEndTime: endDate,
      },
    };
  } else {
    // 更新機台狀態項目
    updatedInternalItem = {
      ...safeOriginal,
      group: formData.group,
      status: {
        ...safeOriginal.status,
        startTime: startDate,
        endTime: endDate,
        reason: formData.reason,
        product: formData.product,
      },
      planStartDate: formData.planStartDate || null,
      planEndDate: formData.planEndDate || null,
      actualStartDate: formData.actualStartDate || null,
      actualEndDate: formData.actualEndDate || null,
    };
  }

  // 轉換為 API 格式供提交使用
  const apiFormat = transformInternalToApiFormat(updatedInternalItem);

  // 返回包含內部格式和 API 格式的對象
  return {
    internal: updatedInternalItem,
    api: apiFormat,
  };
};

export const formUtils = {
  initializeFormData,
  calculateEndTime,
  createUpdatedItem,
};
