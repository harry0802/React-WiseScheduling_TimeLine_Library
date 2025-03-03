/**
 * @file statusConverter.js
 * @description 機台狀態定義的單一真相來源 (Single Source of Truth)
 * @version 1.1.0
 */

//! =============== 1. 設定與常量 ===============
/**
 * @constant {Object} STATUS_CONSTANTS
 * @description 狀態字符串常量定義
 * @property {Object} CHINESE - 中文狀態名稱
 * @property {Object} ENGLISH - 英文狀態代碼
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
    TESTING: "TESTING",
    OFFLINE: "OFFLINE",
    TUNING: "TUNING",
    IDLE: "IDLE",
    RUNNING: "RUN",
  },
};

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} StatusStyle
 * @property {string} color - 漸層色字符串
 * @property {string} text - 顯示文字
 */

/**
 * @typedef {Object} SliderMark
 * @property {number} value - 滑塊數值
 * @property {string} label - 顯示文字
 */

//! =============== 3. 核心功能 ===============
//* 狀態映射物件 - 將所有映射集中管理
/**
 * @constant {Object} STATUS_MAPPING
 * @description 中文到英文狀態映射
 */
const STATUS_MAPPING = {
  // 新狀態映射
  [STATUS_CONSTANTS.CHINESE.TESTING]: STATUS_CONSTANTS.ENGLISH.TESTING,
  [STATUS_CONSTANTS.CHINESE.OFFLINE]: STATUS_CONSTANTS.ENGLISH.OFFLINE,
  [STATUS_CONSTANTS.CHINESE.TUNING]: STATUS_CONSTANTS.ENGLISH.TUNING,
  [STATUS_CONSTANTS.CHINESE.IDLE]: STATUS_CONSTANTS.ENGLISH.IDLE,
  [STATUS_CONSTANTS.CHINESE.RUNNING]: STATUS_CONSTANTS.ENGLISH.RUNNING,

  // 兼容舊狀態
  [STATUS_CONSTANTS.CHINESE.OLD_TESTING]: STATUS_CONSTANTS.ENGLISH.TESTING,
  [STATUS_CONSTANTS.CHINESE.OLD_OFFLINE]: STATUS_CONSTANTS.ENGLISH.OFFLINE,
  [STATUS_CONSTANTS.CHINESE.OLD_TUNING]: STATUS_CONSTANTS.ENGLISH.TUNING,
  [STATUS_CONSTANTS.CHINESE.OLD_IDLE]: STATUS_CONSTANTS.ENGLISH.IDLE,
};

/**
 * @constant {Object.<string, StatusStyle>} STATUS_STYLE_MAP
 * @description 英文狀態到樣式映射
 */
const STATUS_STYLE_MAP = {
  [STATUS_CONSTANTS.ENGLISH.TESTING]: {
    color: "rgba(0, 194, 254, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_CONSTANTS.CHINESE.TESTING,
  },
  [STATUS_CONSTANTS.ENGLISH.OFFLINE]: {
    color: "rgba(235, 0, 4, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_CONSTANTS.CHINESE.OFFLINE,
  },
  [STATUS_CONSTANTS.ENGLISH.TUNING]: {
    color: "rgba(255, 204, 0, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_CONSTANTS.CHINESE.TUNING,
  },
  [STATUS_CONSTANTS.ENGLISH.IDLE]: {
    color: "rgba(189, 189, 189, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_CONSTANTS.CHINESE.IDLE,
  },
  [STATUS_CONSTANTS.ENGLISH.RUNNING]: {
    color: "rgba(131, 191, 69, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_CONSTANTS.CHINESE.RUNNING,
  },
};

/**
 * @constant {Object} SLIDER_VALUE_MAP
 * @description 滑塊映射（中文狀態到數值）
 */
const SLIDER_VALUE_MAP = {
  [STATUS_CONSTANTS.CHINESE.OLD_TESTING]: 0,
  [STATUS_CONSTANTS.CHINESE.OLD_OFFLINE]: 33,
  [STATUS_CONSTANTS.CHINESE.OLD_TUNING]: 66,
  [STATUS_CONSTANTS.CHINESE.OLD_IDLE]: 100,
};

/**
 * @constant {SliderMark[]} SLIDER_MARKS
 * @description 滑塊標記
 */
const SLIDER_MARKS = [
  { value: 0, label: STATUS_CONSTANTS.CHINESE.OLD_TESTING },
  { value: 33, label: STATUS_CONSTANTS.CHINESE.OLD_OFFLINE },
  { value: 66, label: STATUS_CONSTANTS.CHINESE.OLD_TUNING },
  { value: 100, label: STATUS_CONSTANTS.CHINESE.OLD_IDLE },
];

//! =============== 4. 工具函數 ===============
/**
 * @function convertTimeLineStatus
 * @description 中文狀態到英文狀態轉換
 * @param {string} timeLineStatus - 中文狀態
 * @returns {string} 對應的英文狀態代碼
 * @example
 * // 基礎使用示例
 * const englishStatus = convertTimeLineStatus('待機');
 * // 結果: 'IDLE'
 */
const convertTimeLineStatus = (timeLineStatus) => {
  return STATUS_MAPPING[timeLineStatus] || STATUS_CONSTANTS.ENGLISH.IDLE;
};

/**
 * @function getChineseStatus
 * @description 英文狀態到中文狀態轉換
 * @param {string} englishStatus - 英文狀態代碼
 * @returns {string} 對應的中文狀態名稱（優先返回新狀態）
 *
 * @notes
 * - 優先返回新狀態名稱
 * - 如果沒有找到新狀態名稱，則返回舊狀態名稱
 * - 如果都沒找到，返回默認值'待機'
 */
const getChineseStatus = (englishStatus) => {
  // 先建立英文到中文（新狀態）的反向映射
  const newStatusMap = {
    [STATUS_CONSTANTS.ENGLISH.TESTING]: STATUS_CONSTANTS.CHINESE.TESTING,
    [STATUS_CONSTANTS.ENGLISH.OFFLINE]: STATUS_CONSTANTS.CHINESE.OFFLINE,
    [STATUS_CONSTANTS.ENGLISH.TUNING]: STATUS_CONSTANTS.CHINESE.TUNING,
    [STATUS_CONSTANTS.ENGLISH.IDLE]: STATUS_CONSTANTS.CHINESE.IDLE,
    [STATUS_CONSTANTS.ENGLISH.RUNNING]: STATUS_CONSTANTS.CHINESE.RUNNING,
  };

  // 檢查是否有對應的新狀態
  if (newStatusMap[englishStatus]) {
    return newStatusMap[englishStatus];
  }

  // 遍歷找舊狀態（效率較低，但保持向後兼容）
  for (const [chinese, english] of Object.entries(STATUS_MAPPING)) {
    if (english === englishStatus) {
      return chinese;
    }
  }

  // 默認值
  return STATUS_CONSTANTS.CHINESE.IDLE;
};

/**
 * @function getStatusFromSliderValue
 * @description 獲取滑塊標記對應的英文狀態
 * @param {number} value - 滑塊數值
 * @returns {string} 對應的英文狀態代碼
 */
const getStatusFromSliderValue = (value) => {
  const mark = SLIDER_MARKS.find((m) => m.value === value);
  if (!mark) return STATUS_CONSTANTS.ENGLISH.IDLE;
  return STATUS_MAPPING[mark.label] || STATUS_CONSTANTS.ENGLISH.IDLE;
};

//! =============== 5. 導出 ===============
// 導出狀態常量
export const {
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

// 導出映射和工具函數
export {
  STATUS_MAPPING,
  STATUS_STYLE_MAP,
  SLIDER_VALUE_MAP,
  SLIDER_MARKS,
  convertTimeLineStatus,
  getChineseStatus,
  getStatusFromSliderValue,
};
