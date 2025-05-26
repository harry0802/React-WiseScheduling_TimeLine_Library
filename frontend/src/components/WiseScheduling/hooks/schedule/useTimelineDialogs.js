/**
 * @file useTimelineDialogs.js
 * @description 與對話框管理器集成的 hook - 重構版本
 * @version 3.1.0 - 2025-05-23 整合專用機台狀態 API
 */

import { useEffect, useCallback } from "react";
import {
  setGroups,
  openItemDialog,
  onSaveItem,
  onConfirmDelete,
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

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有項目處理的核心配置

const DEFAULT_DURATION_HOURS = 2;
const ORDER_DURATION_HOURS = 1;

//! =============== 2. 類型與介面判斷 ===============
//* 統一的項目類型判斷邏輯

/**
 * @function isOrderItem
 * @description 判斷是否為製令單項目
 * @param {Object} item - 項目數據
 * @returns {boolean} 是否為製令單
 */
function isOrderItem(item) {
  return item?.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;
}

/**
 * @function validateItemStructure
 * @description 驗證項目數據結構
 * @param {Object} updatedItem - 更新的項目數據
 * @throws {Error} 當數據格式不正確時拋出錯誤
 */
function validateItemStructure(updatedItem) {
  if (!updatedItem?.internal) {
    throw new Error("項目格式不正確，請檢查資料結構");
  }
}

//! =============== 3. 核心功能 - 項目處理器 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function getItemTiming
 * @description 根據項目類型獲取正確的時間信息
 * @param {Object} item - 項目數據
 * @returns {Object} { start: Date, end: Date }
 */
function getItemTiming(item) {
  if (isOrderItem(item) && item.orderInfo) {
    return {
      start: dayjs(item.orderInfo.scheduledStartTime || item.start).toDate(),
      end: dayjs(
        item.orderInfo.scheduledEndTime ||
          item.end ||
          dayjs(item.orderInfo.scheduledStartTime).add(
            ORDER_DURATION_HOURS,
            "hour"
          )
      ).toDate(),
    };
  }

  if (!isOrderItem(item) && item.status) {
    const start = dayjs(item.status.startTime || item.start).toDate();
    const end = item.status.endTime
      ? dayjs(item.status.endTime).toDate()
      : item.end
      ? dayjs(item.end).toDate()
      : dayjs(item.status.startTime || item.start)
          .add(DEFAULT_DURATION_HOURS, "hour")
          .toDate();

    return { start, end };
  }

  // 備用方案
  return {
    start: dayjs(item.start || new Date()).toDate(),
    end: dayjs(
      item.end || dayjs(item.start).add(ORDER_DURATION_HOURS, "hour")
    ).toDate(),
  };
}

/**
 * @function getEditableConfig
 * @description 根據項目狀態決定可編輯性配置
 * @param {string} timeLineStatus - 時間軸狀態
 * @param {string} orderStatus - 訂單狀態
 * @returns {Object} 可編輯配置
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
 * @description 處理製令單項目的數據轉換
 * @param {Object} item - 原始項目數據
 * @returns {Object} 處理後的項目數據
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
 * @description 處理機台狀態項目的數據轉換
 * @param {Object} item - 原始項目數據
 * @returns {Object} 處理後的項目數據
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
 * @function submitToOrderAPI
 * @description 提交製令單數據到後端API
 * @param {Object} apiData - API格式的數據
 * @param {Function} changeWorkOrder - API調用函數
 */
function submitToOrderAPI(apiData, changeWorkOrder) {
  if (!apiData) return;

  changeWorkOrder(apiData)
    .unwrap()
    .then((response) => {
      console.log("製令單 API 更新成功:", response);
    })
    .catch((error) => {
      console.error("製令單 API 更新失敗:", error);
    });
}

/**
 * @function submitToMachineStatusAPI
 * @description 提交機台狀態數據到後端API
 * @param {Object} apiData - API格式的數據
 * @param {Function} createStatus - 創建API調用函數
 * @param {Function} updateStatus - 更新API調用函數
 * @param {boolean} isUpdate - 是否為更新操作
 */
function submitToMachineStatusAPI(
  apiData,
  createStatus,
  updateStatus,
  isUpdate
) {
  console.log("🚀 ~ submitToMachineStatusAPI ~ apiData:", apiData);
  if (!apiData) return;

  const apiFunction = isUpdate ? updateStatus : createStatus;

  apiFunction(apiData)
    .unwrap()
    .then((response) => {
      console.log(`機台狀態 API ${isUpdate ? "更新" : "創建"}成功:`, response);
    })
    .catch((error) => {
      console.error(`機台狀態 API ${isUpdate ? "更新" : "創建"}失敗:`, error);
    });
}

/**
 * @function hasTimeOverlap
 * @description 檢查兩個時間段是否重疊
 * @param {Object} item1 - 第一個項目
 * @param {Object} item2 - 第二個項目
 * @returns {boolean} 是否重疊
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

/**
 * @function isTemporaryId
 * @description 判斷ID是否為臨時ID (以"ITEM-"開頭)
 * @param {string|any} id - 需要檢查的ID
 * @returns {boolean} 是否為臨時ID
 */
function isTemporaryId(id) {
  return id && typeof id === "string" && id.startsWith("ITEM-");
}

/**
 * @function determineAction
 * @description 根據ID特徵判斷操作類型 (add 或 update)
 * @param {string|any} id - 項目ID
 * @returns {string} 操作類型 ("add" 或 "update")
 */
function determineAction(id) {
  return isTemporaryId(id) ? "add" : "update";
}

/**
 * @function validateNoOverlap
 * @description 批次驗證時間重疊問題 (Push Fors Down 原則)
 * @param {Object} item - 要檢查的項目
 * @param {Object} dataSet - 數據集
 * @throws {Error} 當發現時間重疊時拋出錯誤
 */
function validateNoOverlap(item, dataSet) {
  // ✨ Push Fors Down - 批次獲取所有潛在衝突項目
  const conflictCandidates = dataSet.get({
    filter: function (existingItem) {
      return (
        existingItem.id !== item.id &&
        existingItem.group === item.group &&
        existingItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
      );
    },
  });

  // ✨ 批次檢查重疊，避免多次迴圈
  const hasAnyOverlap = conflictCandidates.some((existingItem) =>
    hasTimeOverlap(item, existingItem)
  );

  if (hasAnyOverlap) {
    throw new Error("時間重疊：除了「製令單」外的其他狀態都不允許時間重疊");
  }
}

//! =============== 5. 主要 Hook 實現 ===============
//* Hook 的核心實現，應用 Push Ifs Up 原則

/**
 * @function useTimelineDialogs
 * @description 處理與對話框管理器的集成 - 重構版本
 * @param {Object} options - 配置選項
 * @param {React.RefObject} options.itemsDataRef - 項目數據引用
 * @param {Array} options.groups - 分組數據
 * @param {Object} [options.timelineRef] - 時間軸組件的參考（可選）
 * @param {string} [options.timeRange] - 時間範圍（可選）
 * @returns {Object} 對話框操作方法
 */
export function useTimelineDialogs({
  itemsDataRef,
  groups,
  timelineRef,
  timeRange,
}) {
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
   * @description 專門處理製令單項目保存 (Push Ifs Up 原則)
   * @param {Object} updatedItem - 更新的項目數據
   */
  const saveOrderItem = useCallback(
    (updatedItem) => {
      try {
        const processedItem = processOrderItem(updatedItem.internal);

        // 使用輔助函數判斷操作類型
        const action = determineAction(processedItem.id);

        // 更新本地數據
        itemsDataRef.current[action](processedItem);

        // 提交到製令單 API
        if (updatedItem.api) {
          submitToOrderAPI(updatedItem.api, changeWorkOrder);
        }
      } catch (error) {
        console.error("保存製令單失敗:", error);
        alert(error.message || "保存製令單失敗");
      }
    },
    [itemsDataRef, changeWorkOrder]
  );

  /**
   * @function saveMachineStatus
   * @description 專門處理機台狀態項目保存 (Push Ifs Up 原則)
   * @param {Object} updatedItem - 更新的項目數據
   */
  const saveMachineStatus = useCallback(
    (updatedItem) => {
      try {
        const processedItem = processMachineStatus(updatedItem.internal);

        // ⚠️ 機台狀態需要檢查時間重疊
        validateNoOverlap(processedItem, itemsDataRef.current);

        // 使用輔助函數判斷操作類型
        const action = determineAction(processedItem.id);
        const isUpdate = action === "update";

        // 將時間線項目轉換為 API 格式
        let apiData;
        if (updatedItem.api) {
          // 如果已經提供了 API 數據，直接使用
          apiData = updatedItem.api;
        } else {
          // 否則，根據是否為更新操作，使用不同的轉換函數
          if (isUpdate) {
            // 更新操作：需要提供原始數據進行比較
            const originalItem = itemsDataRef.current.get(processedItem.id);
            apiData = transformUpdateStatusToApi(processedItem, originalItem);
          } else {
            // 新增操作：使用新狀態轉換函數
            apiData = transformNewStatusToApi(processedItem);
          }
        }

        // 更新本地數據
        itemsDataRef.current[action](processedItem);

        // 提交到 API
        submitToMachineStatusAPI(
          apiData,
          createMachineStatus,
          updateMachineStatus,
          isUpdate
        );
      } catch (error) {
        console.error("保存機台狀態失敗:", error);
        alert(error.message || "保存機台狀態失敗");
      }
    },
    [itemsDataRef, createMachineStatus, updateMachineStatus]
  );

  /**
   * @function handleSaveItem
   * @description 統一的項目保存處理 - 應用 Push Ifs Up 原則
   * @param {Object} updatedItem - 更新的項目數據
   */
  const handleSaveItem = useCallback(
    (updatedItem) => {
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
   * @function handleDeleteItem
   * @description 處理項目刪除 - 應用 Push Ifs Up 原則
   * @param {string} itemId - 項目ID
   */
  const handleDeleteItem = useCallback(
    (itemId) => {
      if (!itemId?.length || !itemsDataRef.current) {
        return;
      }

      try {
        const item = itemsDataRef.current.get(itemId);

        // ✨ Push Ifs Up - 在頂層進行類型判斷
        if (isOrderItem(item)) {
          throw new Error("無法刪除製令單，製令單不允許被刪除");
        }

        // 🧠 從本地狀態移除項目
        itemsDataRef.current.remove(itemId);

        // 如果有狀態 ID，則調用 API 刪除
        if (item.statusId) {
          deleteMachineStatus(item.statusId)
            .unwrap()
            .then(() => {
              console.log("機台狀態刪除成功");
            })
            .catch((error) => {
              console.error("機台狀態刪除 API 失敗:", error);
              // 不顯示錯誤，因為本地已刪除
            });
        }
      } catch (error) {
        console.error("Delete item failed:", error);
        alert(error.message || "刪除項目失敗");
      }
    },
    [itemsDataRef, deleteMachineStatus]
  );

  /**
   * @function handleAddItem
   * @description 添加新的機台狀態項目
   * @param {Date} startTime - 開始時間
   * @param {string} areaCode - 區域代碼
   */
  const handleAddItem = useCallback(
    (startTime, areaCode) => {
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
          // 標記為新增項目
          isNew: true,
        };

        openItemDialog(newItem, "add", groups);
      } catch (error) {
        console.error("新增狀態失敗:", error);
        alert(error.message || "新增狀態失敗");
      }
    },
    [groups]
  );

  /**
   * @function handleEditItem
   * @description 編輯現有項目
   * @param {Object} item - 要編輯的項目
   */
  const handleEditItem = useCallback(
    (item) => {
      if (!item) return;
      openItemDialog(item, "edit", groups);
    },
    [groups]
  );

  /**
   * @function handleMoveToNow
   * @description 移動時間軸到當前時間
   */
  const handleMoveToNow = useCallback(() => {
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
  }, [timelineRef, timeRange]);

  // 設置事件監聽
  useEffect(() => {
    const saveUnsubscribe = onSaveItem(handleSaveItem);
    const deleteUnsubscribe = onConfirmDelete(handleDeleteItem);

    return () => {
      saveUnsubscribe();
      deleteUnsubscribe();
    };
  }, [handleSaveItem, handleDeleteItem]);

  // 🧠 返回的介面保持簡潔
  return {
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleDeleteItem,
    handleMoveToNow,
    // 💡 工具函數可供外部使用
    getItemTiming,
    getEditableConfig,
  };
}
