// /**
//  * @file useTimelineCore.js
//  * @description 時間線核心管理 hook，處理時間線的初始化、渲染和資源管理
//  * @version 1.0.0
//  */

// import { useRef, useCallback, useEffect } from "react";
// import { Timeline } from "vis-timeline/standalone";

// /**
//  * @function useTimelineCore
//  * @description 時間線核心管理 hook，負責時間線的初始化、渲染和資源管理
//  * @param {Object} options - 配置選項
//  * @param {Function} options.getTimelineOptions - 獲取時間線選項的函數
//  * @param {Array|DataSet} options.groups - 時間線分組數據
//  * @param {React.RefObject} options.itemsDataRef - 項目數據的引用
//  * @returns {Object} 時間線核心管理方法
//  */
// export function useTimelineCore({ getTimelineOptions, groups, itemsDataRef }) {
//   // 🧠 使用 ref 存儲時間線實例和容器引用
//   const timelineRef = useRef(null);
//   const containerRef = useRef(null);

//   /**
//    * 創建時間線實例
//    * @function
//    * @private
//    * @param {HTMLElement} container - 時間線容器元素
//    * @param {DataSet|Array} items - 時間線項目資料
//    * @param {DataSet|Array} groupsData - 時間線群組資料
//    * @param {Object} options - 時間線配置選項
//    * @returns {Timeline} 新建的時間線實例
//    */
//   const createTimeline = useCallback(
//     (container, items, groupsData, options) => {
//       // 💡 創建前先清空容器內容
//       if (container) {
//         container.innerHTML = "";
//       }
//       return new Timeline(container, items, groupsData, options);
//     },
//     []
//   );

//   /**
//    * 更新現有時間線的選項和數據
//    * @function
//    * @private
//    * @param {Timeline} timeline - 已存在的時間線實例
//    * @param {Object} options - 要更新的時間線選項
//    * @param {DataSet|Array} items - 新的項目資料
//    * @param {DataSet|Array} groupsData - 新的群組資料
//    * @returns {Timeline} 更新後的時間線實例
//    */
//   const updateTimeline = useCallback((timeline, options, items, groupsData) => {
//     if (timeline) {
//       timeline.setOptions(options);
//       timeline.setData({ items, groups: groupsData });
//     }
//     return timeline;
//   }, []);

//   /**
//    * 初始化或更新時間軸實例
//    * @function
//    * @returns {Timeline|null} 時間軸實例或 null
//    */
//   const initializeTimeline = useCallback(() => {
//     // 確保所需資源都已準備就緒
//     if (!containerRef.current || !itemsDataRef.current || !groups) return null;

//     const options = getTimelineOptions();

//     // 根據當前狀態決定是創建還是更新時間軸
//     if (timelineRef.current) {
//       timelineRef.current = updateTimeline(
//         timelineRef.current,
//         options,
//         itemsDataRef.current,
//         groups
//       );
//     } else {
//       timelineRef.current = createTimeline(
//         containerRef.current,
//         itemsDataRef.current,
//         groups,
//         options
//       );
//     }

//     // 將時間軸實例存入全局變量，便於調試
//     window.timeline = timelineRef.current;
//     if (!window.app) window.app = {};
//     window.app.timelineData = itemsDataRef.current;

//     return timelineRef.current;
//   }, [
//     createTimeline,
//     updateTimeline,
//     getTimelineOptions,
//     groups,
//     itemsDataRef,
//   ]);

//   /**
//    * 清理時間線資源，釋放記憶體
//    * @function
//    * @returns {void}
//    */
//   const cleanupTimeline = useCallback(() => {
//     if (timelineRef.current) {
//       timelineRef.current.destroy();
//       timelineRef.current = null;
//     }
//   }, []);

//   /**
//    * 手動觸發時間線更新
//    * @function
//    * @returns {void}
//    */
//   const refreshTimeline = useCallback(() => {
//     if (timelineRef.current) {
//       timelineRef.current.redraw();
//     }
//   }, []);

//   // 返回時間線核心管理方法和引用
//   return {
//     timelineRef,
//     containerRef,
//     initializeTimeline,
//     cleanupTimeline,
//     refreshTimeline,
//   };
// }
