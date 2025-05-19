//! =============== 1. 設定與常量 ===============
//* 時間相關常量配置
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

//* 預設配置
const DEFAULT_TIMEZONE = "Asia/Taipei";
const DATE_FORMATS = {
  fullDateTime: "YYYY-MM-DD HH:mm:ss",
  dateTime: "YYYY-MM-DD HH:mm",
  date: "YYYY-MM-DD",
  time: "HH:mm",
  isoDateTime: "YYYY-MM-DDTHH:mm", // HTML datetime-local 輸入格式
};

//! =============== 2. 初始化設定 ===============
//* 註冊 dayjs 插件
[isSameOrBefore, isSameOrAfter, isBetween, duration, utc, timezone].forEach(
  (plugin) => dayjs.extend(plugin)
);

dayjs.tz.setDefault(DEFAULT_TIMEZONE);

//! =============== 3. 核心功能 ===============
/**
 * @function getTimeWindow
 * @description 根據指定範圍獲取時間視窗
 * @param {string} range - 時間範圍 (hour|day|week|month)
 * @param {dayjs.Dayjs} centerTime - 中心時間點
 * @returns {Object} 包含開始和結束時間的視窗對象
 *
 * @example
 * const { start, end } = getTimeWindow('day');
 *
 * @notes
 * - 工作時間預設為早上 8 點開始
 * - 日期範圍結束時間為當天最後一小時
 */
export const getTimeWindow = (range, centerTime = dayjs()) => {
  const now = centerTime;
  const WORK_START_HOUR = 8;

  // 線性化建議的時間視窗，但不會限制用戶拖動
  const windows = {
    hour: {
      start: now.subtract(3, "hour"),
      end: now.add(3, "hour"),
    },
    day: {
      start: now.subtract(3, "day").hour(WORK_START_HOUR),
      end: now.add(3, "day").hour(WORK_START_HOUR),
    },
    week: {
      start: now.subtract(2, "week").hour(WORK_START_HOUR),
      end: now.add(2, "week").hour(WORK_START_HOUR),
    },
    month: {
      start: now.subtract(2, "month").hour(WORK_START_HOUR),
      end: now.add(2, "month").hour(WORK_START_HOUR),
    },
  };

  return windows[range] || windows.day;
};

//! =============== 4. 工具函數 ===============
/**
 * @function formatDate
 * @description 格式化日期為指定格式
 */
export const formatDate = (date, format = "YYYY-MM-DDTHH:mm") =>
  dayjs(date).format(format);

/**
 * @function parseDate
 * @description 解析日期字符串為 dayjs 對象
 */
export const parseDate = (dateString) => dayjs(dateString);

/**
 * @function isValidDate
 * @description 檢查日期是否有效
 */
export const isValidDate = (date) => dayjs(date).isValid();

/**
 * @function formatToFormDateTime
 * @description 轉換日期為表單所需的 datetime-local 格式
 * @param {Date|string|null} date - 要格式化的日期
 * @param {string} [defaultValue=""] - 當日期無效時返回的默認值
 * @returns {string} 格式化的日期字符串，格式爲 YYYY-MM-DDTHH:mm
 */
export const formatToFormDateTime = (date, defaultValue = "") => {
  // 如果沒有日期，返回默認值
  if (!date) return defaultValue;

  try {
    // 包裝為 dayjs 物件
    const dayjsObj = dayjs(date);

    // 檢查是否為有效日期
    if (!dayjsObj.isValid()) {
      console.warn("[formatToFormDateTime] Invalid date:", date);
      return defaultValue;
    }

    // 返回 HTML datetime-local 格式
    return dayjsObj.format(DATE_FORMATS.isoDateTime);
  } catch (error) {
    console.error("[formatToFormDateTime] Error:", error, { date });
    return defaultValue;
  }
};

/**
 * @function formatToVisDateTime
 * @description 轉換日期為 vis.js 所需格式
 */
export const formatToVisDateTime = (date) =>
  date ? dayjs(date).toDate() : null;

/**
 * @function safeParseDate
 * @description 安全解析日期字符串為 Dayjs 對象
 * @param {string|Date} date - 要解析的日期
 * @returns {object|null} dayjs 對象或空
 */
export const safeParseDate = (date) => {
  if (!date) return null;

  try {
    const dayjsObj = dayjs(date);
    return dayjsObj.isValid() ? dayjsObj : null;
  } catch (error) {
    console.error("[safeParseDate] Error:", error, { date });
    return null;
  }
};

/**
 * @function ensureFormDateTime
 * @description 確保日期為表單可用的格式，如果無效則使用所提供的默認值
 * @param {string|Date} date - 要格式化的日期
 * @param {string|Date} defaultDate - 當日期無效時使用的默認值
 * @returns {string} 格式化的日期字符串
 */
export const ensureFormDateTime = (date, defaultDate = new Date()) => {
  // 嘗試格式化提供的日期
  const formatted = formatToFormDateTime(date);

  // 如果成功格式化，返回結果
  if (formatted) return formatted;

  // 否則格式化默認日期
  return formatToFormDateTime(defaultDate, "");
};

/**
 * @function prepareFormDateValues
 * @description 為表單準備所有日期相關欄位的預設值
 * @param {Object} item - 項目數據
 * @returns {Object} 所有日期欄位格式化並更新的對象
 */
export const prepareFormDateValues = (item = {}) => {
  // 滿足 React Hook Form 的日期欄位
  return {
    start: formatToFormDateTime(item?.start || item?.status?.startTime),
    end: formatToFormDateTime(item?.end || item?.status?.endTime),
    // 保留其他表單欄位的值
    product: item?.status?.product || "",
    reason: item?.status?.reason || "", 
    // 製令單相關欄位
    productName: item?.orderInfo?.productName || "",
    process: item?.orderInfo?.process || "",
  };
};
