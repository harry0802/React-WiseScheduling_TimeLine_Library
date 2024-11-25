/**
 * @file Time utilities using Day.js
 * @module timeUtils
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/zh-tw";

// 初始化插件
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale("zh-tw");

/**
 * 取得當前時間的 ISO 字符串
 * @returns {string} ISO 格式的當前時間字符串
 * @example
 * getNow() // => "2024-11-25T10:30:00.000+08:00"
 */
export const getNow = () => dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

/**
 * 格式化日期
 * @param {Date|string|number} date - 要格式化的日期
 * @param {string} [format="YYYY-MM-DD"] - 日期格式
 * @returns {string} 格式化後的日期字符串
 * @example
 * formatDate(new Date(), "YYYY/MM/DD") // => "2024/11/25"
 */
export const formatDate = (date, format = "YYYY-MM-DD") =>
  dayjs(date).format(format);

/**
 * 取得時間戳
 * @param {Date|string|number} [date] - 日期，默認為當前時間
 * @returns {number} 時間戳（毫秒）
 * @example
 * getTimestamp() // => 1700876400000
 */
export const getTimestamp = (date) =>
  date ? dayjs(date).valueOf() : dayjs().valueOf();

/**
 * 格式化為帶時區的 ISO 字符串
 * @param {Date} [date=new Date()] - 日期對象
 * @returns {string} 帶時區的 ISO 格式字符串
 */
export const formatISOWithTZ = (date = new Date()) =>
  dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

/**
 * 創建日期對象
 * @param {Date} [date=new Date()] - 日期對象
 * @returns {{createDate: string}} 包含格式化日期的對象
 */
export const createDateObject = (date = new Date()) => ({
  createDate: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
});

/**
 * 增加時間
 * @param {Date|string|number} date - 基準日期
 * @param {number} value - 要增加的數值
 * @param {string} unit - 時間單位 (year, month, day, hour, minute, second)
 * @returns {string} 計算後的日期字符串
 * @example
 * addTime(new Date(), 1, 'day') // => 明天的 ISO 字符串
 */
export const addTime = (date, value, unit) =>
  dayjs(date).add(value, unit).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

/**
 * 減少時間
 * @param {Date|string|number} date - 基準日期
 * @param {number} value - 要減少的數值
 * @param {string} unit - 時間單位
 * @returns {string} 計算後的日期字符串
 */
export const subtractTime = (date, value, unit) =>
  dayjs(date).subtract(value, unit).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

/**
 * 計算時間差
 * @param {Date|string|number} date1 - 第一個日期
 * @param {Date|string|number} date2 - 第二個日期
 * @param {string} [unit="millisecond"] - 返回的時間單位
 * @returns {number} 時間差
 */
export const diffTime = (date1, date2, unit = "millisecond") =>
  dayjs(date1).diff(date2, unit);

/**
 * 檢查日期順序
 * @param {Date|string|number} date1 - 第一個日期
 * @param {Date|string|number} date2 - 第二個日期
 * @returns {boolean} date1 是否在 date2 之前
 */
export const isBefore = (date1, date2) => dayjs(date1).isBefore(date2);

/**
 * 檢查日期順序
 * @param {Date|string|number} date1 - 第一個日期
 * @param {Date|string|number} date2 - 第二個日期
 * @returns {boolean} date1 是否在 date2 之後
 */
export const isAfter = (date1, date2) => dayjs(date1).isAfter(date2);

/**
 * 檢查是否為同一天
 * @param {Date|string|number} date1 - 第一個日期
 * @param {Date|string|number} date2 - 第二個日期
 * @returns {boolean} 是否為同一天
 */
export const isSameDay = (date1, date2) => dayjs(date1).isSame(date2, "day");

/**
 * 檢查日期是否在範圍內
 * @param {Date|string|number} date - 要檢查的日期
 * @param {Date|string|number} start - 開始日期
 * @param {Date|string|number} end - 結束日期
 * @returns {boolean} 是否在範圍內
 */
export const isBetween = (date, start, end) =>
  dayjs(date).isBetween(start, end);

/**
 * 獲取星期幾 (0-6, 0 為星期日)
 * @param {Date|string|number} date - 日期
 * @returns {number} 星期幾的數字表示
 */
export const getWeekday = (date) => dayjs(date).day();

/**
 * 檢查是否為週末
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否為週末
 */
export const isWeekend = (date) => {
  const day = getWeekday(date);
  return day === 0 || day === 6;
};

/**
 * 獲取月份天數
 * @param {Date|string|number} date - 日期
 * @returns {number} 該月的天數
 */
export const getDaysInMonth = (date) => dayjs(date).daysInMonth();

/**
 * 獲取相對時間描述
 * @param {Date|string|number} date - 日期
 * @returns {string} 相對時間描述（例如：3天前）
 */
export const getRelativeTime = (date) => dayjs(date).fromNow();

/**
 * 獲取日期範圍內的所有日期
 * @param {Date|string|number} start - 開始日期
 * @param {Date|string|number} end - 結束日期
 * @returns {string[]} 日期字符串數組
 */
export const getDateRange = (start, end) => {
  const dates = [];
  let current = dayjs(start);
  const endDate = dayjs(end);

  while (current.isSameOrBefore(endDate, "day")) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return dates;
};

/**
 * 驗證日期是否有效
 * @param {Date|string|number} date - 要驗證的日期
 * @returns {boolean} 是否為有效日期
 */
export const isValidDate = (date) => dayjs(date).isValid();

/**
 * 計算年齡
 * @param {Date|string|number} birthDate - 出生日期
 * @returns {number} 年齡
 */
export const calculateAge = (birthDate) => dayjs().diff(birthDate, "year");

/**
 * 日期格式化工具集合
 * @namespace
 */
export const formatters = {
  /**
   * 格式化為完整日期時間
   * @param {Date|string|number} date - 日期
   * @returns {string} 格式化後的字符串
   */
  fullDateTime: (date) => formatDate(date, "YYYY-MM-DD HH:mm:ss"),

  /**
   * 僅格式化日期部分
   * @param {Date|string|number} date - 日期
   * @returns {string} 格式化後的字符串
   */
  dateOnly: (date) => formatDate(date, "YYYY-MM-DD"),

  /**
   * 僅格式化時間部分
   * @param {Date|string|number} date - 日期
   * @returns {string} 格式化後的字符串
   */
  timeOnly: (date) => formatDate(date, "HH:mm:ss"),

  /**
   * 格式化為月-日
   * @param {Date|string|number} date - 日期
   * @returns {string} 格式化後的字符串
   */
  monthAndDay: (date) => formatDate(date, "MM-DD"),

  /**
   * 格式化為年-月
   * @param {Date|string|number} date - 日期
   * @returns {string} 格式化後的字符串
   */
  yearAndMonth: (date) => formatDate(date, "YYYY-MM"),

  /**
   * 轉換為 ISO 字符串
   * @param {Date|string|number} date - 日期
   * @returns {string} ISO 字符串
   */
  iso: (date) => dayjs(date).toISOString(),

  /**
   * 轉換為 UTC 格式
   * @param {Date|string|number} date - 日期
   * @returns {string} UTC 格式字符串
   */
  utc: (date) => dayjs(date).utc().format(),

  /**
   * 格式化為帶時區的 ISO 字符串
   * @param {Date} [date=new Date()] - 日期
   * @returns {string} 帶時區的 ISO 字符串
   */
  isoWithTZ: (date = new Date()) =>
    dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

  /**
   * 創建日期對象
   * @param {Date} [date=new Date()] - 日期
   * @returns {{createDate: string}} 包含格式化日期的對象
   */
  createDateObject: (date = new Date()) => ({
    createDate: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  }),
};

/**
 * 日期操作組合函數集合
 * @namespace
 */
export const dateFns = {
  /**
   * 檢查日期是否在指定範圍且是工作日
   * @param {Date|string|number} date - 要檢查的日期
   * @param {Date|string|number} start - 開始日期
   * @param {Date|string|number} end - 結束日期
   * @returns {boolean} 是否為範圍內的工作日
   */
  isWorkingDay: (date, start, end) =>
    isBetween(date, start, end) && !isWeekend(date),

  /**
   * 獲取兩個日期之間的工作日數量
   * @param {Date|string|number} start - 開始日期
   * @param {Date|string|number} end - 結束日期
   * @returns {number} 工作日數量
   */
  getWorkingDaysCount: (start, end) =>
    getDateRange(start, end).filter((date) => !isWeekend(date)).length,

  /**
   * 格式化時間範圍
   * @param {Date|string|number} start - 開始日期
   * @param {Date|string|number} end - 結束日期
   * @param {string} [format="YYYY-MM-DD"] - 日期格式
   * @returns {{start: string, end: string}} 格式化後的開始和結束日期
   */
  formatDateRange: (start, end, format = "YYYY-MM-DD") => ({
    start: formatDate(start, format),
    end: formatDate(end, format),
  }),

  /**
   * 檢查是否為同一時間單位
   * @param {Date|string|number} date1 - 第一個日期
   * @param {Date|string|number} date2 - 第二個日期
   * @param {string} [unit="day"] - 時間單位
   * @returns {boolean} 是否相同
   */
  isSame: (date1, date2, unit = "day") => dayjs(date1).isSame(date2, unit),
};

/**
 * 所有時間工具函數的集合
 * @const {Object} timeUtils
 */
export const timeUtils = {
  getNow,
  formatDate,
  getTimestamp,
  formatISOWithTZ,
  createDateObject,
  addTime,
  subtractTime,
  diffTime,
  isBefore,
  isAfter,
  isSameDay,
  isBetween,
  getWeekday,
  isWeekend,
  getDaysInMonth,
  getRelativeTime,
  getDateRange,
  isValidDate,
  calculateAge,
  formatters,
  dateFns,
};

export default timeUtils;
