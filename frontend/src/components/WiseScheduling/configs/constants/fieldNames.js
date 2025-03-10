/**
 * @file fieldNames.js
 * @description 機台排程相關欄位命名和狀態轉換的單一真相來源 (Single Source of Truth)
 * @version 1.0.0
 */

//! =============== 1. 欄位名稱定義 ===============
//* 集中管理所有欄位名稱，確保一致性

/**
 * @constant {Object} MACHINE_STATUS - 機台狀態常量對照表
 * @description 中英文狀態對照
 */
export const MACHINE_STATUS = {
  // 英文狀態碼 (API 格式)
  RUN: "RUN",
  IDLE: "IDLE",
  TUNING: "TUNING",
  TESTING: "TESTING",
  OFFLINE: "OFFLINE",

  // 中文狀態名稱
  生產中: "RUN",
  待機中: "IDLE",
  上模與調機: "TUNING",
  產品試模: "TESTING",
  機台停機: "OFFLINE",
};

/**
 * @constant {Object} STATUS_NAME_MAP - 狀態代碼與中文名稱映射
 * @description 英文狀態碼到中文顯示名稱的映射
 */
export const STATUS_NAME_MAP = {
  [MACHINE_STATUS.RUN]: "生產中",
  [MACHINE_STATUS.IDLE]: "待機中",
  [MACHINE_STATUS.TUNING]: "上模與調機",
  [MACHINE_STATUS.TESTING]: "產品試模",
  [MACHINE_STATUS.OFFLINE]: "機台停機",
};

//! =============== 2. 輔助函數 ===============
//* 欄位名稱轉換和查詢的工具函數

/**
 * @function getStatusDisplay
 * @description 根據狀態代碼取得中文顯示名稱
 * @param {string} statusCode - 狀態代碼
 * @returns {string} - 中文狀態名稱
 */
export const getStatusDisplay = (statusCode) => {
  return STATUS_NAME_MAP[statusCode] || statusCode;
};

/**
 * @function getStatusCode
 * @description 根據中文狀態名稱取得狀態代碼
 * @param {string} statusName - 中文狀態名稱
 * @returns {string} - 狀態代碼
 */
export const getStatusCode = (statusName) => {
  return MACHINE_STATUS[statusName] || statusName;
};

//! =============== 3. 狀態轉換常量和函數 ===============
//* 機台狀態轉換相關的常量和函數

/**
 * @constant {Object} STATE_CONSTANTS - 中文狀態常量
 */
export const STATE_TESTING = "試模";
export const STATE_OFFLINE = "異常";
export const STATE_TUNING = "調機";
export const STATE_IDLE = "待機";
export const STATE_RUNNING = "生產中";
export const STATE_OLD_TESTING = STATUS_NAME_MAP[MACHINE_STATUS.TESTING];
export const STATE_OLD_OFFLINE = STATUS_NAME_MAP[MACHINE_STATUS.OFFLINE];
export const STATE_OLD_TUNING = STATUS_NAME_MAP[MACHINE_STATUS.TUNING];
export const STATE_OLD_IDLE = STATUS_NAME_MAP[MACHINE_STATUS.IDLE];

/**
 * @constant {Object} CODE_CONSTANTS - 英文狀態代碼常量
 */
export const CODE_TESTING = MACHINE_STATUS.TESTING;
export const CODE_OFFLINE = MACHINE_STATUS.OFFLINE;
export const CODE_TUNING = MACHINE_STATUS.TUNING;
export const CODE_IDLE = MACHINE_STATUS.IDLE;
export const CODE_RUNNING = MACHINE_STATUS.RUN;

/**
 * @constant {Object} STATUS_MAPPING - 中文到英文狀態映射
 */
export const STATUS_MAPPING = {
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
export const REVERSE_STATUS_MAPPING = {
  [CODE_TESTING]: STATE_TESTING,
  [CODE_OFFLINE]: STATE_OFFLINE,
  [CODE_TUNING]: STATE_TUNING,
  [CODE_IDLE]: STATE_IDLE,
  [CODE_RUNNING]: STATE_RUNNING,
};

/**
 * @constant {SliderMark[]} SLIDER_MARKS - 滑塊標記配置
 */
export const SLIDER_MARKS = [
  { value: 0, label: STATE_OLD_TESTING },
  { value: 33, label: STATE_OLD_OFFLINE },
  { value: 66, label: STATE_OLD_TUNING },
  { value: 100, label: STATE_OLD_IDLE },
];

/**
 * @constant {Object} SLIDER_VALUE_MAP - 舊中文狀態到滑塊值的映射
 */
export const SLIDER_VALUE_MAP = {
  [STATE_OLD_TESTING]: 0,
  [STATE_OLD_OFFLINE]: 33,
  [STATE_OLD_TUNING]: 66,
  [STATE_OLD_IDLE]: 100,
};

/**
 * @constant {Object} STATUS_STYLE_MAP - 狀態樣式對應表
 */
export const STATUS_STYLE_MAP = {
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

//! =============== 4. 轉換函數 ===============
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
export const convertTimeLineStatus = (timeLineStatus) => {
  // 先嘗試使用中央定義的轉換
  const centralCode = getStatusCode(timeLineStatus);
  if (centralCode !== timeLineStatus) {
    return centralCode;
  }
  // 如果中央定義中找不到，則使用本地映射
  return STATUS_MAPPING[timeLineStatus] || CODE_IDLE;
};

/**
 * 英文狀態到中文狀態轉換
 * @function getChineseStatus
 * @param {string} englishStatus - 英文狀態代碼
 * @returns {string} 對應的中文狀態名稱
 */
export const getChineseStatus = (englishStatus) => {
  // 先嘗試使用中央定義的轉換
  const centralName = getStatusDisplay(englishStatus);
  if (centralName !== englishStatus) {
    return REVERSE_STATUS_MAPPING[englishStatus] || centralName;
  }
  // 如果中央定義中找不到，則使用本地映射
  return REVERSE_STATUS_MAPPING[englishStatus] || STATE_IDLE;
};

/**
 * 獲取滑塊標記對應的英文狀態
 * @function getStatusFromSliderValue
 * @param {number} value - 滑塊數值
 * @returns {string} 對應的英文狀態代碼
 */
export const getStatusFromSliderValue = (value) => {
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
export const getSliderValueFromStatus = (englishStatus) => {
  // 先獲取對應的中文新狀態
  const chineseStatus = getChineseStatus(englishStatus);

  // 將新狀態轉換為對應的舊狀態
  let oldChineseStatus;
  switch (chineseStatus) {
    case STATE_TESTING:
      oldChineseStatus = STATE_OLD_TESTING;
      break;
    case STATE_OFFLINE:
      oldChineseStatus = STATE_OLD_OFFLINE;
      break;
    case STATE_TUNING:
      oldChineseStatus = STATE_OLD_TUNING;
      break;
    case STATE_RUNNING:
    case STATE_IDLE:
      oldChineseStatus = STATE_OLD_IDLE;
      break;
    default:
      oldChineseStatus = STATE_OLD_IDLE;
  }

  // 返回對應的滑塊值，默認為 100 (IDLE)
  return SLIDER_VALUE_MAP[oldChineseStatus] || 100;
};

/**
 * 無論中文或英文，都返回查詢是否為 IDLE 或是 上模具條機
 * @function isIdle
 * @param {string} status - 狀態代碼或名稱
 * @returns {boolean} 是否為空閒狀態
 */
export const isIdle = (status) => {
  return (
    status === STATE_IDLE ||
    status === CODE_IDLE ||
    status === STATE_OLD_IDLE ||
    status === STATUS_NAME_MAP[MACHINE_STATUS.IDLE] ||
    status === STATE_TUNING ||
    status === CODE_TUNING ||
    status === STATE_OLD_TUNING ||
    status === STATUS_NAME_MAP[MACHINE_STATUS.TUNING]
  );
};
