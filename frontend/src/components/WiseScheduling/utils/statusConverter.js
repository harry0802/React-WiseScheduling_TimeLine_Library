/**
 * @file statusConverter.js
 * @description 機台狀態定義的單一真相來源 (Single Source of Truth)
 *
 * 重要說明：
 * 1. 此文件是所有機台狀態定義的唯一來源
 * 2. 所有組件必須從此文件引入狀態定義，禁止在其他文件中重複定義
 * 3. 修改狀態定義時，只需要修改此文件
 * 4. 狀態映射包括：中文到英文轉換、狀態到樣式映射、滑塊值映射等
 */

// 狀態字符串常量定義
// 新狀態中文名稱
const STATE_TESTING = "試模";
const STATE_OFFLINE = "異常";
const STATE_TUNING = "調機";
const STATE_IDLE = "待機";
const STATE_RUNNING = "生產中";

// 舊狀態中文名稱
const STATE_OLD_TESTING = "產品試模";
const STATE_OLD_OFFLINE = "機台停機";
const STATE_OLD_TUNING = "上模與調機";
const STATE_OLD_IDLE = "待機中";

// 英文狀態碼
const CODE_TESTING = "TESTING";
const CODE_OFFLINE = "OFFLINE";
const CODE_TUNING = "TUNING";
const CODE_IDLE = "IDLE";
const CODE_RUNNING = "RUN";

// 中文到英文狀態映射
const STATUS_MAPPING = {
  // 新状态
  [STATE_TESTING]: CODE_TESTING,
  [STATE_OFFLINE]: CODE_OFFLINE,
  [STATE_TUNING]: CODE_TUNING,
  [STATE_IDLE]: CODE_IDLE,

  // 兼容旧状态
  [STATE_OLD_TESTING]: CODE_TESTING,
  [STATE_OLD_OFFLINE]: CODE_OFFLINE,
  [STATE_OLD_TUNING]: CODE_TUNING,
  [STATE_OLD_IDLE]: CODE_IDLE,
  [STATE_RUNNING]: CODE_RUNNING,
};

// 英文狀態到樣式映射
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

// 滑塊映射（中文狀態到數值）
export const SLIDER_VALUE_MAP = {
  [STATE_OLD_TESTING]: 0,
  [STATE_OLD_OFFLINE]: 33,
  [STATE_OLD_TUNING]: 66,
  [STATE_OLD_IDLE]: 100,
};

// 滑塊標記
export const SLIDER_MARKS = [
  { value: 0, label: STATE_OLD_TESTING },
  { value: 33, label: STATE_OLD_OFFLINE },
  { value: 66, label: STATE_OLD_TUNING },
  { value: 100, label: STATE_OLD_IDLE },
];

// 中文狀態到英文狀態轉換
export const convertTimeLineStatus = (timeLineStatus) => {
  return STATUS_MAPPING[timeLineStatus] || CODE_IDLE;
};

// 英文狀態到中文狀態轉換
export const getChineseStatus = (englishStatus) => {
  for (const [chinese, english] of Object.entries(STATUS_MAPPING)) {
    if (english === englishStatus) {
      // 優先返回新狀態名稱
      if (
        chinese === STATE_TESTING ||
        chinese === STATE_OFFLINE ||
        chinese === STATE_TUNING ||
        chinese === STATE_IDLE
      ) {
        return chinese;
      }
    }
  }

  // 如果沒找到新狀態名稱，返回舊狀態名稱
  for (const [chinese, english] of Object.entries(STATUS_MAPPING)) {
    if (english === englishStatus) {
      return chinese;
    }
  }

  return STATE_IDLE; // 默認值
};

// 獲取滑塊標記對應的英文狀態
export const getStatusFromSliderValue = (value) => {
  const mark = SLIDER_MARKS.find((m) => m.value === value);
  if (!mark) return CODE_IDLE;
  return STATUS_MAPPING[mark.label] || CODE_IDLE;
};

// 匯出常量供其他文件使用
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
