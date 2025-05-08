/**
 * @file useTimelineInitialization.js
 * @description 自定義 Hook，處理時間線初始化和清理
 * @version 1.0.0
 */

import { useCallback } from "react";
import { Timeline } from "vis-timeline/standalone";

/**
 * 創建新的時間軸實例
 * @param {HTMLElement} container - 時間軸容器元素
 * @param {DataSet|Array} items - 時間軸項目資料
 * @param {DataSet|Array} groupsData - 時間軸群組資料
 * @param {Object} options - 時間軸配置選項
 * @returns {Timeline} 新建的時間軸實例
 */
const createTimeline = (container, items, groupsData, options) =>
  new Timeline(container, items, groupsData, options);

/**
 * 更新現有時間軸的選項和數據
 * @param {Timeline} timeline - 已存在的時間軸實例
 * @param {Object} options - 要更新的時間軸選項
 * @param {DataSet|Array} items - 新的項目資料
 * @param {DataSet|Array} groupsData - 新的群組資料
 * @returns {Timeline} 更新後的時間軸實例
 */
const updateTimeline = (timeline, options, items, groupsData) => {
  timeline.setOptions(options);
  timeline.setData({ items, groups: groupsData });
  return timeline;
};

/**
 * 清理時間軸資源，釋放記憶體
 * @param {Timeline} timeline - 要清理的時間軸實例
 * @returns {null} 返回空值表示已清理
 */
const destroyTimeline = (timeline) => {
  if (timeline) {
    timeline.destroy();
    return null;
  }
  return timeline;
};

/**
 * 自定義 Hook，處理時間線初始化和清理
 * @function useTimelineInitialization
 * @param {React.RefObject} containerRef - 容器元素引用
 * @param {React.RefObject} timelineRef - 時間軸實例引用
 * @param {React.RefObject} itemsDataRef - 項目數據引用
 * @param {Function} getTimelineOptions - 獲取時間軸選項的函數
 * @param {Array|DataSet} groups - 分組數據
 * @returns {Object} 初始化和清理相關功能
 */
function useTimelineInitialization(
  containerRef,
  timelineRef,
  itemsDataRef,
  getTimelineOptions,
  groups
) {
  /**
   * 初始化或更新時間軸實例
   * @function
   * @returns {Timeline|null} 時間軸實例或 null
   */
  const initializeTimeline = useCallback(() => {
    // 確保所需資源都已準備就緒
    if (!containerRef.current || !itemsDataRef.current || !groups) return null;

    const options = getTimelineOptions();

    // 根據當前狀態決定是創建還是更新時間軸
    if (timelineRef.current) {
      timelineRef.current = updateTimeline(
        timelineRef.current,
        options,
        itemsDataRef.current,
        groups
      );
    } else {
      // 首次創建，先清空容器
      containerRef.current.innerHTML = "";
      timelineRef.current = createTimeline(
        containerRef.current,
        itemsDataRef.current,
        groups,
        options
      );
    }

    // 將時間軸實例存入全局變量，便於調試
    window.timeline = timelineRef.current;
    if (!window.app) window.app = {};
    window.app.timelineData = itemsDataRef.current;

    return timelineRef.current;
  }, [containerRef, timelineRef, itemsDataRef, getTimelineOptions, groups]);

  /**
   * 清理時間軸實例
   * @function
   * @returns {void}
   */
  const cleanupTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current = destroyTimeline(timelineRef.current);
    }
  }, [timelineRef]);

  return {
    initializeTimeline,
    cleanupTimeline,
  };
}

export { useTimelineInitialization };
