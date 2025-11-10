/**
 * @file orderItems.js
 * @description 處理訂單和排程數據的函數
 * @version 3.2.0 - 優化 mapItemToVisDataFormat，應用 Push Ifs Up 原則
 */

import dayjs from "dayjs";
import { transformApiToInternalFormat } from "../../../utils/schedule/transformers/apiTransformers";

//! =============== 1. 常量定義 ===============
const DEFAULT_DURATION_HOURS = 2;

//! =============== 2. 輔助函數 ===============

/**
 * @function isWorkOrder
 * @description 判斷是否為製令單
 * @param {Object} item - 項目數據
 * @returns {boolean}
 */
function isWorkOrder(item) {
  return item.timeLineStatus === "製令單";
}

/**
 * @function isPastWorkOrder
 * @description 判斷製令單是否為過去項目（基於計劃時間）
 * @param {Object} orderInfo - 訂單信息
 * @returns {boolean}
 */
function isPastWorkOrder(orderInfo) {
  if (!orderInfo) return false;

  const now = new Date();
  // 修改為基於計劃時間判斷，但保留實際時間作為輔助判斷
  return (
    (orderInfo.actualStartTime && new Date(orderInfo.actualStartTime) < now) ||
    (orderInfo.scheduledStartTime &&
      new Date(orderInfo.scheduledStartTime) < now)
  );
}

/**
 * @function isPastMachineStatus
 * @description 判斷機台狀態是否為過去項目
 * @param {Object} status - 狀態信息
 * @returns {boolean}
 */
function isPastMachineStatus(status) {
  return status?.startTime && new Date(status.startTime) < new Date();
}

/**
 * @function getWorkOrderTimes
 * @description 獲取製令單的時間（統一使用計劃時間）
 * @param {Object} orderInfo - 訂單信息
 * @param {Object} fallback - 備用時間
 * @returns {Object} { startDate, endDate }
 */
function getWorkOrderTimes(orderInfo, fallback) {
  // 修改為統一使用計劃時間 (配合 apiTransformers 的修改)
  const startDate =
    orderInfo.actualStartTime || orderInfo.planStartTime || fallback.start;

  const endDate =
    orderInfo.actualEndTime || orderInfo.planEndTime || fallback.end;

  return { startDate, endDate };
}

/**
 * @function getMachineStatusTimes
 * @description 獲取機台狀態的時間
 * @param {Object} status - 狀態信息
 * @param {Object} fallback - 備用時間
 * @returns {Object} { startDate, endDate }
 */
function getMachineStatusTimes(status, fallback) {
  const startDate = status.startTime || fallback.start;
  const endDate =
    status.endTime ||
    (status.startTime &&
      dayjs(status.startTime).add(DEFAULT_DURATION_HOURS, "hour").toDate()) ||
    fallback.end;

  return { startDate, endDate };
}

/**
 * @function getFallbackTimes
 * @description 獲取備用時間
 * @param {Object} item - 項目數據
 * @returns {Object} { startDate, endDate }
 */
function getFallbackTimes(item) {
  const startDate = item.start;
  const endDate =
    item.end || dayjs(item.start).add(DEFAULT_DURATION_HOURS, "hour").toDate();
  return { startDate, endDate };
}

//! =============== 3. 主要處理函數 ===============

/**
 * @function processWorkOrderItem
 * @description 處理製令單項目
 * @param {Object} item - 製令單項目
 * @returns {Object} 處理後的項目
 */
function processWorkOrderItem(item) {
  const isPast = isPastWorkOrder(item.orderInfo);
  const fallback = getFallbackTimes(item);
  const { startDate, endDate } = item.orderInfo
    ? getWorkOrderTimes(item.orderInfo, fallback)
    : fallback;

  if (item?.orderInfo?.orderStatus === "Done") {
  }

  return {
    ...item,
    start: startDate,
    end: endDate,
    editable: isPast
      ? { updateTime: false, updateGroup: false, remove: false }
      : { updateTime: true, updateGroup: true, remove: false },
  };
}

/**
 * @function processMachineStatusItem
 * @description 處理機台狀態項目
 * @param {Object} item - 機台狀態項目
 * @returns {Object} 處理後的項目
 */
function processMachineStatusItem(item) {
  const isPast = isPastMachineStatus(item.status);
  const fallback = getFallbackTimes(item);
  const { startDate, endDate } = item.status
    ? getMachineStatusTimes(item.status, fallback)
    : fallback;

  return {
    ...item,
    start: dayjs(startDate).toDate(),
    end: dayjs(endDate).toDate(),
    editable: isPast
      ? { updateTime: false, updateGroup: false, remove: false }
      : { updateTime: false, updateGroup: true, remove: true },
  };
}

/**
 * @function mapItemToVisDataFormat
 * @description 將項目映射到 vis-data 格式 - 重構版本
 * @param {Object} item - 原始項目數據
 * @returns {Object} vis-data 格式的項目
 */
export const mapItemToVisDataFormat = (item) => {
  // ✨ Push Ifs Up - 在頂層進行類型判斷和路由
  if (isWorkOrder(item)) {
    return processWorkOrderItem(item);
  } else {
    return processMachineStatusItem(item);
  }
};

/**
 * @function transformScheduleData
 * @description 將 API 獲取的排程數據轉換為時間線項目格式
 * @param {Array} scheduleList - API 獲取的排程數據
 * @returns {Array} 轉換後的時間線項目格式數據
 */
export const transformScheduleData = (scheduleList) => {
  if (!Array.isArray(scheduleList)) return [];

  try {
    const transformedItems = scheduleList.map((schedule) => {
      // 使用新的轉換函數將 API 資料轉為內部格式
      const item = transformApiToInternalFormat(schedule);

      // 映射到 vis-data 格式
      return mapItemToVisDataFormat(item);
    });

    return transformedItems;
  } catch (error) {
    console.error("轉換排程數據時出錯:", error);
    return [];
  }
};
