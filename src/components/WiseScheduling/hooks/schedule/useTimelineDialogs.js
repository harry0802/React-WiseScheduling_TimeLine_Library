/**
 * @file useTimelineDialogs.js
 * @description 與對話框管理器集成的 hook - 認知負荷優化版本
 * @version 4.0.0 - 2025-05-29 應用認知負荷控制和註解規範
 * @author 資深 JavaScript 程式碼管理專家
 */

import { useEffect, useCallback } from "react";
import {
  setGroups,
  openItemDialog,
  closeItemDialog,
  onSaveItem,
  onConfirmDelete,
  openDeleteDialog,
} from "../../components/schedule/DialogManager";
import dayjs from "dayjs";
import {
  MACHINE_STATUS,
  getStatusClass,
} from "../../configs/validations/schedule/constants";
import { getTimeWindow } from "../../utils/schedule/dateUtils";
import { useChangeWorkOrderMutation } from "../../services/schedule/smartSchedule";
import {
  useCreateMachineStatusMutation,
  useUpdateMachineStatusMutation,
  useDeleteMachineStatusMutation,
} from "../../services/machine/machineStatusApi";
import {
  transformNewStatusToApi,
  transformUpdateStatusToApi,
} from "../../utils/schedule/transformers/apiTransformers";
import {
  createApiError,
  handleFormError,
  logError,
} from "../../utils/schedule/errorHandler";

/**
 * @function isNumber
 * @description 檢查值是否為數字類型（包括數字和數字字串）
 * @param {any} value - 要檢查的值
 * @returns {boolean} 是否為有效數字
 */
function isNumber(value) {
  return typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));
}

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理

/**
 * @constant {number} DEFAULT_DURATION_HOURS
 * @description 預設的機台狀態持續時間
 */
const DEFAULT_DURATION_HOURS = 2;

/**
 * @constant {number} ORDER_DURATION_HOURS
 * @description 製令單預設持續時間
 */
const ORDER_DURATION_HOURS = 1;

/**
 * @constant {Object} ERROR_MESSAGES
 * @description 統一的錯誤訊息配置
 */
const ERROR_MESSAGES = {
  INVALID_STRUCTURE: "項目格式不正確，請檢查資料結構",
  CANNOT_DELETE_ORDER: "無法刪除製令單，製令單不允許被刪除",
  TIME_OVERLAP: "時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",
  SAVE_ORDER_FAILED: "保存製令單失敗",
  SAVE_STATUS_FAILED: "保存機台狀態失敗",
  DELETE_FAILED: "刪除項目失敗",
  START_DATE_TOO_EARLY: "預計上機日不能早於當前時間，請選擇未來的時間",
  INVALID_INPUT: "輸入資料有誤，請檢查後重試",
};

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構，幫助理解資料流向

/**
 * @function isOrderItem
 * @description 判斷是否為製令單項目
 * @param {Object} item - 項目數據
 * @returns {boolean} 是否為製令單
 * @example
 * // 基礎使用示例
 * const orderItem = { timeLineStatus: 'ORDER_CREATED' };
 * const result = isOrderItem(orderItem); // true
 *
 * @notes
 * - 只檢查 timeLineStatus 屬性
 * - 空值檢查避免錯誤
 *
 * @commonErrors
 * - 傳入 null/undefined 會返回 false，這是預期行為
 */
function isOrderItem(item) {
  return item?.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;
}

/**
 * @function validateItemStructure
 * @description 驗證項目數據結構完整性
 * @param {Object} updatedItem - 更新的項目數據
 * @throws {Error} 當數據格式不正確時拋出錯誤
 * @example
 * // 正確的數據結構
 * const validItem = { internal: { id: 1, status: 'active' } };
 * validateItemStructure(validItem); // 不拋出錯誤
 *
 * @notes
 * - 必須包含 internal 屬性
 *
 * @commonErrors
 * - 缺少 internal 屬性會拋出錯誤
 * - null 或 undefined 會拋出錯誤
 */
function validateItemStructure(updatedItem) {
  if (!updatedItem?.internal) {
    throw new Error(ERROR_MESSAGES.INVALID_STRUCTURE);
  }
}

/**
 * @function canDeleteItem
 * @description 判斷項目是否具備刪除權限
 * @param {Object} item - 項目數據
 * @returns {boolean} 是否可刪除
 * @example
 * // 機台狀態可以刪除
 * const statusItem = { timeLineStatus: 'IDLE' };
 * const canDelete = canDeleteItem(statusItem); // true
 *
 * // 製令單不可刪除
 * const orderItem = { timeLineStatus: 'ORDER_CREATED' };
 * const canDeleteOrder = canDeleteItem(orderItem); // false
 *
 * @notes
 * - 製令單（ORDER_CREATED）不允許刪除
 * - 其他狀態都允許刪除
 */
function canDeleteItem(item) {
  return !isOrderItem(item);
}

/**
 * @function needsApiDeletion
 * @description 判斷是否需要調用後端 API 進行刪除
 * @param {Object} item - 項目數據
 * @param {string} itemId - 項目ID
 * @returns {boolean} 是否需要 API 刪除
 * @example
 * // 需要 API 刪除的情況
 * const item = { status: { id: 123 } };
 * const needsApi = needsApiDeletion(item, 123); // true
 *
 * @notes
 * - 只有當 item.status.id 存在且等於 itemId 時才需要 API 刪除
 * - 臨時項目不需要 API 刪除
 */
function needsApiDeletion(item, itemId) {
  return item?.status?.id && item.status.id === itemId;
}

/**
 * @function handleApiError
 * @description 使用錯誤處理系統處理 API 錯誤並返回友善的錯誤訊息
 * @param {Object} error - API 錯誤對象
 * @returns {string} 友善的錯誤訊息
 * @example
 * // 處理開始時間太早的錯誤
 * const error = {
 *   data: { message: 'New start date is earlier than now.', error_reason: 'Invalid_input' }
 * };
 * const message = handleApiError(error); // "預計上機日不能早於當前時間，請選擇未來的時間"
 *
 * @notes
 * - 使用錯誤處理系統提供結構化錯誤處理
 * - 針對特定的 error_reason 和 message 提供客製化訊息
 * - 自動記錄錯誤到日誌系統
 */
function handleApiError(error) {
  // 檢查錯誤結構
  const errorData = error?.data;
  const errorReason = errorData?.error_reason;
  const errorMessage = errorData?.message;

  // 確定用戶友好的錯誤訊息
  let userMessage;

  // 處理特定的錯誤情境
  if (errorReason === "Invalid_input") {
    if (errorMessage?.includes("New start date is earlier than now")) {
      userMessage = ERROR_MESSAGES.START_DATE_TOO_EARLY;
    } else {
      userMessage = ERROR_MESSAGES.INVALID_INPUT;
    }
  } else if (errorMessage) {
    // 如果有自定義錯誤訊息，優先使用
    userMessage = errorMessage;
  } else {
    // 回退到通用錯誤訊息
    userMessage = error.message || ERROR_MESSAGES.SAVE_ORDER_FAILED;
  }

  // 使用錯誤處理系統創建結構化錯誤
  const structuredError = createApiError(userMessage, {
    originalError: error,
    errorData,
    errorReason,
    apiEndpoint: "smart-schedule",
    timestamp: new Date().toISOString(),
  });

  // 記錄錯誤到日誌系統
  logError(structuredError, {
    context: "製令單 API 更新",
    errorReason,
    originalMessage: errorMessage,
  });

  // 使用錯誤處理系統返回用戶友好的訊息
  return handleFormError(structuredError);
}

/**
 * @function isTemporaryId
 * @description 判斷ID是否為臨時ID (以"ITEM-"開頭)
 * @param {string|any} id - 需要檢查的ID
 * @returns {boolean} 是否為臨時ID
 * @example
 * // 臨時ID檢查
 * const tempId = "ITEM-1640995200000";
 * const isTemp = isTemporaryId(tempId); // true
 *
 * const realId = 123;
 * const isReal = isTemporaryId(realId); // false
 *
 * @notes
 * - 臨時ID用於新建項目，尚未保存到後端
 * - 檢查字串類型和前綴
 */
function isTemporaryId(id) {
  return id && typeof id === "string" && id.startsWith("ITEM-");
}

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function getItemTiming
 * @description 根據項目類型提取正確的時間信息
 * @param {Object} item - 項目數據
 * @returns {Object} { start: Date, end: Date }
 * @example
 * // 製令單時間提取
 * const orderItem = {
 *   timeLineStatus: 'ORDER_CREATED',
 *   orderInfo: {
 *     scheduledStartTime: '2024-01-01T08:00:00Z',
 *     scheduledEndTime: '2024-01-01T10:00:00Z'
 *   }
 * };
 * const timing = getItemTiming(orderItem);
 *
 * @notes
 * - 製令單優先使用 orderInfo 中的排程時間
 * - 機台狀態使用 status 中的時間
 * - 提供預設持續時間當結束時間缺失時
 *
 * @commonErrors
 * - 時間格式不正確會導致 dayjs 解析失敗
 * - 缺少時間屬性時會使用當前時間作為備用
 */
function getItemTiming(item) {
  //* ========= 製令單時間處理邏輯 =========
  // 步驟 1: 檢查是否為製令單且有訂單信息
  // 步驟 2: 提取排程開始和結束時間
  // 步驟 3: 處理缺失的結束時間
  if (isOrderItem(item) && item.orderInfo) {
    const start = dayjs(item.orderInfo.scheduledStartTime || item.start);
    const end = dayjs(
      item.orderInfo.scheduledEndTime ||
        item.end ||
        start.add(ORDER_DURATION_HOURS, "hour")
    );

    return {
      start: start.toDate(),
      end: end.toDate(),
    };
  }

  //* ========= 機台狀態時間處理邏輯 =========
  // 步驟 1: 檢查是否為非製令單且有狀態信息
  // 步驟 2: 提取狀態開始和結束時間
  // 步驟 3: 計算預設結束時間
  if (!isOrderItem(item) && item.status) {
    const start = dayjs(item.status.startTime || item.start);
    const end = item.status.endTime
      ? dayjs(item.status.endTime)
      : item.end
      ? dayjs(item.end)
      : start.add(DEFAULT_DURATION_HOURS, "hour");

    return {
      start: start.toDate(),
      end: end.toDate(),
    };
  }

  //* ========= 備用時間處理邏輯 =========
  // 步驟 1: 使用項目本身的 start/end 屬性
  // 步驟 2: 如果完全沒有時間信息，使用當前時間
  const start = dayjs(item.start || new Date());
  const end = dayjs(item.end || start.add(ORDER_DURATION_HOURS, "hour"));

  return {
    start: start.toDate(),
    end: end.toDate(),
  };
}

/**
 * @function getEditableConfig
 * @description 根據項目狀態決定可編輯性配置
 * @param {string} timeLineStatus - 時間軸狀態
 * @param {string} orderStatus - 訂單狀態
 * @returns {Object} 可編輯配置 { updateTime, updateGroup, remove }
 * @example
 * // 尚未上機的製令單
 * const config1 = getEditableConfig('ORDER_CREATED', '尚未上機');
 * // { updateTime: true, updateGroup: true, remove: false }
 *
 * // 已上機的製令單
 * const config2 = getEditableConfig('ORDER_CREATED', '進行中');
 * // { updateTime: false, updateGroup: false, remove: true }
 *
 * @notes
 * - 製令單的編輯權限取決於上機狀態
 * - 機台狀態一般不允許修改時間和機台，但可以刪除
 */
function getEditableConfig(timeLineStatus, orderStatus) {
  if (timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
    return orderStatus === "尚未上機"
      ? { updateTime: true, updateGroup: true, remove: false }
      : { updateTime: false, updateGroup: false, remove: true };
  }
  return { updateTime: false, updateGroup: false, remove: true };
}

/**
 * @function processOrderItem
 * @description 處理製令單項目的數據轉換和標準化
 * @param {Object} item - 原始項目數據
 * @returns {Object} 處理後的項目數據
 * @example
 * // 原始製令單數據
 * const rawOrder = {
 *   id: 1,
 *   timeLineStatus: 'ORDER_CREATED',
 *   orderInfo: { orderStatus: '尚未上機' },
 *   group: 'A001'
 * };
 * const processed = processOrderItem(rawOrder);
 *
 * @notes
 * - 自動計算區域代碼（從機台編號提取字母）
 * - 設置正確的 CSS 類名
 * - 清除機台狀態數據避免混淆
 *
 * @commonErrors
 * - group 格式不正確時，區域代碼可能為空
 * - 缺少 orderInfo 會影響可編輯性判斷
 */
function processOrderItem(item) {
  const timing = getItemTiming(item);

  return {
    ...item,
    className: getStatusClass(item.timeLineStatus),
    start: timing.start,
    end: timing.end,
    area: item.area || item.group?.match(/[A-Z]/)?.[0] || "",
    updateTime: false,
    editable: getEditableConfig(
      item.timeLineStatus,
      item.orderInfo?.orderStatus
    ),
    status: null, // 🧠 確保不混用機台狀態數據
  };
}

/**
 * @function processMachineStatus
 * @description 處理機台狀態項目的數據轉換和標準化
 * @param {Object} item - 原始項目數據
 * @returns {Object} 處理後的項目數據
 * @example
 * // 原始機台狀態數據
 * const rawStatus = {
 *   id: 2,
 *   timeLineStatus: 'IDLE',
 *   status: {
 *     startTime: '2024-01-01T08:00:00Z',
 *     endTime: '2024-01-01T10:00:00Z'
 *   },
 *   group: 'A001'
 * };
 * const processed = processMachineStatus(rawStatus);
 *
 * @notes
 * - 清除製令單數據避免混淆
 * - 機台狀態通常不允許修改時間和機台
 * - 提取區域代碼用於分類顯示
 */
function processMachineStatus(item) {
  const timing = getItemTiming(item);

  return {
    ...item,
    className: getStatusClass(item.timeLineStatus),
    start: timing.start,
    end: timing.end,
    area: item.area || item.group?.match(/[A-Z]/)?.[0] || "",
    updateTime: false,
    editable: getEditableConfig(item.timeLineStatus, null),
    orderInfo: null, // 🧠 確保不混用製令單數據
  };
}

/**
 * @function hasTimeOverlap
 * @description 檢查兩個項目的時間段是否有重疊
 * @param {Object} item1 - 第一個項目
 * @param {Object} item2 - 第二個項目
 * @returns {boolean} 是否重疊
 * @example
 * // 時間重疊檢查
 * const item1 = { start: '2024-01-01T08:00:00Z', end: '2024-01-01T10:00:00Z' };
 * const item2 = { start: '2024-01-01T09:00:00Z', end: '2024-01-01T11:00:00Z' };
 * const overlaps = hasTimeOverlap(item1, item2); // true
 *
 * @notes
 * - 使用 dayjs 進行精確的時間比較
 * - 邊界時間相等也視為重疊
 *
 * @commonErrors
 * - 時間格式錯誤會導致比較失敗
 * - 開始時間晚於結束時間會產生意外結果
 */
function hasTimeOverlap(item1, item2) {
  const start1 = dayjs(item1.start);
  const end1 = dayjs(item1.end);
  const start2 = dayjs(item2.start);
  const end2 = dayjs(item2.end);

  return (
    (start1.isBefore(end2) && end1.isAfter(start2)) ||
    start1.isSame(start2) ||
    end1.isSame(end2)
  );
}

//! =============== 4. 工具函數 ===============
//* 通用功能區，可被多個模組復用

/**
 * @function determineAction
 * @description 根據ID特徵判斷操作類型 (add 或 update) - 僅用於機台狀態
 * @param {string|any} id - 項目ID
 * @returns {string} 操作類型 ("add" 或 "update")
 * @example
 * // 新增操作
 * const tempId = "ITEM-1640995200000";
 * const action1 = determineAction(tempId); // "add"
 *
 * // 更新操作
 * const realId = 123;
 * const action2 = determineAction(realId); // "update"
 *
 * @notes
 * - 臨時ID（ITEM-前綴）表示新增操作
 * - 數字ID表示更新操作
 * - 製令單不使用此函數，只有更新操作
 */
function determineAction(id) {
  return isTemporaryId(id) ? "add" : "update";
}

/**
 * @function validateDeletePermission
 * @description 驗證項目的刪除權限（Push Ifs Up 原則）
 * @param {Object} item - 項目數據
 * @throws {Error} 當不允許刪除時拋出錯誤
 * @example
 * // 允許刪除的項目
 * const statusItem = { timeLineStatus: 'IDLE' };
 * validateDeletePermission(statusItem); // 不拋出錯誤
 *
 * // 不允許刪除的項目
 * const orderItem = { timeLineStatus: 'ORDER_CREATED' };
 * validateDeletePermission(orderItem); // 拋出錯誤
 *
 * @notes
 * - 製令單永遠不允許刪除
 * - 其他狀態項目可以刪除
 */
function validateDeletePermission(item) {
  if (!canDeleteItem(item)) {
    throw new Error(ERROR_MESSAGES.CANNOT_DELETE_ORDER);
  }
}

/**
 * @function executeLocalDeletion
 * @description 執行本地數據的刪除操作
 * @param {string} itemId - 項目ID
 * @param {Object} itemsDataRef - 數據引用
 * @example
 * // 本地刪除項目
 * executeLocalDeletion("123", itemsDataRef);
 *
 * @notes
 * - 立即從本地數據集移除項目
 * - 不等待後端API響應
 * - 記錄刪除操作到控制台
 */
function executeLocalDeletion(itemId, itemsDataRef) {
  itemsDataRef.current.remove(itemId);
  console.log("本地項目刪除完成:", itemId);
}

/**
 * @function executeApiDeletion
 * @description 執行後端API的刪除操作（異步，不影響本地狀態）
 * @param {Object} item - 項目數據
 * @param {Function} deleteMachineStatus - API 刪除函數
 * @example
 * // API刪除（在本地刪除後執行）
 * executeApiDeletion(item, deleteMachineStatusFn);
 *
 * @notes
 * - 異步執行，不阻塞本地操作
 * - 失敗時不影響已完成的本地刪除
 * - 錯誤僅記錄到控制台，不顯示給用戶
 */
function executeApiDeletion(item, deleteMachineStatus) {
  deleteMachineStatus(item.status.id)
    .unwrap()
    .then(() => {
      console.log("機台狀態 API 刪除成功");
    })
    .catch((error) => {
      // 使用錯誤處理系統記錄錯誤但不顯示給用戶
      const structuredError = createApiError("機台狀態 API 刪除失敗", {
        originalError: error,
        context: "刪除機台狀態",
        operation: "deleteMachineStatus",
        itemId: item.status.id,
      });

      logError(structuredError, {
        context: "機台狀態刪除流程",
        note: "本地已成功刪除，API失敗不影響用戶體驗",
      });
      // 💡 不顯示錯誤給用戶，因為本地已成功刪除
    });
}

/**
 * @function validateNoOverlap
 * @description 批次驗證時間重疊問題 (Push Fors Down 原則)
 * @param {Object} item - 要檢查的項目
 * @param {Object} dataSet - 數據集
 * @throws {Error} 當發現時間重疊時拋出錯誤
 * @example
 * // 檢查時間重疊
 * const newItem = {
 *   id: 'new',
 *   group: 'A001',
 *   start: '2024-01-01T08:00:00Z',
 *   end: '2024-01-01T10:00:00Z',
 *   timeLineStatus: 'IDLE'
 * };
 * validateNoOverlap(newItem, dataSet);
 *
 * @notes
 * - 只檢查相同機台組的項目
 * - 製令單不參與重疊檢查
 * - 使用批次處理提高效能
 *
 * @commonErrors
 * - 相同機台同時間有多個非製令單狀態會拋出錯誤
 */
function validateNoOverlap(item, dataSet) {
  //* ========= 複雜邏輯解釋 =========
  // 步驟 1: 篩選出可能衝突的候選項目（相同機台、非製令單、非自身）
  // 步驟 2: 批次檢查所有候選項目是否與當前項目時間重疊
  // 步驟 3: 如果發現任何重疊，拋出錯誤

  const conflictCandidates = dataSet.get({
    filter: function (existingItem) {
      return (
        existingItem.id !== item.id &&
        existingItem.group === item.group &&
        existingItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
      );
    },
  });

  const hasAnyOverlap = conflictCandidates.some((existingItem) =>
    hasTimeOverlap(item, existingItem)
  );

  if (hasAnyOverlap) {
    throw new Error(ERROR_MESSAGES.TIME_OVERLAP);
  }
}

/**
 * @function processItemDeletion
 * @description 根據項目類型處理刪除邏輯（Push Ifs Up + Push Fors Down）
 * @param {Object} item - 項目數據
 * @param {string} itemId - 項目ID
 * @param {Object} itemsDataRef - 數據引用
 * @param {Function} deleteMachineStatus - API 刪除函數
 * @example
 * // 處理項目刪除
 * processItemDeletion(item, "123", itemsDataRef, deleteFn);
 *
 * @notes
 * - 應用 Push Ifs Up 原則，頂層決定處理策略
 * - 先本地刪除再API刪除，確保UI響應速度
 * - 區分需要API刪除和純本地刪除的情況
 *
 * @commonErrors
 * - API刪除失敗不影響本地已完成的刪除操作
 */
function processItemDeletion(item, itemId, itemsDataRef, deleteMachineStatus) {
  // 🧠 Push Ifs Up - 頂層決定處理策略
  const requiresApiDeletion = needsApiDeletion(item, itemId);

  if (requiresApiDeletion) {
    // 先本地刪除，再 API 刪除
    executeLocalDeletion(itemId, itemsDataRef);
    executeApiDeletion(item, deleteMachineStatus);
  } else {
    // 純本地刪除
    executeLocalDeletion(itemId, itemsDataRef);
  }
}

//! =============== 5. 主要 Hook 實現 ===============
//* Hook 的核心實現，應用 Push Ifs Up 原則

/**
 * @function useTimelineDialogs
 * @description 處理與對話框管理器的集成 - 認知負荷優化版本
 * @param {Object} options - 配置選項
 * @param {React.RefObject} options.itemsDataRef - 項目數據引用
 * @param {Array} options.groups - 分組數據
 * @param {Object} [options.timelineRef] - 時間軸組件的參考（可選）
 * @param {string} [options.timeRange] - 時間範圍（可選）
 * @returns {Object} 對話框操作方法
 * @example
 * // 基本使用
 * const timelineDialogs = useTimelineDialogs({
 *   itemsDataRef: itemsRef,
 *   groups: machineGroups,
 *   timelineRef: timelineComponentRef,
 *   timeRange: 'week'
 * });
 *
 * // 使用返回的方法
 * timelineDialogs.handleAddItem(new Date(), 'A');
 * timelineDialogs.handleEditItem(selectedItem);
 *
 * @notes
 * - 集成製令單和機台狀態的完整生命週期管理
 * - 提供統一的CRUD操作介面
 * - 自動處理權限驗證和數據轉換
 * - 支援時間重疊檢查和錯誤處理
 *
 * @commonErrors
 * - itemsDataRef 為空時大部分操作會失敗
 * - groups 數據格式不正確會影響對話框顯示
 */
export function useTimelineDialogs({
  itemsDataRef,
  groups,
  timelineRef,
  timeRange,
}) {
  //? ========= API Hook 初始化 =========
  // 製令單 API
  const [changeWorkOrder] = useChangeWorkOrderMutation();

  // 機台狀態 API
  const [createMachineStatus] = useCreateMachineStatusMutation();
  const [updateMachineStatus] = useUpdateMachineStatusMutation();
  const [deleteMachineStatus] = useDeleteMachineStatusMutation();

  // 設置 groups 數據
  useEffect(() => {
    if (groups) {
      setGroups(groups);
    }
  }, [groups]);

  /**
   * @function saveOrderItem
   * @description 專門處理製令單項目保存 - 只處理更新操作
   * @param {Object} updatedItem - 更新的項目數據
   * @example
   * // 保存製令單更新
   * const orderUpdate = {
   *   internal: { id: 1, timeLineStatus: 'ORDER_CREATED' },
   *   api: { orderId: 1, startTime: '2024-01-01T08:00:00Z' }
   * };
   * saveOrderItem(orderUpdate);
   *
   * @notes
   * - 製令單只有更新操作，不會新增
   * - 只有 API 成功後才更新本地數據
   * - 一律觸發機台排程調整
   */
  const saveOrderItem = useCallback(
    function saveOrderItem(updatedItem) {
      try {
        const processedItem = processOrderItem(updatedItem.internal);
        // 提交到製令單 API
        if (updatedItem.api) {
          changeWorkOrder(updatedItem.api)
            .unwrap()
            .then((response) => {
              console.log("製令單 API 更新成功:", response);
              // ✅ API 成功後才更新本地數據
              itemsDataRef.current.update(processedItem);

              //TODO: 機台排程調整 - 目前註解避免重複更新，未來可能需要獨立的排程API
              // 🔄 一律觸發機台排程調整
              // console.log("🚀 觸發機台排程調整:", processedItem);
              // changeWorkOrder(processedItem)
              //   .unwrap()
              //   .then((scheduleResponse) => {
              //     console.log("機台排程調整成功:", scheduleResponse);
              //   })
              //   .catch((scheduleError) => {
              //     console.error("機台排程調整失敗:", scheduleError);
              //     // 排程調整失敗不影響製令單更新
              //   });
            })
            .catch((error) => {
              console.error("製令單 API 更新失敗:", error);

              // 處理特定的 API 錯誤
              const errorMessage = handleApiError(error);
              alert(errorMessage);
            });
        } else {
          // 沒有 API 數據時，直接更新本地
          itemsDataRef.current.update(processedItem);
        }
      } catch (error) {
        // 使用錯誤處理系統處理錯誤
        const structuredError = createApiError(
          error.message || ERROR_MESSAGES.SAVE_ORDER_FAILED,
          {
            originalError: error,
            context: "保存製令單",
            operation: "saveOrderItem",
          }
        );

        logError(structuredError, {
          context: "製令單保存流程",
          itemId: updatedItem?.internal?.id,
        });

        alert(handleFormError(structuredError));
      }
    },
    [itemsDataRef, changeWorkOrder]
  );

  /**
   * @function saveMachineStatus
   * @description 專門處理機台狀態項目保存 (Push Ifs Up 原則)
   * @param {Object} updatedItem - 更新的項目數據
   * @example
   * // 保存機台狀態更新
   * const statusUpdate = {
   *   internal: { id: 2, timeLineStatus: 'IDLE', group: 'A001' },
   *   api: { statusId: 2, startTime: '2024-01-01T08:00:00Z' }
   * };
   * saveMachineStatus(statusUpdate);
   *
   * @notes
   * - 只處理機台狀態相關邏輯
   * - 包含時間重疊驗證
   * - 自動選擇創建或更新API
   * - 智能轉換數據格式
   */
  const saveMachineStatus = useCallback(
    function saveMachineStatus(updatedItem) {
      try {
        const processedItem = processMachineStatus(updatedItem.internal);

        // ⚠️ 機台狀態需要檢查時間重疊
        validateNoOverlap(processedItem, itemsDataRef.current);

        const action = determineAction(processedItem.id);
        const isUpdate = action === "update";

        // 準備API數據
        let apiData;
        if (updatedItem.api) {
          apiData = updatedItem.api;
        } else {
          if (isUpdate) {
            const originalItem = itemsDataRef.current.get(processedItem.id);
            apiData = transformUpdateStatusToApi(processedItem, originalItem);
          } else {
            apiData = transformNewStatusToApi(processedItem);
          }
        }

        // 提交到 API，成功後才更新本地數據
        const apiFunction = isUpdate
          ? updateMachineStatus
          : createMachineStatus;
        const actionName = isUpdate ? "更新" : "創建";

        apiFunction(apiData)
          .unwrap()
          .then((response) => {
            console.log(`機台狀態 API ${actionName}成功:`, response);
            // ✅ API 成功後才更新本地數據
            itemsDataRef.current[action](processedItem);
          })
          .catch((error) => {
            // 使用錯誤處理系統處理 API 錯誤
            const structuredError = createApiError(
              `機台狀態 API ${actionName}失敗`,
              {
                originalError: error,
                context: `${actionName}機台狀態`,
                operation: isUpdate
                  ? "updateMachineStatus"
                  : "createMachineStatus",
                actionName,
              }
            );

            logError(structuredError, {
              context: "機台狀態保存流程",
              action: actionName,
              isUpdate,
            });

            alert(handleFormError(structuredError));
          });
      } catch (error) {
        // 使用錯誤處理系統處理一般錯誤
        const structuredError = createApiError(
          error.message || ERROR_MESSAGES.SAVE_STATUS_FAILED,
          {
            originalError: error,
            context: "保存機台狀態",
            operation: "saveMachineStatus",
          }
        );

        logError(structuredError, {
          context: "機台狀態保存流程",
          stage: "數據處理階段",
        });

        alert(handleFormError(structuredError));
      }
    },
    [itemsDataRef, createMachineStatus, updateMachineStatus]
  );

  /**
   * @function handleSaveItem
   * @description 統一的項目保存處理 - 應用 Push Ifs Up 原則
   * @param {Object} updatedItem - 更新的項目數據
   * @example
   * // 統一保存介面
   * const itemUpdate = {
   *   internal: { id: 1, timeLineStatus: 'ORDER_CREATED' }
   * };
   * handleSaveItem(itemUpdate);
   *
   * @notes
   * - 頂層統一處理所有保存操作
   * - 自動路由到對應的處理函數
   * - 包含完整的錯誤處理
   * - 遵循 Push Ifs Up 原則
   */
  const handleSaveItem = useCallback(
    function handleSaveItem(updatedItem) {
      try {
        // 🧠 在最頂層進行結構驗證和類型判斷
        validateItemStructure(updatedItem);

        // ✨ Push Ifs Up - 在頂層決定處理路徑
        if (isOrderItem(updatedItem.internal)) {
          saveOrderItem(updatedItem);
        } else {
          saveMachineStatus(updatedItem);
        }
      } catch (error) {
        console.error("Save item failed:", error);
        alert(error.message);
      }
    },
    [saveOrderItem, saveMachineStatus]
  );

  /**
   * @function performDeleteItem
   * @description 執行實際的項目刪除邏輯（本地移除和 API 調用）
   * @param {string} itemId - 項目ID
   * @example
   * // 刪除指定項目
   * performDeleteItem("123");
   *
   * @notes
   * - 應用 Push Ifs Up 原則，頂層集中所有判斷邏輯
   * - 包含完整的參數驗證和錯誤處理
   * - 區分本地刪除和API刪除
   * - 優先保證UI響應速度
   *
   * @commonErrors
   * - 無效的itemId會被忽略並記錄警告
   * - 製令單刪除會被拒絕並顯示錯誤
   */
  const performDeleteItem = useCallback(
    function performDeleteItem(itemId) {
      // 🧠 早期返回 - 參數驗證
      if (!isNumber(itemId) || !itemsDataRef.current) {
        console.warn("無效的刪除參數:", {
          itemId,
          hasDataRef: !!itemsDataRef.current,
        });
        return;
      }

      const item = itemsDataRef.current.get(itemId);
      if (!item) {
        console.warn("找不到要刪除的項目:", itemId);
        return;
      }
      try {
        // ✨ Push Ifs Up - 頂層驗證刪除權限
        validateDeletePermission(item);

        // 🧠 執行刪除處理（工具函數負責具體邏輯）
        processItemDeletion(item, itemId, itemsDataRef, deleteMachineStatus);
      } catch (error) {
        console.error("Delete item failed:", error);
        alert(error.message || ERROR_MESSAGES.DELETE_FAILED);
      }
    },
    [itemsDataRef, deleteMachineStatus]
  );

  /**
   * @function openDeleteConfirmation
   * @description 打開刪除確認對話框
   * @param {string} itemId - 要刪除的項目ID
   * @example
   * // 打開刪除確認
   * openDeleteConfirmation("123");
   *
   * @notes
   * - 提供二次確認避免誤刪
   * - 調用 DialogManager 中的統一對話框
   * - 參數驗證確保安全性
   */
  const openDeleteConfirmation = useCallback(function openDeleteConfirmation(
    itemId
  ) {
    if (!itemId?.length) {
      alert("請選擇要刪除的項目");
      return;
    }
    openDeleteDialog(itemId);
  },
  []);

  /**
   * @function handleAddItem
   * @description 添加新的機台狀態項目
   * @param {Date} startTime - 開始時間
   * @param {string} areaCode - 區域代碼
   * @example
   * // 添加新的機台狀態
   * handleAddItem(new Date(), 'A');
   *
   * @notes
   * - 只創建機台狀態項目，不創建製令單
   * - 自動生成臨時ID用於新建項目
   * - 提供合理的預設值
   * - 直接打開編輯對話框
   */
  const handleAddItem = useCallback(
    function handleAddItem(startTime, areaCode) {
      try {
        const centerTime = startTime ? dayjs(startTime) : dayjs();
        const endTime = centerTime.add(DEFAULT_DURATION_HOURS, "hour");

        // 生成臨時 ID
        const tempId = `ITEM-${Date.now()}`;

        // 🧠 只創建機台狀態項目，不創建製令單
        const newItem = {
          id: tempId,
          group: "", // 在對話框中選擇機台
          area: areaCode || "",
          timeLineStatus: MACHINE_STATUS.IDLE, // 預設狀態
          status: {
            startTime: centerTime.toDate(),
            endTime: endTime.toDate(),
            reason: "",
            product: "",
          },
          orderInfo: null, // ✨ 確保不混用
          start: centerTime.toDate(),
          end: endTime.toDate(),
          className: "status-idle",
          content: "新狀態",
          isNew: true,
        };

        openItemDialog(newItem, "add", groups);
      } catch (error) {
        // 使用錯誤處理系統處理錯誤
        const structuredError = createApiError(
          error.message || "新增狀態失敗",
          {
            originalError: error,
            context: "新增機台狀態",
            operation: "handleAddItem",
            startTime,
            areaCode,
          }
        );

        logError(structuredError, {
          context: "新增狀態流程",
          startTime: startTime?.toISOString?.() || startTime,
          areaCode,
        });

        alert(handleFormError(structuredError));
      }
    },
    [groups]
  );

  /**
   * @function handleEditItem
   * @description 編輯現有項目
   * @param {Object} item - 要編輯的項目
   * @example
   * // 編輯現有項目
   * const existingItem = { id: 1, status: 'IDLE' };
   * handleEditItem(existingItem);
   *
   * @notes
   * - 直接打開編輯對話框
   * - 傳遞完整的項目數據
   * - 包含機台分組信息
   */
  const handleEditItem = useCallback(
    function handleEditItem(item) {
      if (!item) return;
      openItemDialog(item, "edit", groups);
    },
    [groups]
  );

  /**
   * @function handleMoveToNow
   * @description 移動時間軸到當前時間
   * @example
   * // 跳轉到當前時間
   * handleMoveToNow();
   *
   * @notes
   * - 需要 timelineRef 和 timeRange 參數
   * - 使用動畫效果平滑移動
   * - 根據時間範圍計算顯示視窗
   */
  const handleMoveToNow = useCallback(
    function handleMoveToNow() {
      if (!timelineRef?.current) return;

      try {
        const timeWindow = getTimeWindow(timeRange, dayjs());
        timelineRef.current.setWindow(
          timeWindow.start.toDate(),
          timeWindow.end.toDate(),
          { animation: true }
        );
      } catch (error) {
        console.error("Move to current time failed:", error);
      }
    },
    [timelineRef, timeRange]
  );

  // 設置事件監聽
  useEffect(() => {
    const saveUnsubscribe = onSaveItem(handleSaveItem);
    const deleteUnsubscribe = onConfirmDelete(performDeleteItem);

    return () => {
      saveUnsubscribe();
      deleteUnsubscribe();
    };
  }, [handleSaveItem, performDeleteItem]);

  // 🧠 返回的介面保持簡潔，只暴露必要的方法
  return {
    // 主要操作方法
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    openDeleteConfirmation,
    handleMoveToNow,

    // 💡 工具函數可供外部使用
    getItemTiming,
    getEditableConfig,
  };
}

//! =============== 示例區塊 ===============
/**
 * @example 常見使用場景
 *
 * // 場景 1: 基本使用
 * const timelineDialogs = useTimelineDialogs({
 *   itemsDataRef: timelineItemsRef,
 *   groups: machineGroups,
 *   timelineRef: visTimelineRef,
 *   timeRange: 'week'
 * });
 *
 * // 場景 2: 錯誤處理
 * try {
 *   timelineDialogs.handleAddItem(new Date(), 'A');
 * } catch (error) {
 *   console.error('新增項目失敗:', error);
 * }
 *
 * // 場景 3: 特殊案例 - 批次操作
 * selectedItems.forEach(item => {
 *   if (canDeleteItem(item)) {
 *     timelineDialogs.openDeleteConfirmation(item.id);
 *   }
 * });
 */
