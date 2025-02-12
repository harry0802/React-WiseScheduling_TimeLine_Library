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

  const windows = {
    hour: {
      start: now.subtract(1, "hour"),
      end: now.add(1, "hour"),
    },
    day: {
      start: now.startOf("day").hour(WORK_START_HOUR),
      end: now.endOf("day").startOf("hour"),
    },
    week: {
      start: now.startOf("week").hour(WORK_START_HOUR),
      end: now.endOf("week").startOf("hour"),
    },
    month: {
      start: now.startOf("month").hour(WORK_START_HOUR),
      end: now.endOf("month").startOf("hour"),
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
 * @description 轉換日期為表單所需格式
 */
export const formatToFormDateTime = (date) =>
  date ? dayjs(date).format("YYYY-MM-DDTHH:mm") : "";

/**
 * @function formatToVisDateTime
 * @description 轉換日期為 vis.js 所需格式
 */
export const formatToVisDateTime = (date) =>
  date ? dayjs(date).toDate() : null;

export { DATE_FORMATS as dateFormats };
