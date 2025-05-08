/**
 * @file useTimelineEvents.js
 * @description 自定義 Hook，處理時間線事件管理
 * @version 1.0.0
 */

import { useCallback } from "react";

/**
 * 自定義 Hook，處理時間線事件設置與管理
 * @function useTimelineEvents
 * @param {Function} setDialogState - 設置對話框狀態的函數
 * @returns {Object} 事件管理相關功能
 */
function useTimelineEvents(setDialogState) {
  /**
   * 創建處理雙擊事件的函數
   * @function
   * @param {React.RefObject} itemsRef - 項目資料的引用
   * @returns {Function} 處理雙擊事件的函數
   */
  const createDoubleClickHandler = useCallback(
    (itemsRef) => (properties) => {
      // 確保點擊的是項目
      if (!properties.item) return;

      // 獲取被點擊的項目資料
      const clickedItem = itemsRef.current?.get(properties.item);
      if (clickedItem) {
        // 設置對話框狀態，開啟編輯模式
        setDialogState({
          selectedItem: clickedItem,
          mode: "edit",
          isOpen: true,
        });
      }
    },
    [setDialogState]
  );

  /**
   * 設置時間軸事件監聽器
   * @function
   * @param {Timeline} timeline - 時間軸實例
   * @param {React.RefObject} itemsRef - 項目資料的引用
   * @returns {Function} 清理事件監聽器的函數
   */
  const setupTimelineEvents = useCallback(
    (timeline, itemsRef) => {
      if (!timeline) return () => {};

      // 創建雙擊事件處理函數
      const handleDoubleClick = createDoubleClickHandler(itemsRef);

      // 註冊雙擊事件監聽器
      timeline.on("doubleClick", handleDoubleClick);

      // 返回清理函數
      return () => timeline?.off("doubleClick", handleDoubleClick);
    },
    [createDoubleClickHandler]
  );

  return {
    createDoubleClickHandler,
    setupTimelineEvents,
  };
}

export { useTimelineEvents };
