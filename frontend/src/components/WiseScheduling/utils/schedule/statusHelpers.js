/**
 * @file statusHelpers.js
 * @description 機台狀態管理相關的輔助函數
 * @version 2.0.0
 */

import {
  MACHINE_STATUS,
  canTransitTo,
  isHistoricalData,
} from "../../configs/validations/schedule/constants";
import { createStateTransitionError } from "./errorHandler";
import {
  validateStatusTransition as coreValidateStatusTransition,
  validateTimeOverlap,
} from "./apiValidators";
import dayjs from "dayjs";

//! =============== 1. 基礎輔助判斷函數 ===============
//* 簡單的判斷和格式化函數，作為其他函數的基礎

/**
 * 判斷項目是否為製令單類型
 */
const isOrderType = (item) => {
  if (!item || !item.timeLineStatus) {
    return false;
  }
  return item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;
};

/**
 * 判斷項目是否為on-going狀態
 */
const isOrderOnGoing = (item) => {
  if (!item || !item.orderInfo || !item.orderInfo.orderStatus) {
    return false;
  }
  // 轉換為純文字小寫並去除前後空格進行比對
  const status = item.orderInfo.orderStatus.toLowerCase().trim();
  return status === "on-going";
};

/**
 * 格式化時間間隔為易讀字符串
 */
const formatDuration = (start, end) => {
  if (!start || !end) return "";

  const startTime = dayjs(start);
  const endTime = dayjs(end);

  if (!startTime.isValid() || !endTime.isValid()) return "";

  const diff = endTime.diff(startTime, "minute");

  if (diff < 60) {
    return `${diff} 分鐘`;
  } else if (diff < 24 * 60) {
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return minutes > 0 ? `${hours} 小時 ${minutes} 分鐘` : `${hours} 小時`;
  } else {
    const days = Math.floor(diff / (24 * 60));
    const hours = Math.floor((diff % (24 * 60)) / 60);
    return hours > 0 ? `${days} 天 ${hours} 小時` : `${days} 天`;
  }
};

//! =============== 2. 核心業務邏輯函數 ===============
//* 主要的業務邏輯處理函數，負責核心功能

/**
 * @function getItemState
 * @description 獲取項目的當前狀態信息
 * @param {Object} item - 排程項目
 * @returns {Object} 包含狀態、類型和進度信息的對象
 */
function getItemState(item) {
  if (!item) return { type: "unknown", status: "", progress: 0 };

  // 檢查是否為製令單
  const isOrder = isOrderType(item);

  // 獲取基本狀態
  const status = item.timeLineStatus || "";

  // 獲取進度
  let progress = 0;
  if (isOrder && item.orderInfo) {
    // 計算製令單進度
    const quantity = Number(item.orderInfo.quantity) || 0;
    const completed = Number(item.orderInfo.completedQty) || 0;
    progress =
      quantity > 0
        ? Math.min(Math.round((completed / quantity) * 100), 100)
        : 0;
  } else if (
    item.status &&
    item.status.startTime &&
    item.status.endTime &&
    dayjs(item.status.endTime).isValid()
  ) {
    // 計算狀態時間進度
    const start = dayjs(item.status.startTime);
    const end = dayjs(item.status.endTime);
    const now = dayjs();

    if (now.isAfter(end)) {
      progress = 100;
    } else if (now.isAfter(start)) {
      const total = end.diff(start);
      const elapsed = now.diff(start);
      progress =
        total > 0 ? Math.min(Math.round((elapsed / total) * 100), 100) : 0;
    }
  }

  return {
    type: isOrder ? "order" : "status",
    status,
    progress,
    isOnGoing: isOrderOnGoing(item),
  };
}

/**
 * @function validateStatusTransition
 * @description 狀態轉換驗證 - UI 層面的包裝
 * @param {string} currentStatus - 當前狀態
 * @param {string} newStatus - 新狀態
 * @param {Object} item - 原始項目資料
 * @param {string} mode - 當前模式 (view, edit, add)
 * @param {boolean} isDataOnlyEdit - 是否僅數據編輯而非狀態變更
 * @throws {StateTransitionError} 狀態轉換不合法時拋出錯誤
 */
function validateStatusTransition(
  currentStatus,
  newStatus,
  item,
  mode = "edit",
  isDataOnlyEdit = false
) {
  // 如果只是數據編輯而沒有狀態變更，跳過驗證
  if (isDataOnlyEdit && currentStatus === newStatus) {
    return;
  }

  // 如果是同樣的狀態而且不是add模式，不允許切換
  if (currentStatus === newStatus && mode !== "add") {
    throw createStateTransitionError(
      `已經是「${currentStatus}」狀態，無需切換`,
      {
        currentStatus,
        newStatus,
        mode,
        itemId: item?.id,
      }
    );
  }

  // 新建模式或純數據編輯時，跳過核心轉換驗證
  if (mode === "add" || isDataOnlyEdit) {
    return;
  }

  // 使用核心狀態轉換驗證邏輯
  try {
    const actualStatus = item?.timeLineStatus || currentStatus;
    coreValidateStatusTransition(actualStatus, newStatus, item);
  } catch (error) {
    // 重新包裝錯誤以符合 UI 層的需求
    throw createStateTransitionError(error.message, {
      currentStatus: item?.timeLineStatus || currentStatus,
      newStatus,
      mode,
      itemId: item?.id,
      originalError: error,
    });
  }

  // 額外的 canTransitTo 檢查（保留原有邏輯以確保兼容性）
  const actualStatus = item?.timeLineStatus || currentStatus;
  if (!canTransitTo(actualStatus, newStatus)) {
    throw createStateTransitionError(
      `無法從「${actualStatus}」切換到「${newStatus}」狀態`,
      {
        currentStatus: actualStatus,
        newStatus,
        mode,
        itemId: item?.id,
      }
    );
  }
}

/**
 * @function checkTimeOverlap
 * @description 檢查表單項目的時間重疊 - 向後兼容性包裝
 * @param {Object} updatedItem - 更新後的項目
 * @param {Array|Object} groups - 時間軸組別數據
 * @returns {boolean} 是否有時間重疊
 * @throws {Error} 當發現時間重疊時拋出錯誤
 */
function checkTimeOverlap(updatedItem, groups) {
  try {
    // 使用統一的時間重疊驗證邏輯
    validateTimeOverlap(updatedItem, groups);
    return false;
  } catch (error) {
    if (
      error.type === "VALIDATION_ERROR" &&
      error.message.includes("時間重疊")
    ) {
      // 將驗證錯誤轉換為原有的錯誤格式以保持兼容性
      throw new Error(error.message);
    }

    // 其他錯誤保持原有處理方式
    console.error("檢查時間重疊時發生錯誤，繼續執行:", error);
    return false;
  }
}

/**
 * @function getStatusDisplayInfo
 * @description 獲取狀態顯示信息，包括顏色、圖標、標籤等
 * @param {string} status - 狀態代碼
 * @returns {Object} 狀態顯示信息
 */
function getStatusDisplayInfo(status) {
  const statusMap = {
    [MACHINE_STATUS.ORDER_CREATED]: {
      color: "primary",
      icon: "schedule",
      label: "製令單",
      severity: "info",
      description: "已規劃製令單",
    },
    [MACHINE_STATUS.IDLE]: {
      color: "default",
      icon: "hourglass_empty",
      label: "待機中",
      severity: "default",
      description: "機台空閒中",
    },
    [MACHINE_STATUS.SETUP]: {
      color: "warning",
      icon: "build",
      label: "上模與調機",
      severity: "warning",
      description: "機台設置中",
    },
    [MACHINE_STATUS.TESTING]: {
      color: "info",
      icon: "science",
      label: "產品試模",
      severity: "info",
      description: "產品測試中",
    },
    [MACHINE_STATUS.STOPPED]: {
      color: "error",
      icon: "error",
      label: "機台停機",
      severity: "error",
      description: "機台已停機",
    },
  };

  // 返回狀態信息或默認值
  return (
    statusMap[status] || {
      color: "default",
      icon: "help",
      label: status || "未知狀態",
      severity: "default",
      description: "未定義狀態",
    }
  );
}

//! =============== 3. UI 輔助函數 ===============
//* 處理 UI 相關的輔助邏輯

/**
 * 判斷表單是否應該被禁用
 */
const isFormDisabled = (mode, isSubmitting, item) => {
  // 查看模式或正在提交時禁用表單
  if (mode === "view" || isSubmitting) {
    return true;
  }

  // 空項目時不禁用（可能是新建項目）
  if (!item) {
    return false;
  }

  // 🧠 核心邏輯：有實際時間的資料一律禁用編輯
  if (isHistoricalData(item)) {
    return true;
  }

  // 🧠 檢查訂單狀態 - 進行中的訂單也禁用，但暫停生產允許編輯
  return (
    mode !== "add" &&
    // 訂單狀態是 "On-going" 也禁用，但「暫停生產」除外
    (item.productionScheduleStatus === "On-going" ||
      (item.orderInfo &&
        item.orderInfo.orderStatus?.toLowerCase() === "on-going")) &&
    // 「暫停生產」狀態允許編輯
    item.orderInfo?.orderStatus !== "暫停生產"
  );
};

/**
 * 獲取對話框標題
 */
const getDialogTitle = (isSubmitting, mode) => {
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

//! =============== 4. 導出所有函數 ===============

export {
  // 基礎輔助函數
  isOrderType,
  isOrderOnGoing,
  formatDuration,

  // 核心業務邏輯函數
  getItemState,
  validateStatusTransition,
  checkTimeOverlap,
  getStatusDisplayInfo,

  // UI 輔助函數
  isFormDisabled,
  getDialogTitle,
};
