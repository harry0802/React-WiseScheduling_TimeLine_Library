// /**
//  * @file useTimeline.js
//  * @description 整合時間線所有功能的主 hook
//  * @version 1.0.0
//  */

// import { useEffect, useMemo } from "react";
// import { useTimelineCore } from "./useTimelineCore";
// import { useTimelineState } from "./useTimelineState";
// import { useTimelineActions } from "./useTimelineActions";
// import { useTimelineData } from "./useTimelineData";
// import { useTimelineConfig } from "./useTimelineConfig";

// /**
//  * @function useTimeline
//  * @description 整合時間線所有功能的主 hook
//  * @param {Object} options - 配置選項
//  * @param {Array} options.machineList - 機台列表
//  * @returns {Object} 時間線所有功能
//  */
// export function useTimeline({ machineList }) {
//   // 獲取時間線數據
//   const { itemsDataRef, groups } = useTimelineData(machineList);

//   // 管理時間線狀態
//   const timelineState = useTimelineState();
//   const { timeRange } = timelineState;

//   // 獲取時間線配置
//   const { getTimelineOptions } = useTimelineConfig(itemsDataRef, timeRange);

//   // 管理時間線核心功能
//   const timelineCore = useTimelineCore({
//     getTimelineOptions,
//     groups,
//     itemsDataRef
//   });

//   // 管理時間線操作
//   const timelineActions = useTimelineActions({
//     timelineRef: timelineCore.timelineRef,
//     itemsDataRef,
//     timelineState,
//     groups
//   });

//   // 初始化時間線並設置事件監聽器
//   useEffect(() => {
//     try {
//       // 初始化時間線
//       const timeline = timelineCore.initializeTimeline();

//       // 設置事件監聽器
//       const cleanupEvents = timelineActions.setupEventListeners(timeline);

//       // 返回清理函數
//       return () => {
//         cleanupEvents();
//         timelineCore.cleanupTimeline();
//       };
//     } catch (error) {
//       console.error("Timeline initialization failed:", error);
//       return () => {};
//     }
//   }, [
//     timelineCore.initializeTimeline,
//     timelineCore.cleanupTimeline,
//     timelineActions.setupEventListeners
//   ]);

//   // 創建暴露給組件的 API
//   const timelineAPI = useMemo(() => ({
//     // 核心引用
//     containerRef: timelineCore.containerRef,
//     timelineRef: timelineCore.timelineRef,

//     // 數據相關
//     itemsDataRef,
//     groups,

//     // 狀態相關
//     ...timelineState,

//     // 操作相關
//     ...timelineActions,

//     // 核心方法
//     refreshTimeline: timelineCore.refreshTimeline
//   }), [
//     timelineCore.containerRef,
//     timelineCore.timelineRef,
//     timelineCore.refreshTimeline,
//     itemsDataRef,
//     groups,
//     timelineState,
//     timelineActions
//   ]);

//   return timelineAPI;
// }
