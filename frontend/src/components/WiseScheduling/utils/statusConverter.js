/**
 * @file statusConverter.js
 * @description 機台狀態定義的單一真相來源 (Single Source of Truth)
 * @version 3.0.0
 */

//! =============== 1. 狀態常量定義 ===============
//* 集中管理所有狀態字符串，確保一致性

/**
 * @constant {Object} STATUS_CONSTANTS - 狀態常量定義
 */
const STATUS_CONSTANTS = {
  CHINESE: {
    // 新狀態中文名稱
    TESTING: "試模",
    OFFLINE: "異常",
    TUNING: "調機",
    IDLE: "待機",
    RUNNING: "生產中",

    // 舊狀態中文名稱
    OLD_TESTING: "產品試模",
    OLD_OFFLINE: "機台停機",
    OLD_TUNING: "上模與調機",
    OLD_IDLE: "待機中",
  },

  ENGLISH: {
    // 系統內部使用的狀態代碼
    TESTING: "TESTING",
    OFFLINE: "OFFLINE",
    TUNING: "TUNING",
    IDLE: "IDLE",
    RUNNING: "RUN",
  },
};

// 解構導出具名常量，方便直接引用
const {
  CHINESE: {
    TESTING: STATE_TESTING,
    OFFLINE: STATE_OFFLINE,
    TUNING: STATE_TUNING,
    IDLE: STATE_IDLE,
    RUNNING: STATE_RUNNING,
    OLD_TESTING: STATE_OLD_TESTING,
    OLD_OFFLINE: STATE_OLD_OFFLINE,
    OLD_TUNING: STATE_OLD_TUNING,
    OLD_IDLE: STATE_OLD_IDLE,
  },
  ENGLISH: {
    TESTING: CODE_TESTING,
    OFFLINE: CODE_OFFLINE,
    TUNING: CODE_TUNING,
    IDLE: CODE_IDLE,
    RUNNING: CODE_RUNNING,
  },
} = STATUS_CONSTANTS;

//! =============== 2. 基礎映射關係 ===============
//* 定義各種狀態間的轉換關係

/**
 * @constant {Object} STATUS_MAPPING - 中文到英文狀態映射
 */
const STATUS_MAPPING = {
  // 新狀態映射
  [STATE_TESTING]: CODE_TESTING,
  [STATE_OFFLINE]: CODE_OFFLINE,
  [STATE_TUNING]: CODE_TUNING,
  [STATE_IDLE]: CODE_IDLE,
  [STATE_RUNNING]: CODE_RUNNING,

  // 兼容舊狀態
  [STATE_OLD_TESTING]: CODE_TESTING,
  [STATE_OLD_OFFLINE]: CODE_OFFLINE,
  [STATE_OLD_TUNING]: CODE_TUNING,
  [STATE_OLD_IDLE]: CODE_IDLE,
};

/**
 * @constant {Object} REVERSE_STATUS_MAPPING - 英文到中文（新）狀態映射
 */
const REVERSE_STATUS_MAPPING = {
  [CODE_TESTING]: STATE_TESTING,
  [CODE_OFFLINE]: STATE_OFFLINE,
  [CODE_TUNING]: STATE_TUNING,
  [CODE_IDLE]: STATE_IDLE,
  [CODE_RUNNING]: STATE_RUNNING,
};

/**
 * @constant {Object} NEW_TO_OLD_STATUS - 新中文狀態到舊中文狀態的映射
 * @description 💡 將相關的映射集中在一起，減少分散的 switch 語句
 */
const NEW_TO_OLD_STATUS = {
  [STATE_TESTING]: STATE_OLD_TESTING,
  [STATE_OFFLINE]: STATE_OLD_OFFLINE,
  [STATE_TUNING]: STATE_OLD_TUNING,
  [STATE_IDLE]: STATE_OLD_IDLE,
  [STATE_RUNNING]: STATE_OLD_IDLE, // RUNNING 狀態映射到 IDLE
};

//! =============== 3. 視覺樣式配置 ===============
//* 狀態對應的顯示樣式定義

/**
 * @typedef {Object} StatusStyle
 * @property {string} color - 漸層色字符串
 * @property {string} text - 顯示文字
 */

/**
 * @constant {Object.<string, StatusStyle>} STATUS_STYLE_MAP - 英文狀態到樣式映射
 */
const STATUS_STYLE_MAP = {
  [CODE_TESTING]: {
    color: "rgba(0, 194, 254, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATE_TESTING,
  },
  [CODE_OFFLINE]: {
    color: "rgba(235, 0, 4, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATE_OFFLINE,
  },
  [CODE_TUNING]: {
    color: "rgba(255, 204, 0, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATE_TUNING,
  },
  [CODE_IDLE]: {
    color: "rgba(189, 189, 189, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATE_IDLE,
  },
  [CODE_RUNNING]: {
    color: "rgba(131, 191, 69, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATE_RUNNING,
  },
};

//! =============== 4. 滑塊配置 ===============
//* 滑塊相關的配置定義

/**
 * @typedef {Object} SliderMark
 * @property {number} value - 滑塊數值
 * @property {string} label - 顯示文字
 */

/**
 * @constant {Object} SLIDER_VALUE_MAP - 舊中文狀態到滑塊值的映射
 */
const SLIDER_VALUE_MAP = {
  [STATE_OLD_TESTING]: 0,
  [STATE_OLD_OFFLINE]: 33,
  [STATE_OLD_TUNING]: 66,
  [STATE_OLD_IDLE]: 100,
};

/**
 * @constant {SliderMark[]} SLIDER_MARKS - 滑塊標記配置
 */
const SLIDER_MARKS = [
  { value: 0, label: STATE_OLD_TESTING },
  { value: 33, label: STATE_OLD_OFFLINE },
  { value: 66, label: STATE_OLD_TUNING },
  { value: 100, label: STATE_OLD_IDLE },
];

//! =============== 5. 核心轉換函數 ===============
//* 提供狀態轉換和查詢的功能

/**
 * 中文狀態到英文狀態轉換
 * @function convertTimeLineStatus
 * @param {string} timeLineStatus - 中文狀態
 * @returns {string} 對應的英文狀態代碼
 *
 * @example
 * // 返回: 'IDLE'
 * convertTimeLineStatus('待機');
 */
const convertTimeLineStatus = (timeLineStatus) => {
  return STATUS_MAPPING[timeLineStatus] || CODE_IDLE;
};

/**
 * 英文狀態到中文狀態轉換
 * @function getChineseStatus
 * @param {string} englishStatus - 英文狀態代碼
 * @returns {string} 對應的中文狀態名稱
 */
const getChineseStatus = (englishStatus) => {
  return REVERSE_STATUS_MAPPING[englishStatus] || STATE_IDLE;
};

//! =============== 6. 滑塊相關工具函數 ===============
//* 專門處理滑塊與狀態間轉換的函數

/**
 * 獲取滑塊標記對應的英文狀態
 * @function getStatusFromSliderValue
 * @param {number} value - 滑塊數值
 * @returns {string} 對應的英文狀態代碼
 */
const getStatusFromSliderValue = (value) => {
  const mark = SLIDER_MARKS.find((m) => m.value === value);
  if (!mark) return CODE_IDLE;

  return STATUS_MAPPING[mark.label] || CODE_IDLE;
};

/**
 * 從英文狀態獲取對應的滑塊值
 * @function getSliderValueFromStatus
 * @param {string} englishStatus - 英文狀態代碼
 * @returns {number} 對應的滑塊值
 */
const getSliderValueFromStatus = (englishStatus) => {
  // 先獲取對應的中文新狀態
  const chineseStatus = getChineseStatus(englishStatus);

  // 將新狀態轉換為對應的舊狀態
  const oldChineseStatus = NEW_TO_OLD_STATUS[chineseStatus] || STATE_OLD_IDLE;

  // 返回對應的滑塊值，默認為 100 (IDLE)
  return SLIDER_VALUE_MAP[oldChineseStatus] || 100;
};

// 無論中文或英文，都返回查詢是否為 IDLE 或是 上模具條機
const isIdle = (status) => {
  return (
    status === STATE_IDLE ||
    status === CODE_IDLE ||
    status === STATE_OLD_IDLE ||
    status === STATE_TUNING ||
    status === CODE_TUNING ||
    status === STATE_OLD_TUNING
  );
};

//! =============== 7. 導出 ===============

// 導出狀態常量
export {
  STATE_TESTING,
  STATE_OFFLINE,
  STATE_TUNING,
  STATE_IDLE,
  STATE_RUNNING,
  STATE_OLD_TESTING,
  STATE_OLD_OFFLINE,
  STATE_OLD_TUNING,
  STATE_OLD_IDLE,
  CODE_TESTING,
  CODE_OFFLINE,
  CODE_TUNING,
  CODE_IDLE,
  CODE_RUNNING,
};

// 導出映射和工具函數
export {
  STATUS_MAPPING,
  STATUS_STYLE_MAP,
  SLIDER_VALUE_MAP,
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,
  getStatusFromSliderValue,
  getSliderValueFromStatus,
  isIdle,
};
