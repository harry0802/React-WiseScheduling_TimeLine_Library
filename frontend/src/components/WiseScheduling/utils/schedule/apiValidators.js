/**
 * @file apiValidators.js
 * @description API請求層的驗證函數，確保數據符合業務規則
 * @version 1.0.0
 */

import { StatusError } from "./errorHandler";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import dayjs from "dayjs";

/**
 * 驗證要提交給API的狀態轉換是否合法
 * @param {Object} internalItem - 內部格式的項目數據
 * @param {Object} originalItem - 原始項目數據（如果有）
 * @throws {Error} 狀態轉換不合法時拋出錯誤
 */
export const validateApiStatusTransition = (
  internalItem,
  originalItem = null
) => {
  // 如果沒有原始項目，則視為新建項目
  if (!originalItem) {
    return; // 新建項目不需要驗證狀態轉換
  }

  const initialStatus = originalItem.timeLineStatus;
  const targetStatus = internalItem.timeLineStatus;

  // 如果沒有狀態變化，則直接通過
  if (initialStatus === targetStatus) {
    return;
  }

  // 如果原始狀態是製令單，不允許切換
  if (initialStatus === MACHINE_STATUS.ORDER_CREATED) {
    throw new Error("製令單狀態不能被切換");
  }

  // 如果不是待機狀態切換到其他狀態，那麼只能是非待機狀態切換到待機
  if (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus !== MACHINE_STATUS.IDLE
  ) {
    throw new Error("從非待機狀態只能切換回待機狀態");
  }

  // 從非待機狀態轉到待機狀態，確保有結束時間
  if (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus === MACHINE_STATUS.IDLE &&
    (!internalItem.end || !internalItem.status?.endTime)
  ) {
    throw new Error("從非待機狀態切換回待機狀態時，必須設置結束時間");
  }
};

/**
 * 驗證API項目的數據完整性
 * @param {Object} apiItem - 要發送到API的項目數據
 * @param {boolean} isTest - 是否為測試模式，測試模式下跳過某些驗證
 * @throws {Error} 數據不完整時拋出錯誤
 */
export const validateApiItemCompleteness = (apiItem, isTest = false) => {
  // 如果是測試模式，跳過驗證
  if (isTest) {
    return;
  }

  // 基本必填字段驗證
  if (!apiItem.group) {
    // 檢查是否有 machineSN 欄位，它是與 group 同等的
    if (apiItem.machineSN) {
      apiItem.group = apiItem.machineSN; // 使用 machineSN 作為備用
    } else {
      apiItem.group = "A-1"; // 最後才使用預設值
      console.warn("缺少機台組，使用預設值: A-1");
    }
  }

  if (!apiItem.start) {
    // 檢查其他可能的開始時間欄位
    if (apiItem.machineStatusPlanStartTime) {
      apiItem.start = apiItem.machineStatusPlanStartTime;
    } else if (apiItem.machineStatusActualStartTime) {
      apiItem.start = apiItem.machineStatusActualStartTime;
    } else if (apiItem.planOnMachineDate) {
      apiItem.start = apiItem.planOnMachineDate;
    } else {
      // 使用當前時間作為預設開始時間
      apiItem.start = dayjs().format();
      console.warn("缺少開始時間，使用當前時間作為預設值");
    }
  }

  // 根據狀態進行特定驗證
  switch (apiItem.timeLineStatus) {
    case MACHINE_STATUS.IDLE:
      // 待機狀態的特定驗證
      break;
    case MACHINE_STATUS.SETUP:
      // 上模與調機狀態的特定驗證
      break;
    case MACHINE_STATUS.TESTING:
      // 產品試模狀態的特定驗證
      if (!apiItem.status?.product) {
        throw new Error("產品試模狀態必須指定產品");
      }
      break;
    case MACHINE_STATUS.STOPPED:
      // 機台停機狀態的特定驗證
      if (!apiItem.status?.reason) {
        throw new Error("機台停機狀態必須指定原因");
      }
      break;
    case MACHINE_STATUS.ORDER_CREATED:
      // 製令單狀態的特定驗證
      if (!apiItem.orderInfo?.productName) {
        throw new Error("製令單必須指定產品名稱");
      }
      break;
    default:
      // 未知狀態
      throw new Error(`未知的狀態類型: ${apiItem.timeLineStatus}`);
  }
};
