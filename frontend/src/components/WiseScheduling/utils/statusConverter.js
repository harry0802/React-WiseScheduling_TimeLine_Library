// 系統狀態的單一真相來源

// 中文到英文狀態映射
const STATUS_MAPPING = {
  // 新状态
  試模: "TESTING",
  異常: "OFFLINE",
  調機: "TUNING",
  待機: "IDLE",

  // 兼容旧状态
  產品試模: "TESTING",
  機台停機: "OFFLINE",
  上模與調機: "TUNING",
  待機中: "IDLE",
  生產中: "RUN",
};

// 英文狀態到樣式映射
export const STATUS_STYLE_MAP = {
  TESTING: {
    color: "rgba(0, 194, 254, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: "試模",
  },
  OFFLINE: {
    color: "rgba(235, 0, 4, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: "異常",
  },
  TUNING: {
    color: "rgba(255, 204, 0, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: "調機",
  },
  IDLE: {
    color: "rgba(189, 189, 189, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: "待機",
  },
  RUN: {
    color: "rgba(131, 191, 69, 1) 0%, rgba(42, 42, 42, 1) 100%",
    text: "生產中",
  },
};

// 滑塊映射（中文狀態到數值）
export const SLIDER_VALUE_MAP = {
  產品試模: 0,
  機台停機: 33,
  上模與調機: 66,
  待機中: 100,
};

// 滑塊標記
export const SLIDER_MARKS = [
  { value: 0, label: "產品試模" },
  { value: 33, label: "機台停機" },
  { value: 66, label: "上模與調機" },
  { value: 100, label: "待機中" },
];

// 中文狀態到英文狀態轉換
export const convertTimeLineStatus = (timeLineStatus) => {
  return STATUS_MAPPING[timeLineStatus] || "IDLE";
};

// 英文狀態到中文狀態轉換
export const getChineseStatus = (englishStatus) => {
  for (const [chinese, english] of Object.entries(STATUS_MAPPING)) {
    if (english === englishStatus) {
      // 優先返回新狀態名稱
      if (chinese === "試模" || chinese === "異常" || 
          chinese === "調機" || chinese === "待機") {
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
  
  return "待機"; // 默認值
};

// 獲取滑塊標記對應的英文狀態
export const getStatusFromSliderValue = (value) => {
  const mark = SLIDER_MARKS.find(m => m.value === value);
  if (!mark) return "IDLE";
  return STATUS_MAPPING[mark.label] || "IDLE";
};
