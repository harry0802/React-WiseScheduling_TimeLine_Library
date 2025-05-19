/**
 * @file statusHelpers.js
 * @description 機台狀態管理相關的輔助函數
 * @version 2.0.0
 */

import {
  MACHINE_STATUS,
  canTransitTo,
} from "../../configs/validations/schedule/constants";
import {
  createStateTransitionError
} from "./errorHandler";
import dayjs from "dayjs";

//! =============== 1. 狀態識別輔助函數 ===============
//* 用於識別和處理不同類型的狀態項目

/**
 * @function isOrderType
 * @description 判斷項目是否為製令單類型
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
 * @function isOrderOnGoing
 * @description 判斷項目是否為on-going狀態
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
 * @function getItemState
 * @description 獲取項目的當前狀態信息
 * @param {Object} item - 排程項目
 * @returns {Object} 包含狀態、類型和進度信息的對象
 */
export const getItemState = (item) => {
  if (!item) return { type: 'unknown', status: '', progress: 0 };
  
  // 檢查是否為製令單
  const isOrder = isOrderType(item);
  
  // 獲取基本狀態
  const status = item.timeLineStatus || '';
  
  // 獲取進度
  let progress = 0;
  if (isOrder && item.orderInfo) {
    // 計算製令單進度
    const quantity = Number(item.orderInfo.quantity) || 0;
    const completed = Number(item.orderInfo.completedQty) || 0;
    progress = quantity > 0 ? Math.min(Math.round((completed / quantity) * 100), 100) : 0;
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
      progress = total > 0 ? Math.min(Math.round((elapsed / total) * 100), 100) : 0;
    }
  }
  
  return {
    type: isOrder ? 'order' : 'status',
    status,
    progress,
    isOnGoing: isOrderOnGoing(item)
  };
};

//! =============== 2. 狀態驗證輔助函數 ===============
//* 提供狀態驗證和錯誤處理功能

/**
 * @function validateStatusTransition
 * @description 狀態轉換驗證
 * @param {string} currentStatus - 當前狀態
 * @param {string} newStatus - 新狀態
 * @param {Object} item - 原始項目資料
 * @param {string} mode - 當前模式 (view, edit, add)
 * @param {boolean} isDataOnlyEdit - 是否僅數據編輯而非狀態變更
 * @throws {StateTransitionError} 狀態轉換不合法時拋出錯誤
 */
export const validateStatusTransition = (
  currentStatus, 
  newStatus, 
  item, 
  mode = "edit", 
  isDataOnlyEdit = false
) => {
  // 如果只是數據編輯而沒有狀態變更，跳過驗證
  if (isDataOnlyEdit && currentStatus === newStatus) {
    return; // 允許純數據編輯，不進行狀態轉換驗證
  }

  // 如果是同樣的狀態而且不是add模式，不允許切換
  if (currentStatus === newStatus && mode !== "add") {
    throw createStateTransitionError(`已經是「${currentStatus}」狀態，無需切換`, {
      currentStatus,
      newStatus,
      mode,
      itemId: item?.id
    });
  }

  // 如果當前狀態是製令單，不允許切換
  if (currentStatus === MACHINE_STATUS.ORDER_CREATED) {
    throw createStateTransitionError("製令單狀態不能被切換", {
      currentStatus,
      newStatus,
      mode,
      itemId: item?.id
    });
  }

  // 檢查實際的item狀態，而不僅僅是前端狀態
  const actualStatus = item?.timeLineStatus || currentStatus;

  // 如果不是add模式且實際狀態是非待機，只能切換到待機
  if (
    mode !== "add" && 
    actualStatus !== MACHINE_STATUS.IDLE &&
    newStatus !== MACHINE_STATUS.IDLE &&
    !isDataOnlyEdit // 如果是純數據編輯，不進行這項檢查
  ) {
    throw createStateTransitionError("從非待機狀態只能切換回待機狀態", {
      currentStatus: actualStatus,
      newStatus,
      mode,
      itemId: item?.id
    });
  }

  // 使用已有的canTransitTo函數再次確認，但在add模式或純數據編輯中不做這個檢查
  if (mode !== "add" && !isDataOnlyEdit && !canTransitTo(actualStatus, newStatus)) {
    throw createStateTransitionError(
      `無法從「${actualStatus}」切換到「${newStatus}」狀態`, 
      {
        currentStatus: actualStatus,
        newStatus,
        mode,
        itemId: item?.id
      }
    );
  }
};

/**
 * @function checkTimeOverlap
 * @description 檢查表單項目的時間重疊
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
    
    // 如果沒有結束時間，視為現在時間 + 2小時
    const effectiveEnd = itemEnd.isValid() ? 
      itemEnd : 
      dayjs().add(2, 'hour');

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
        const existingEnd = dayjs(existingItem.end) || existingStart.add(2, 'hour');

        return (
          (itemStart.isBefore(existingEnd) && effectiveEnd.isAfter(existingStart)) ||
          itemStart.isSame(existingStart) ||
          effectiveEnd.isSame(existingEnd)
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
          const existingEnd = dayjs(existingItem.end) || existingStart.add(2, 'hour');

          return (
            (itemStart.isBefore(existingEnd) &&
              effectiveEnd.isAfter(existingStart)) ||
            itemStart.isSame(existingStart) ||
            effectiveEnd.isSame(existingEnd)
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

//! =============== 3. UI 渲染輔助函數 ===============
//* 用於處理 UI 渲染相關邏輯

/**
 * @function isFormDisabled
 * @description 判斷表單是否應該被禁用
 * @param {string} mode - 當前模式 (view, edit, add)
 * @param {boolean} isSubmitting - 是否正在提交
 * @param {Object} item - 項目數據
 * @returns {boolean} 是否禁用表單
 */
export const isFormDisabled = (mode, isSubmitting, item) => {
  // 查看模式或正在提交時禁用表單
  if (mode === "view" || isSubmitting) {
    return true;
  }
  
  // 空項目時不禁用（可能是新建項目）
  if (!item) {
    return false;
  }
  
  // 檢查項目已完成/進行中狀態
  return (
    mode !== "add" &&
    // 有實際結束時間就禁用
    ((item.machineStatusActualEndTime !== null &&
      item.machineStatusActualEndTime !== undefined) ||
      // 訂單狀態是 "On-going" 也禁用
      item.productionScheduleStatus === "On-going" ||
      (item.orderInfo &&
        item.orderInfo.orderStatus?.toLowerCase() === "on-going"))
  );
};

/**
 * @function getDialogTitle
 * @description 獲取對話框標題
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

/**
 * @function getStatusDisplayInfo
 * @description 獲取狀態顯示信息，包括顏色、圖標、標籤等
 * @param {string} status - 狀態代碼
 * @returns {Object} 狀態顯示信息
 */
export const getStatusDisplayInfo = (status) => {
  const statusMap = {
    [MACHINE_STATUS.ORDER_CREATED]: {
      color: 'primary',
      icon: 'schedule',
      label: '製令單',
      severity: 'info',
      description: '已規劃製令單'
    },
    [MACHINE_STATUS.IDLE]: {
      color: 'default',
      icon: 'hourglass_empty',
      label: '待機中',
      severity: 'default',
      description: '機台空閒中'
    },
    [MACHINE_STATUS.SETUP]: {
      color: 'warning',
      icon: 'build',
      label: '上模與調機',
      severity: 'warning',
      description: '機台設置中'
    },
    [MACHINE_STATUS.TESTING]: {
      color: 'info',
      icon: 'science',
      label: '產品試模',
      severity: 'info',
      description: '產品測試中'
    },
    [MACHINE_STATUS.STOPPED]: {
      color: 'error',
      icon: 'error',
      label: '機台停機',
      severity: 'error',
      description: '機台已停機'
    }
  };
  
  // 返回狀態信息或默認值
  return statusMap[status] || {
    color: 'default',
    icon: 'help',
    label: status || '未知狀態',
    severity: 'default',
    description: '未定義狀態'
  };
};

/**
 * @function formatDuration
 * @description 格式化時間間隔為易讀字符串
 * @param {Object} start - 開始時間，dayjs 對象
 * @param {Object} end - 結束時間，dayjs 對象
 * @returns {string} 格式化後的時間間隔
 */
export const formatDuration = (start, end) => {
  if (!start || !end) return '';
  
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  
  if (!startTime.isValid() || !endTime.isValid()) return '';
  
  const diff = endTime.diff(startTime, 'minute');
  
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
