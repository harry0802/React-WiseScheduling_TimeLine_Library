/**
 * @file useTimelineDialogs.js
 * @description 與對話框管理器集成的 hook
 * @version 1.2.0
 */

import { useEffect, useCallback } from "react";
import { DialogManager } from "../../components/schedule/DialogManager";
import dayjs from "dayjs";
import { MACHINE_STATUS, getStatusClass } from "../../configs/validations/schedule/constants";
import { getTimeWindow } from "../../utils/schedule/dateUtils";

/**
 * @function useTimelineDialogs
 * @description 處理與對話框管理器的集成
 * @param {Object} options - 配置選項
 * @param {React.RefObject} options.itemsDataRef - 項目數據引用
 * @param {Array} options.groups - 分組數據
 * @param {Object} [options.timelineRef] - 時間軸組件的參考（可選）
 * @param {string} [options.timeRange] - 時間範圍（可選）
 * @returns {Object} 對話框操作方法
 */
export function useTimelineDialogs({ itemsDataRef, groups, timelineRef, timeRange }) {
  // 設置 groups 數據
  useEffect(() => {
    if (groups) {
      DialogManager.setGroups(groups);
    }
  }, [groups]);

  /**
   * @function getItemTiming
   * @description 獲取項目的時間信息
   * @param {Object} item - 項目數據
   * @returns {Object} 開始和結束時間
   */
  const getItemTiming = useCallback((item) => {
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
  }, []);

  /**
   * @function getEditableConfig
   * @description 判斷項目的可編輯性
   * @param {string} timeLineStatus - 時間軸狀態
   * @param {string} orderStatus - 訂單狀態
   * @returns {Object} 可編輯配置
   */
  const getEditableConfig = useCallback((timeLineStatus, orderStatus) => {
    if (timeLineStatus === "製立單") {
      return orderStatus === "尚未上機"
        ? { updateTime: true, updateGroup: true, remove: false }
        : { updateTime: false, updateGroup: false, remove: true };
    }
    return { updateTime: false, updateGroup: false, remove: true };
  }, []);

  // 處理保存項目
  const handleSaveItem = useCallback(
    (updatedItem) => {
      if (!itemsDataRef.current) return;

      try {
        console.log("🚀 ~ useTimelineDialogs ~ itemsDataRef:", itemsDataRef);
        
        const areaMatch = updatedItem.group?.match(/[A-Z]/);
        const processedItem = {
          ...updatedItem,
          className: getStatusClass(updatedItem.timeLineStatus),
          ...getItemTiming(updatedItem),
          area: areaMatch?.[0] || "",
          updateTime: false,
          editable: getEditableConfig(
            updatedItem.timeLineStatus,
            updatedItem.orderInfo?.orderStatus
          ),
        };

        // 除了 OrderCreated 以外的其他狀態，檢查時間重疊
        if (updatedItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED) {
          // 查找同一組別的其他項目，不包含自己和 OrderCreated 狀態
          const existingItems = itemsDataRef.current.get({
            filter: function (item) {
              return (
                item.id !== updatedItem.id &&
                item.group === updatedItem.group &&
                item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
              );
            },
          });

          // 檢查時間重疊
          const itemStart = dayjs(processedItem.start);
          const itemEnd = dayjs(processedItem.end);

          const hasOverlap = existingItems.some((existingItem) => {
            const existingStart = dayjs(existingItem.start);
            const existingEnd = dayjs(existingItem.end);

            return (
              (itemStart.isBefore(existingEnd) &&
                itemEnd.isAfter(existingStart)) ||
              itemStart.isSame(existingStart) ||
              itemEnd.isSame(existingEnd)
            );
          });

          if (hasOverlap) {
            throw new Error(
              "時間重疊：除了「製立單」外的其他狀態都不允許時間重疊"
            );
          }
        }

        const action = updatedItem.id ? "update" : "add";
        itemsDataRef.current[action](processedItem);
      } catch (error) {
        console.error("Save item failed:", error);
        alert(error.message);
      }
    },
    [itemsDataRef, getItemTiming, getEditableConfig]
  );

  // 處理刪除項目
  const handleDeleteItem = useCallback(
    (itemId) => {
      if (!itemId || !itemsDataRef.current) return;

      try {
        itemsDataRef.current.remove(itemId);
      } catch (error) {
        console.error("Delete item failed:", error);
      }
    },
    [itemsDataRef]
  );

  // 添加項目
  const handleAddItem = useCallback(
    (startTime, machineGroup) => {
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

        // 使用對話框管理器打開項目對話框，確保傳遞 groups
        DialogManager.openItemDialog(newItem, "add", groups);
      } catch (error) {
        console.error("Add item failed:", error);
      }
    },
    [groups]
  );

  // 編輯項目
  const handleEditItem = useCallback(
    (item) => {
      if (!item) return;

      // 使用對話框管理器打開項目對話框，確保傳遞 groups
      DialogManager.openItemDialog(item, "edit", groups);
    },
    [groups]
  );

  // 移動到當前時間（如果提供了 timelineRef 和 timeRange）
  const handleMoveToNow = useCallback(() => {
    if (!timelineRef || !timelineRef.current) return;

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
    // 監聽保存事件
    const saveUnsubscribe = DialogManager.onSaveItem(handleSaveItem);

    // 監聽刪除確認事件
    const deleteUnsubscribe = DialogManager.onConfirmDelete(handleDeleteItem);

    // 返回清理函數
    return () => {
      saveUnsubscribe();
      deleteUnsubscribe();
    };
  }, [handleSaveItem, handleDeleteItem]);

  return {
    handleAddItem,
    handleEditItem,
    handleSaveItem,
    handleDeleteItem,
    handleMoveToNow, // 新增移動到當前時間功能
    // 額外提供工具函數可供外部使用
    getItemTiming,
    getEditableConfig,
  };
}
