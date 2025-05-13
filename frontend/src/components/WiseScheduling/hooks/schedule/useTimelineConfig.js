/**
 * @file useTimelineConfig.js
 * @description 自定義 Hook，處理時間線配置選項
 * @version 1.1.0
 */

import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import {
  BASE_TIMELINE_OPTIONS,
  TIME_FORMAT_CONFIG,
} from "../../configs/validations/schedule/timeline/timelineOptions";
import { TIMELINE_STYLES } from "../../configs/validations/schedule/timeline/timelineConfigs";
import { getTimeWindow } from "../../utils/schedule/dateUtils";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import { createItemTemplate } from "../../components/schedule/TimelineContent";

//! =============== 1. 設定與常量 ===============
//* 時間線最大縮放範圍（10年的毫秒數）
const MAX_ZOOM_RANGE_MS = 1000 * 60 * 60 * 24 * 31 * 12 * 10;

//! =============== 4. 工具函數 ===============
/**
 * 檢查兩個時間範圍是否重疊
 * @param {Object} item1 - 第一個項目，包含 start 和 end 屬性
 * @param {Object} item2 - 第二個項目，包含 start 和 end 屬性
 * @returns {boolean} 如果時間重疊則返回 true，否則返回 false
 */
function hasTimeOverlap(item1, item2) {
  const item1Start = dayjs(item1.start);
  const item1End = dayjs(item1.end);
  const item2Start = dayjs(item2.start);
  const item2End = dayjs(item2.end);

  // 🧠 時間重疊邏輯：一個時段的開始在另一個的結束之前，且結束在另一個的開始之後
  return item1Start.isBefore(item2End) && item1End.isAfter(item2Start);
}

/**
 * 根據時間範圍獲取時間軸刻度顯示選項
 * @param {string} currentTimeRange - 當前時間範圍設定
 * @returns {Object} 時間軸刻度顯示選項
 */
function getTimeAxisOptions(currentTimeRange) {
  // ✨ 簡化條件返回
  return currentTimeRange === "hour"
    ? { timeAxis: { scale: "hour", step: 1 } }
    : {};
}

/**
 * 處理項目移動並檢查時間衝突
 * @param {Object} item - 被移動的項目資料
 * @param {Function} callback - 回調函數
 * @param {Object} itemsDataRef - 項目資料的引用
 */
function handleItemMove(item, callback, itemsDataRef) {
  // 製立單狀態的項目允許時間重疊
  if (item.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
    callback(item);
    return;
  }

  // 獲取同一機台的所有非製立單狀態項目
  const groupItems = itemsDataRef.current.get({
    filter: (groupItem) =>
      groupItem.group === item.group &&
      groupItem.id !== item.id &&
      groupItem.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED,
  });

  // 檢查是否與現有項目時間重疊
  const hasOverlap = groupItems.some((existingItem) =>
    hasTimeOverlap(item, existingItem)
  );

  if (hasOverlap) {
    console.warn("時間重疊，無法移動:", item.timeLineStatus);
    callback(null); // 拒絕移動
    return;
  }

  // 允許移動
  callback(item);
}

//! =============== 3. 核心功能 ===============
/**
 * 自定義 Hook，處理時間線配置選項
 * @function useTimelineConfig
 * @param {React.RefObject} itemsDataRef - 項目資料的引用
 * @param {string} timeRange - 當前時間範圍
 * @returns {Object} 時間線配置相關功能
 */
function useTimelineConfig(itemsDataRef, timeRange) {
  /**
   * 獲取時間軸的基本配置選項
   * @function
   * @returns {Object} 時間軸基本配置選項
   */
  const getBaseOptions = useCallback(() => {
    return {
      ...BASE_TIMELINE_OPTIONS,
      editable: {
        add: false,
        updateTime: true,
        updateGroup: true,
        remove: false,
      },
      format: TIME_FORMAT_CONFIG,
      onMove: (item, callback) => handleItemMove(item, callback, itemsDataRef),
      snap: null,
      margin: {
        item: { vertical: 8 },
      },
      zoomMax: MAX_ZOOM_RANGE_MS,
    };
  }, [itemsDataRef]);

  /**
   * 獲取時間視窗相關選項
   * @function
   * @param {string} currentTimeRange - 當前時間範圍設定
   * @returns {Object} 時間視窗選項
   */
  const getTimeWindowOptions = useCallback((currentTimeRange) => {
    const timeWindow = getTimeWindow(currentTimeRange);
    return {
      ...TIMELINE_STYLES[currentTimeRange],
      start: timeWindow.start.toDate(),
      end: timeWindow.end.toDate(),
      zoomMin: TIMELINE_STYLES[currentTimeRange].zoomMin,
    };
  }, []);

  /**
   * 生成完整的時間軸選項
   * @function
   * @returns {Object} 完整的時間軸配置選項
   */
  const getTimelineOptions = useCallback(
    () => ({
      ...getBaseOptions(),
      ...getTimeWindowOptions(timeRange),
      ...getTimeAxisOptions(timeRange),
      template: createItemTemplate,
    }),
    [timeRange, getBaseOptions, getTimeWindowOptions]
  );

  return {
    getBaseOptions,
    getTimeWindowOptions,
    getTimelineOptions,
    hasTimeOverlap,
  };
}

export { useTimelineConfig };
