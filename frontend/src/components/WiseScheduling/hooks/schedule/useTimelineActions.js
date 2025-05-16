// /**
//  * @file useTimelineActions.js
//  * @description 時間線操作 hook，封裝所有時間線交互操作
//  * @version 1.0.0
//  */

// import { useCallback } from "react";
// import dayjs from "dayjs";
// import { getTimeWindow } from "../../utils/schedule/dateUtils";
// import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
// import { getStatusClass } from "../../configs/validations/schedule/constants";

// /**
//  * @function useTimelineActions
//  * @description 時間線操作 hook，封裝所有時間線交互操作
//  * @param {Object} options - 配置選項
//  * @param {React.RefObject} options.timelineRef - 時間線實例的引用
//  * @param {React.RefObject} options.itemsDataRef - 項目數據的引用
//  * @param {Object} options.timelineState - 時間線狀態
//  * @returns {Object} 時間線操作方法
//  */
// export function useTimelineActions({
//   timelineRef,
//   itemsDataRef,
//   timelineState,
//   groups,
// }) {
//   const {
//     timeRange,
//     selectedArea,
//     openItemDialog,
//     closeItemDialog,
//     openDeleteDialog,
//     closeDeleteDialog,
//   } = timelineState;

//   //! =============== 1. 輔助函數 ===============
//   /**
//    * @function getItemTiming
//    * @description 獲取項目的時間信息
//    * @param {Object} item - 項目數據
//    * @returns {Object} 開始和結束時間
//    */
//   const getItemTiming = useCallback((item) => {
//     if (item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
//       return {
//         start: dayjs(item.orderInfo.scheduledStartTime).toDate(),
//         end: dayjs(item.orderInfo.scheduledEndTime).toDate(),
//       };
//     }

//     const start = dayjs(item.status.startTime).toDate();
//     const end = item.status.endTime
//       ? dayjs(item.status.endTime).toDate()
//       : dayjs(item.status.startTime).add(2, "hour").toDate();

//     return { start, end };
//   }, []);

//   /**
//    * @function getEditableConfig
//    * @description 判斷項目的可編輯性
//    * @param {string} timeLineStatus - 時間軸狀態
//    * @param {string} orderStatus - 訂單狀態
//    * @returns {Object} 可編輯配置
//    */
//   const getEditableConfig = useCallback((timeLineStatus, orderStatus) => {
//     if (timeLineStatus === "製令單") {
//       return orderStatus === "尚未上機"
//         ? { updateTime: true, updateGroup: true, remove: false }
//         : { updateTime: false, updateGroup: false, remove: true };
//     }
//     return { updateTime: false, updateGroup: false, remove: true };
//   }, []);

//   //! =============== 2. 項目操作 ===============
//   /**
//    * 保存項目
//    * @function
//    * @param {Object} updatedItem - 更新後的項目
//    * @returns {Promise<void>}
//    */
//   const handleSaveItem = useCallback(
//     async (updatedItem) => {
//       if (!itemsDataRef.current) return;

//       try {
//         const areaMatch = updatedItem.group?.match(/[A-Z]/);
//         const processedItem = {
//           ...updatedItem,
//           className: getStatusClass(updatedItem.timeLineStatus),
//           ...getItemTiming(updatedItem),
//           area: areaMatch?.[0] || "",
//           updateTime: false,
//           editable: getEditableConfig(
//             updatedItem.timeLineStatus,
//             updatedItem.orderInfo.orderStatus
//           ),
//         };

//         // 除了 OrderCreated 以外的其他狀態，檢查時間重疊
//         if (updatedItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED) {
//           // 查找同一組別的其他項目，不包含自己和 OrderCreated 狀態
//           const existingItems = itemsDataRef.current.get({
//             filter: function (item) {
//               return (
//                 item.id !== updatedItem.id &&
//                 item.group === updatedItem.group &&
//                 item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
//               );
//             },
//           });

//           // 檢查時間重疊
//           const itemStart = dayjs(processedItem.start);
//           const itemEnd = dayjs(processedItem.end);

//           const hasOverlap = existingItems.some((existingItem) => {
//             const existingStart = dayjs(existingItem.start);
//             const existingEnd = dayjs(existingItem.end);

//             return (
//               (itemStart.isBefore(existingEnd) &&
//                 itemEnd.isAfter(existingStart)) ||
//               itemStart.isSame(existingStart) ||
//               itemEnd.isSame(existingEnd)
//             );
//           });

//           if (hasOverlap) {
//             throw new Error(
//               "時間重疊：除了「製令單」外的其他狀態都不允許時間重疊"
//             );
//           }
//         }

//         // 不同的保存模式
//         const action =
//           timelineState.dialogState.mode === "add" ? "add" : "update";
//         itemsDataRef.current[action](processedItem);
//         closeItemDialog();
//       } catch (error) {
//         console.error("Save item failed:", error);
//         alert(error.message); // 顯示錯誤消息
//       }
//     },
//     [
//       getItemTiming,
//       getEditableConfig,
//       itemsDataRef,
//       timelineState.dialogState.mode,
//       closeItemDialog,
//     ]
//   );

//   /**
//    * 刪除項目
//    * @function
//    * @returns {void}
//    */
//   const handleDeleteItem = useCallback(() => {
//     if (!timelineState.dialogState.selectedItem?.id || !itemsDataRef.current)
//       return;

//     try {
//       itemsDataRef.current.remove(timelineState.dialogState.selectedItem.id);
//       closeDeleteDialog();
//       closeItemDialog();
//     } catch (error) {
//       console.error("Delete item failed:", error);
//     }
//   }, [
//     timelineState.dialogState.selectedItem,
//     itemsDataRef,
//     closeDeleteDialog,
//     closeItemDialog,
//   ]);

//   /**
//    * 添加新項目
//    * @function
//    * @param {Date} startTime - 開始時間
//    * @param {string} machineGroup - 機台組
//    * @returns {void}
//    */
//   const handleAddItem = useCallback(
//     (startTime, machineGroup) => {
//       if (!timelineRef.current) return;

//       try {
//         // 使用提供的時間或當前時間
//         const centerTime = startTime ? dayjs(startTime) : dayjs();
//         const endTime = centerTime.add(2, "hour");

//         // 使用提供的機台或默認 selectedArea + 1
//         const group = machineGroup || `${selectedArea}1`;
//         const area = group.match(/[A-Z]/)?.[0] || selectedArea;

//         const newItem = {
//           id: `ORDER-${Date.now()}`,
//           group: group,
//           area: area,
//           timeLineStatus: MACHINE_STATUS.IDLE,
//           status: {
//             startTime: centerTime.toDate(),
//             endTime: endTime.toDate(),
//             reason: "",
//             product: "",
//           },
//           orderInfo: {
//             scheduledStartTime: centerTime.toDate(),
//             scheduledEndTime: endTime.toDate(),
//             actualStartTime: null,
//             actualEndTime: null,
//             productId: "",
//             productName: "新製令單",
//             quantity: 0,
//             completedQty: 0,
//             process: "廠內-成型-IJ01",
//             orderStatus: "尚未上機",
//           },
//           start: centerTime.toDate(),
//           end: endTime.toDate(),
//           className: "status-idle",
//           content: "新製令單",
//         };

//         // 開啟添加對話框並傳入新項目
//         openItemDialog(newItem, "add");
//       } catch (error) {
//         console.error("Add item failed:", error);
//       }
//     },
//     [timelineRef, selectedArea, openItemDialog]
//   );

//   /**
//    * 移動到當前時間
//    * @function
//    * @returns {void}
//    */
//   const handleMoveToNow = useCallback(() => {
//     if (!timelineRef.current) return;

//     try {
//       const timeWindow = getTimeWindow(timeRange, dayjs());
//       timelineRef.current.setWindow(
//         timeWindow.start.toDate(),
//         timeWindow.end.toDate(),
//         { animation: true }
//       );
//     } catch (error) {
//       console.error("Move to current time failed:", error);
//     }
//   }, [timelineRef, timeRange]);

//   //! =============== 3. 事件處理 ===============
//   /**
//    * 處理雙擊事件
//    * @function
//    * @param {Object} properties - 事件屬性
//    * @returns {void}
//    */
//   const handleDoubleClick = useCallback(
//     (properties) => {
//       // 確保點擊的是項目
//       if (!properties.item || !itemsDataRef.current) return;

//       // 獲取被點擊的項目資料
//       const clickedItem = itemsDataRef.current.get(properties.item);
//       if (clickedItem) {
//         // 開啟編輯對話框
//         openItemDialog(clickedItem, "edit");
//       }
//     },
//     [itemsDataRef, openItemDialog]
//   );

//   /**
//    * 設置事件監聽器
//    * @function
//    * @param {Timeline} timeline - 時間軸實例
//    * @returns {Function} 清理事件監聽器的函數
//    */
//   const setupEventListeners = useCallback(
//     (timeline) => {
//       if (!timeline) return () => {};

//       // 註冊雙擊事件監聽器
//       timeline.on("doubleClick", handleDoubleClick);

//       // 返回清理函數
//       return () => timeline.off("doubleClick", handleDoubleClick);
//     },
//     [handleDoubleClick]
//   );

//   // 返回所有操作方法
//   return {
//     handleSaveItem,
//     handleDeleteItem,
//     handleAddItem,
//     handleMoveToNow,
//     setupEventListeners,
//   };
// }
