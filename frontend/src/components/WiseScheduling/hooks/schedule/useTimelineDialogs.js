/**
 * @file useTimelineDialogs.js
 * @description 與對話框管理器集成的 hook
 * @version 2.0.0 - 2025-05-13 函數化重構
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
export function useTimelineDialogs({
  itemsDataRef,
  groups,
  timelineRef,
  timeRange,
}) {
  // 獲取資料修改API
  const [changeWorkOrder] = useChangeWorkOrderMutation();

  // 設置 groups 數據
  useEffect(() => {
    if (groups) {
      setGroups(groups);
    }
  }, [groups]);

  /**
   * @function getItemTiming
   * @description 獲取項目的時間信息，確保按照項目類型正確獲取時間
   * @param {Object} item - 項目數據
   * @returns {Object} 開始和結束時間
   */
  const getItemTiming = useCallback((item) => {
    // 檢查是否為製令單
    const isWorkOrder = item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;

    // 製令單使用 orderInfo 的時間
    if (isWorkOrder && item.orderInfo) {
      return {
        start: dayjs(item.orderInfo.scheduledStartTime || item.start).toDate(),
        end: dayjs(
          item.orderInfo.scheduledEndTime ||
            item.end ||
            dayjs(item.orderInfo.scheduledStartTime).add(1, "hour")
        ).toDate(),
      };
    }

    // 機台狀態使用 status 的時間
    if (!isWorkOrder && item.status) {
      const start = dayjs(item.status.startTime || item.start).toDate();
      const end = item.status.endTime
        ? dayjs(item.status.endTime).toDate()
        : item.end
        ? dayjs(item.end).toDate()
        : dayjs(item.status.startTime || item.start)
            .add(2, "hour")
            .toDate();

      return { start, end };
    }

    // 備用方案：使用項目本身的時間
    return {
      start: dayjs(item.start || new Date()).toDate(),
      end: dayjs(item.end || dayjs(item.start).add(1, "hour")).toDate(),
    };
  }, []);

  /**
   * @function getEditableConfig
   * @description 判斷項目的可編輯性
   * @param {string} timeLineStatus - 時間軸狀態
   * @param {string} orderStatus - 訂單狀態
   * @returns {Object} 可編輯配置
   */
  const getEditableConfig = useCallback((timeLineStatus, orderStatus) => {
    // 檢查是否為製令單
    const isWorkOrder = timeLineStatus === MACHINE_STATUS.ORDER_CREATED;

    if (isWorkOrder) {
      return orderStatus === "尚未上機"
        ? { updateTime: true, updateGroup: true, remove: false }
        : { updateTime: false, updateGroup: false, remove: true };
    }
    return { updateTime: false, updateGroup: false, remove: true };
  }, []);

  // 處理保存項目
  const handleSaveItem = useCallback(
    (updatedItem) => {
      console.log("🚀 ~ updatedItem:", updatedItem);
      if (!itemsDataRef.current) return;

      try {
        console.log("🚀 ~ useTimelineDialogs ~ updatedItem:", updatedItem);

        // 檢查 updatedItem 是否有正確的結構
        if (!updatedItem || !updatedItem.internal) {
          console.error("Invalid item format:", updatedItem);
          throw new Error("項目格式不正確，請檢查資料結構");
        }

        // 判斷是製令單還是機台狀態
        const isOrderItem =
          updatedItem.internal.timeLineStatus === MACHINE_STATUS.ORDER_CREATED;

        // 根據項目類型準備不同的數據
        let processedItem;

        if (isOrderItem) {
          // 製令單項目處理 - 只使用 orderInfo，不使用 status
          processedItem = {
            ...updatedItem.internal,
            className: getStatusClass(updatedItem.internal.timeLineStatus),
            start: dayjs(
              updatedItem.internal.orderInfo?.scheduledStartTime ||
                updatedItem.internal.start
            ).toDate(),
            end: dayjs(
              updatedItem.internal.orderInfo?.scheduledEndTime ||
                updatedItem.internal.end
            ).toDate(),
            area:
              updatedItem.internal.area ||
              updatedItem.internal.group?.match(/[A-Z]/)?.[0] ||
              "",
            updateTime: false,
            editable: getEditableConfig(
              updatedItem.internal.timeLineStatus,
              updatedItem.internal.orderInfo?.orderStatus
            ),
            // 確保 status 為 null，避免混用
            status: null,
          };
        } else {
          // 機台狀態項目處理 - 只使用 status，不使用 orderInfo
          processedItem = {
            ...updatedItem.internal,
            className: getStatusClass(updatedItem.internal.timeLineStatus),
            start: dayjs(
              updatedItem.internal.status?.startTime ||
                updatedItem.internal.start
            ).toDate(),
            end: dayjs(
              updatedItem.internal.status?.endTime || updatedItem.internal.end
            ).toDate(),
            area:
              updatedItem.internal.area ||
              updatedItem.internal.group?.match(/[A-Z]/)?.[0] ||
              "",
            updateTime: false,
            editable: getEditableConfig(
              updatedItem.internal.timeLineStatus,
              null
            ),
            // 確保 orderInfo 為 null，避免混用
            orderInfo: null,
          };

          // 除了製令單以外的其他狀態，檢查時間重疊
          // 查找同一組別的其他項目，不包含自己和製令單狀態
          const existingItems = itemsDataRef.current.get({
            filter: function (item) {
              return (
                item.id !== updatedItem.internal.id &&
                item.group === updatedItem.internal.group &&
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
              "時間重疊：除了「製令單」外的其他狀態都不允許時間重疊"
            );
          }
        }

        // 更新時間線顯示
        const action = updatedItem.internal.id ? "update" : "add";
        itemsDataRef.current[action](processedItem);

        // 使用 API 格式提交到後端
        console.log("🚀 ~ 提交到API的資料:", updatedItem.api);

        // 如果有工單號，使用 changeWorkOrder API 更新資料
        if (updatedItem.api) {
          try {
            changeWorkOrder(updatedItem.api)
              .unwrap()
              .then((response) => {
                console.log("API 更新成功:", response);
              })
              .catch((error) => {
                console.error("API 更新失敗:", error);
                // 不向用戶顯示此錯誤，因為本地界面已更新
              });
          } catch (apiError) {
            console.error("API 調用異常:", apiError);
          }
        }
      } catch (error) {
        console.error("Save item failed:", error);
        alert(error.message);
      }
    },
    [itemsDataRef, getItemTiming, getEditableConfig, changeWorkOrder]
  );

  // 處理刪除項目
  const handleDeleteItem = useCallback(
    (itemId) => {
      if (!itemId || !itemsDataRef.current) return;

      try {
        // 獲取項目數據
        const item = itemsDataRef.current.get(itemId);

        // 檢查是否為製令單項目
        if (item && item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
          // 製令單不允許刪除
          throw new Error("無法刪除製令單，製令單不允許被刪除");
        }

        // 刪除非製令單項目
        itemsDataRef.current.remove(itemId);
      } catch (error) {
        console.error("Delete item failed:", error);
        alert(error.message || "刪除項目失敗");
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

        // 創建機台狀態項目 - 只使用 status
        const newItem = {
          id: `ITEM-${Date.now()}`,
          group: group,
          area: area,
          timeLineStatus: MACHINE_STATUS.IDLE, // 默認為待機狀態
          // 機台狀態使用 status，不使用 orderInfo
          status: {
            startTime: centerTime.toDate(),
            endTime: endTime.toDate(),
            reason: "",
            product: "",
          },
          orderInfo: null, // 確保不混用
          start: centerTime.toDate(),
          end: endTime.toDate(),
          className: "status-idle",
          content: "新狀態",
        };

        // 使用對話框管理器打開項目對話框，確保傳遞 groups
        openItemDialog(newItem, "add", groups);
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
      openItemDialog(item, "edit", groups);
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
    const saveUnsubscribe = onSaveItem(handleSaveItem);

    // 監聽刪除確認事件
    const deleteUnsubscribe = onConfirmDelete(handleDeleteItem);

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
