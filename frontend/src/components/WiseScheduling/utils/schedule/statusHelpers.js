/**
 * @file statusHelpers.js
 * @description 機台狀態管理相關的輔助函數
 * @version 1.0.0
 */

import {
  MACHINE_STATUS,
  canTransitTo,
} from "../../configs/validations/schedule/constants";
import { StatusError } from "./errorHandler";
import dayjs from "dayjs";

/**
 * 判斷項目是否為製令單類型
 * @param {Object} item - 排程項目
 * @returns {boolean} 是否為製令單類型
 */
export const isOrderType = (item) => {
  if (!item || !item.timeLineStatus) {
    return false;
  }
  return item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;
};

/**
 * 判斷項目是否為on-going狀態
 * @param {Object} item - 排程項目
 * @returns {boolean} 是否為on-going狀態
 */
export const isOrderOnGoing = (item) => {
  if (!item || !item.orderInfo || !item.orderInfo.orderStatus) {
    return false;
  }
  // 轉換為純文字小寫並去除前後空格進行比對
  const status = item.orderInfo.orderStatus.toLowerCase().trim();
  return status === "on-going";
};

/**
 * 狀態轉換驗證
 * @param {string} currentStatus - 當前狀態
 * @param {string} newStatus - 新狀態
 * @param {Object} item - 原始項目資料
 * @param {string} mode - 當前模式 (view, edit, add)
 * @throws {StatusError} 狀態轉換不合法時拋出錯誤
 */
export const validateStatusTransition = (currentStatus, newStatus, item, mode = "edit") => {
  // 如果是同樣的狀態而且不是add模式，不允許切換
  if (currentStatus === newStatus && mode !== "add") {
    throw new StatusError(`已經是「${currentStatus}」狀態，無需切換`);
  }

  // 如果當前狀態是製令單，不允許切換
  if (currentStatus === MACHINE_STATUS.ORDER_CREATED) {
    throw new StatusError("製令單狀態不能被切換");
  }

  // 檢查實際的item狀態，而不僅僅是前端狀態
  const actualStatus = item?.timeLineStatus || currentStatus;

  // 如果不是add模式且實際狀態是非待機，只能切換到待機
  if (
    mode !== "add" && 
    actualStatus !== MACHINE_STATUS.IDLE &&
    newStatus !== MACHINE_STATUS.IDLE
  ) {
    throw new StatusError("從非待機狀態只能切換回待機狀態");
  }

  // 使用已有的canTransitTo函數再次確認，但在add模式中不做這個檢查
  if (mode !== "add" && !canTransitTo(actualStatus, newStatus)) {
    throw new StatusError(
      `無法從「${actualStatus}」切換到「${newStatus}」狀態`
    );
  }
};

/**
 * 檢查表單項目的時間重疊
 * @param {Object} updatedItem - 更新後的項目
 * @param {Array|Object} groups - 時間軸組別數據
 * @returns {boolean} 是否有時間重疊
 * @throws {Error} 當發現時間重疊時拋出錯誤
 */
export const checkTimeOverlap = (updatedItem, groups) => {
  const isWorkOrder =
    updatedItem.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;

  // 如果是製令單類型，不檢查時間重疊
  if (isWorkOrder) {
    return false;
  }

  try {
    let hasOverlap = false;
    const itemStart = dayjs(updatedItem.start);
    const itemEnd = dayjs(updatedItem.end);

    // 首先，如果有全局數據存取方式，則使用它
    if (window.timeline && window.app && window.app.timelineData) {
      // 使用 DataSet API 取得符合條件的項目
      const existingItems = window.app.timelineData.get({
        filter: function (item) {
          return (
            item.id !== updatedItem.id &&
            item.group === updatedItem.group &&
            item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
          );
        },
      });

      hasOverlap = existingItems.some((existingItem) => {
        const existingStart = dayjs(existingItem.start);
        const existingEnd = dayjs(existingItem.end);

        return (
          (itemStart.isBefore(existingEnd) && itemEnd.isAfter(existingStart)) ||
          itemStart.isSame(existingStart) ||
          itemEnd.isSame(existingEnd)
        );
      });
    } else {
      // 如果沒有全局數據，則使用傳入的 groups 參數
      const groupItems = [];

      if (groups && Array.isArray(groups)) {
        const currentGroup = groups.find((g) => g.id === updatedItem.group);

        if (currentGroup && currentGroup.items) {
          currentGroup.items
            .filter(
              (item) =>
                item.id !== updatedItem.id &&
                item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
            )
            .forEach((item) => groupItems.push(item));
        }

        hasOverlap = groupItems.some((existingItem) => {
          const existingStart = dayjs(existingItem.start);
          const existingEnd = dayjs(existingItem.end);

          return (
            (itemStart.isBefore(existingEnd) &&
              itemEnd.isAfter(existingStart)) ||
            itemStart.isSame(existingStart) ||
            itemEnd.isSame(existingEnd)
          );
        });
      }
    }

    if (hasOverlap) {
      throw new Error("時間重疊：除了「製令單」外的其他狀態都不允許時間重疊");
    }

    return false;
  } catch (err) {
    if (err.message.includes("時間重疊")) {
      throw err; // 重新拋出重疊錯誤
    }
    console.error("檢查時間重疊時發生錯誤，繼續執行:", err);
    return false;
  }
};

/**
 * 判斷表單是否應該被禁用
 * @param {string} mode - 當前模式 (view, edit, add)
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {Object} item - 項目數據
 * @returns {boolean} 是否禁用表單
 */
export const isFormDisabled = (mode, isSubmitting, item) => {
  return (
    mode === "view" ||
    isSubmitting ||
    (mode !== "add" &&
      // 有實際結束時間就禁用
      ((item.machineStatusActualEndTime !== null &&
        item.machineStatusActualEndTime !== undefined) ||
        // 訂單狀態是 "On-going" 也禁用
        item.productionScheduleStatus === "On-going" ||
        (item.orderInfo &&
          item.orderInfo.orderStatus?.toLowerCase() === "on-going")))
  );
};

/**
 * 獲取對話框標題
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {string} mode - 當前模式 (view, edit, add)
 * @returns {string} 對話框標題
 */
export const getDialogTitle = (isSubmitting, mode) => {
  if (isSubmitting) return "處理中...";
  switch (mode) {
    case "add":
      return "新增狀態";
    case "edit":
      return "編輯狀態";
    default:
      return "檢視狀態";
  }
};
