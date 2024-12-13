/**
 * @file Advanced time utilities using Day.js
 * @module timeUtils
 * @version 1.0.0
 */

//! =============== 1. 基礎配置 ===============
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/zh-tw";

//* 初始化 Day.js 插件和語系
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale("zh-tw");

//! =============== 2. 核心日期操作 ===============
/**
 * @namespace coreUtils
 * @description 核心日期操作函數集合
 */
const coreUtils = {
  /**
   * 取得當前時間的 ISO 字符串
   * @returns {string} ISO 格式的當前時間
   */
  getNow: () => dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

  /**
   * 格式化日期
   * @param {Date|string|number} date - 日期
   * @param {string} [format="YYYY-MM-DD"] - 格式
   * @returns {string} 格式化後的日期
   */
  formatDate: (date, format = "YYYY-MM-DD") => dayjs(date).format(format),

  /**
   * 取得時間戳
   * @param {Date|string|number} [date] - 日期
   * @returns {number} 時間戳（毫秒）
   */
  getTimestamp: (date) => (date ? dayjs(date).valueOf() : dayjs().valueOf()),

  /**
   * 轉換為帶時區的 ISO 格式
   * @param {Date} [date=new Date()] - 日期
   * @returns {string} ISO 格式字符串
   */
  formatISOWithTZ: (date = new Date()) =>
    dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
};

//! =============== 3. 時間計算 ===============
/**
 * @namespace timeCalculations
 * @description 時間計算相關函數
 */
const timeCalculations = {
  /**
   * 增加時間
   * @param {Date|string|number} date - 基準日期
   * @param {number} value - 增加值
   * @param {string} unit - 單位
   * @returns {string} 計算後的日期
   */
  addTime: (date, value, unit) =>
    dayjs(date).add(value, unit).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

  /**
   * 減少時間
   * @param {Date|string|number} date - 基準日期
   * @param {number} value - 減少值
   * @param {string} unit - 單位
   * @returns {string} 計算後的日期
   */
  subtractTime: (date, value, unit) =>
    dayjs(date).subtract(value, unit).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

  /**
   * 計算時間差
   * @param {Date|string|number} date1 - 第一個日期
   * @param {Date|string|number} date2 - 第二個日期
   * @param {string} [unit="millisecond"] - 單位
   * @returns {number} 時間差
   */
  diffTime: (date1, date2, unit = "millisecond") =>
    dayjs(date1).diff(date2, unit),

  /**
   * 計算年齡
   * @param {Date|string|number} birthDate - 出生日期
   * @returns {number} 年齡
   */
  calculateAge: (birthDate) => dayjs().diff(birthDate, "year"),
};

//! =============== 4. 日期比較 ===============
/**
 * @namespace dateComparisons
 * @description 日期比較相關函數
 */
const dateComparisons = {
  /**
   * 檢查日期順序
   * @param {Date|string|number} date1 - 第一個日期
   * @param {Date|string|number} date2 - 第二個日期
   * @returns {boolean} 比較結果
   */
  isBefore: (date1, date2) => dayjs(date1).isBefore(date2),
  isAfter: (date1, date2) => dayjs(date1).isAfter(date2),
  isSameDay: (date1, date2) => dayjs(date1).isSame(date2, "day"),
  isBetween: (date, start, end) => dayjs(date).isBetween(start, end),
};

//! =============== 5. 工作日相關 ===============
/**
 * @namespace workdayUtils
 * @description 工作日相關函數
 */
const workdayUtils = {
  /**
   * 獲取星期幾
   * @param {Date|string|number} date - 日期
   * @returns {number} 星期幾（0-6）
   */
  getWeekday: (date) => dayjs(date).day(),

  /**
   * 是否為週末
   * @param {Date|string|number} date - 日期
   * @returns {boolean} 是否為週末
   */
  isWeekend: function (date) {
    const day = this.getWeekday(date);
    return day === 0 || day === 6;
  },

  /**
   * 獲取工作日數量
   * @param {Date|string|number} start - 開始日期
   * @param {Date|string|number} end - 結束日期
   * @returns {number} 工作日數量
   */
  getWorkingDaysCount: (start, end) =>
    helperFunctions
      .getDateRange(start, end)
      .filter((date) => !workdayUtils.isWeekend(date)).length,
};

//! =============== 6. 日期格式化 ===============
/**
 * @namespace formatters
 * @description 日期格式化工具集合
 */
const formatters = {
  fullDateTime: (date) => dayjs(date).local().format("YYYY-MM-DD HH:mm:ss"),
  dateOnly: (date) => dayjs(date).local().format("YYYY-MM-DD"),
  timeOnly: (date) => dayjs(date).local().format("HH:mm:ss"),
  monthAndDay: (date) => dayjs(date).local().format("MM-DD"),
  yearAndMonth: (date) => dayjs(date).local().format("YYYY-MM"),
  iso: (date) => dayjs(date).toISOString(),
  utc: (date) => dayjs(date).utc().format(),
  isoWithTZ: (date = new Date()) =>
    dayjs(date).local().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  chineseDateTime: (date) =>
    dayjs(date).local().format("YYYY年MM月DD日HH時mm分ss秒"),
};

//! =============== 7. 輔助函數 ===============
/**
 * @namespace helperFunctions
 * @description 輔助功能函數集合
 */
const helperFunctions = {
  /**
   * 驗證日期是否有效
   * @param {Date|string|number} date - 日期
   * @returns {boolean} 是否有效
   */
  isValidDate: (date) => dayjs(date).isValid(),

  /**
   * 獲取月份天數
   * @param {Date|string|number} date - 日期
   * @returns {number} 天數
   */
  getDaysInMonth: (date) => dayjs(date).daysInMonth(),

  /**
   * 獲取相對時間描述
   * @param {Date|string|number} date - 日期
   * @returns {string} 相對時間描述
   */
  getRelativeTime: (date) => dayjs(date).fromNow(),

  /**
   * 獲取日期範圍
   * @param {Date|string|number} start - 開始日期
   * @param {Date|string|number} end - 結束日期
   * @returns {string[]} 日期列表
   */
  getDateRange: (start, end) => {
    const dates = [];
    let current = dayjs(start);
    const endDate = dayjs(end);

    while (current.isSameOrBefore(endDate, "day")) {
      dates.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }

    return dates;
  },
};

//! =============== 8. 導出 ===============
export const timeUtils = {
  ...coreUtils,
  ...timeCalculations,
  ...dateComparisons,
  ...workdayUtils,
  formatters,
  helperFunctions,
};

export default timeUtils;
