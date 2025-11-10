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

/**
 * @function getChineseStatus
 * @description 英文狀態到中文狀態轉換（簡化版本）
 * @param {string} englishStatus - 英文狀態代碼
 * @returns {string} 對應的中文狀態名稱
 */
export const getChineseStatus = (englishStatus) => {
  return STATUS_NAME_MAP[englishStatus] || englishStatus;
};

//! =============== 3. 狀態轉換常量和函數 ===============
//* 機台狀態轉換相關的常量和函數

/**
 * @constant {Object} STATE_CONSTANTS - 簡化的中文狀態常量（向後兼容）
 * @deprecated 建議直接使用 STATUS_NAME_MAP 進行狀態顯示轉換
 */
export const STATE_OLD_TESTING = STATUS_NAME_MAP[MACHINE_STATUS.TESTING];
export const STATE_OLD_OFFLINE = STATUS_NAME_MAP[MACHINE_STATUS.OFFLINE];
export const STATE_OLD_TUNING = STATUS_NAME_MAP[MACHINE_STATUS.TUNING];
export const STATE_OLD_IDLE = STATUS_NAME_MAP[MACHINE_STATUS.IDLE];

/**
 * @constant {Object} STATUS_MAPPING - 簡化的中文到英文狀態映射（向後兼容）
 * @deprecated 建議直接使用 MACHINE_STATUS 和 STATUS_NAME_MAP
 */
export const STATUS_MAPPING = {
  // 兼容舊狀態
  [STATE_OLD_TESTING]: MACHINE_STATUS.TESTING,
  [STATE_OLD_OFFLINE]: MACHINE_STATUS.OFFLINE,
  [STATE_OLD_TUNING]: MACHINE_STATUS.TUNING,
  [STATE_OLD_IDLE]: MACHINE_STATUS.IDLE,
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
  [MACHINE_STATUS.TESTING]: {
    color: "rgba(0, 194, 254, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_NAME_MAP[MACHINE_STATUS.TESTING],
  },
  [MACHINE_STATUS.OFFLINE]: {
    color: "rgba(235, 0, 4, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_NAME_MAP[MACHINE_STATUS.OFFLINE],
  },
  [MACHINE_STATUS.TUNING]: {
    color: "rgba(255, 204, 0, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_NAME_MAP[MACHINE_STATUS.TUNING],
  },
  [MACHINE_STATUS.IDLE]: {
    color: "rgba(189, 189, 189, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_NAME_MAP[MACHINE_STATUS.IDLE],
  },
  [MACHINE_STATUS.RUN]: {
    color: "rgba(131, 191, 69, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: STATUS_NAME_MAP[MACHINE_STATUS.RUN],
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
  return STATUS_MAPPING[timeLineStatus] || MACHINE_STATUS.IDLE;
};

/**
 * 獲取滑塊標記對應的英文狀態
 * @function getStatusFromSliderValue
 * @param {number} value - 滑塊數值
 * @returns {string} 對應的英文狀態代碼
 */
export const getStatusFromSliderValue = (value) => {
  const mark = SLIDER_MARKS.find((m) => m.value === value);
  if (!mark) return MACHINE_STATUS.IDLE;

  return STATUS_MAPPING[mark.label] || MACHINE_STATUS.IDLE;
};

/**
 * 從狀態獲取對應的滑塊值（自動處理中英文狀態）
 * @function getSliderValueFromStatus
 * @param {string} status - 狀態代碼或名稱（支援中英文）
 * @returns {number} 對應的滑塊值
 */
export const getSliderValueFromStatus = (status) => {
  // 先標準化為英文狀態碼
  const englishStatus = getStatusCode(status);

  // 根據英文狀態代碼映射到滑塊值
  switch (englishStatus) {
    case MACHINE_STATUS.TESTING:
      return SLIDER_VALUE_MAP[STATE_OLD_TESTING];
    case MACHINE_STATUS.OFFLINE:
      return SLIDER_VALUE_MAP[STATE_OLD_OFFLINE];
    case MACHINE_STATUS.TUNING:
      return SLIDER_VALUE_MAP[STATE_OLD_TUNING];
    case MACHINE_STATUS.RUN:
    case MACHINE_STATUS.IDLE:
    default:
      return SLIDER_VALUE_MAP[STATE_OLD_IDLE] || 100;
  }
};

/**
 * 無論中文或英文，都返回查詢是否為 IDLE 或是 TUNING 狀態
 * @function isIdle
 * @param {string} status - 狀態代碼或名稱
 * @returns {boolean} 是否為空閒狀態
 */
export const isIdle = (status) => {
  return (
    status === MACHINE_STATUS.IDLE ||
    status === STATE_OLD_IDLE ||
    status === STATUS_NAME_MAP[MACHINE_STATUS.IDLE] ||
    status === MACHINE_STATUS.TUNING ||
    status === STATE_OLD_TUNING ||
    status === STATUS_NAME_MAP[MACHINE_STATUS.TUNING]
  );
};
