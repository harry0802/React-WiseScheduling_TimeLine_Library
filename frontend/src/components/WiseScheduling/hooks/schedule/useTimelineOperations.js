//! =============== 1. 設定與常量 ===============
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { MACHINE_STATUS } from "../../configs/schedule/constants";
import { getStatusClass } from "../../configs/schedule/constants";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} DialogState
 * @property {Object|null} selectedItem - 當前選中的項目
 * @property {'view'|'add'|'edit'} mode - 對話框模式
 * @property {boolean} isOpen - 對話框開啟狀態
 */

//! =============== 3. 核心功能 ===============
/**
 * @function useTimelineOperations
 * @description 時間軸操作邏輯的自定義 Hook
 * @param {Object} timelineRef - 時間軸組件的參考
 * @param {Object} itemsDataRef - 數據項的參考
 * @param {string} timeRange - 時間範圍
 * @param {Array} groups - 分組信息
 * @returns {Object} 時間軸操作方法集合
 */
export const useTimelineOperations = (
  timelineRef,
  itemsDataRef,
  timeRange,
  groups
) => {
  const [dialogState, setDialogState] = useState({
    selectedItem: null,
    mode: "view",
    isOpen: false,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  //! =============== 4. 工具函數 ===============
  /**
   * @function getItemTiming
   * @description 獲取項目的時間信息
   * @param {Object} item - 項目數據
   * @returns {Object} 開始和結束時間
   */
  const getItemTiming = (item) => {
    if (item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
      return {
        start: dayjs(item.orderInfo.scheduledStartTime).toDate(),
        end: dayjs(item.orderInfo.scheduledEndTime).toDate(),
      };
    }

    const start = dayjs(item.status.startTime).toDate();
    const end = item.status.endTime
      ? dayjs(item.status.endTime).toDate()
      : dayjs(item.status.startTime).add(2, "hour").toDate();

    return { start, end };
  };

  /**
   * @function getEditableConfig
   * @description 判斷項目的可編輯性
   * @param {string} timeLineStatus - 時間軸狀態
   * @param {string} orderStatus - 訂單狀態
   * @returns {Object} 可編輯配置
   */
  const getEditableConfig = (timeLineStatus, orderStatus) => {
    if (timeLineStatus === "製立單") {
      return orderStatus === "尚未上機"
        ? { updateTime: true, updateGroup: true, remove: false }
        : { updateTime: false, updateGroup: false, remove: true };
    }
    return { updateTime: false, updateGroup: false, remove: true };
  };

  //* ========= 事件處理函數 =========
  const handleSaveItem = useCallback(
    (updatedItem) => {
      if (!itemsDataRef.current) return;

      try {
        const areaMatch = updatedItem.group?.match(/[A-Z]/);
        const processedItem = {
          ...updatedItem,
          className: getStatusClass(updatedItem.timeLineStatus),
          ...getItemTiming(updatedItem),
          area: areaMatch?.[0] || "",
          updateTime: false,
          editable: getEditableConfig(
            updatedItem.timeLineStatus,
            updatedItem.orderInfo.orderStatus
          ),
        };

        const action = dialogState.mode === "add" ? "add" : "update";
        itemsDataRef.current[action](processedItem);
        setDialogState((prev) => ({
          ...prev,
          isOpen: false,
          selectedItem: null,
        }));
      } catch (error) {
        console.error("Save item failed:", error);
      }
    },
    [dialogState.mode]
  );

  //* 其他事件處理函數按照相同模式重構...
  const handleDeleteItem = useCallback(() => {
    if (!dialogState.selectedItem?.id || !itemsDataRef.current) return;

    try {
      itemsDataRef.current.remove(dialogState.selectedItem.id);
      setIsDeleteDialogOpen(false);
      setDialogState((prev) => ({ ...prev, selectedItem: null }));
    } catch (error) {
      console.error("Delete item failed:", error);
    }
  }, [dialogState.selectedItem]);

  //TODO: 考慮將新增項目的默認值抽取為常量
  const handleAddItem = useCallback((startTime, machineGroup) => {
    if (!timelineRef.current) return;

    try {
      // 使用提供的時間或當前時間
      const centerTime = startTime ? dayjs(startTime) : dayjs();
      const endTime = centerTime.add(2, "hour");

      // 使用提供的機台或默認A1
      const group = machineGroup || "A1";
      const area = group.match(/[A-Z]/)?.[0] || "A";

      const newItem = {
        id: `ORDER-${Date.now()}`,
        group: group,
        area: area,
        timeLineStatus: MACHINE_STATUS.IDLE,
        status: {
          startTime: centerTime.toDate(),
          endTime: endTime.toDate(),
          reason: "",
          product: "",
        },
        orderInfo: {
          scheduledStartTime: centerTime.toDate(),
          scheduledEndTime: endTime.toDate(),
          actualStartTime: null,
          actualEndTime: null,
          productId: "",
          productName: "新製令單",
          quantity: 0,
          completedQty: 0,
          process: "廠內-成型-IJ01",
          orderStatus: "尚未上機",
        },
        start: centerTime.toDate(),
        end: endTime.toDate(),
        className: "status-idle",
        content: "新製令單",
      };

      console.log("Creating new item:", newItem);

      // 明確設置狀態
      setDialogState({
        selectedItem: newItem,
        mode: "add",
        isOpen: true,
      });

      console.log("Dialog state after setting:", {
        selectedItem: newItem,
        mode: "add",
        isOpen: true,
      });
    } catch (error) {
      console.error("Add item failed:", error);
    }
  }, []);

  const handleMoveToNow = useCallback(() => {
    if (!timelineRef.current) return;

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
  }, [timeRange]);

  //* 對話框操作函數
  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
      selectedItem: null,
    }));
  }, []);

  const openDeleteDialog = useCallback(() => setIsDeleteDialogOpen(true), []);
  const closeDeleteDialog = useCallback(() => setIsDeleteDialogOpen(false), []);

  return {
    dialogState,
    setDialogState,
    isDeleteDialogOpen,
    handleSaveItem,
    handleDeleteItem,
    handleAddItem,
    handleMoveToNow,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
