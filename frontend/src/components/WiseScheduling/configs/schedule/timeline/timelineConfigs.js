import { getTimeWindow } from "../../../utils/schedule/dateUtils";

export const TIMELINE_STYLES = {
  hour: {
    // min: new Date(Date.now() - 3600 * 1000),
    // max: new Date(Date.now() + 3600 * 1000),
    zoomMin: 1000 * 60 * 5,
  },
  day: {
    // min: new Date(Date.now() - 3600 * 1000 * 24),
    // max: new Date(Date.now() + 3600 * 1000 * 24),
    zoomMin: 1000 * 60 * 15,
  },
  week: {
    // min: new Date(Date.now() - 3600 * 1000 * 24 * 7),
    // max: new Date(Date.now() + 3600 * 1000 * 24 * 7),
    zoomMin: 1000 * 60 * 60,
  },
  month: {
    // min: new Date(Date.now() - 3600 * 1000 * 24 * 30),
    // max: new Date(Date.now() + 3600 * 1000 * 24 * 30),
    zoomMin: 1000 * 60 * 60 * 12,
  },
};

// 自定義CSS樣式
export const TIMELINE_CSS_STYLES = `
    .vis-item.custom-item {
      background-color: #e3f2fd;
      border-color: #2196f3;
      color: #1976d2;
      border-radius: 4px;
      font-size: 12px;
    }
    .vis-item.custom-item.vis-selected {
      background-color: #bbdefb;
      border-color: #1565c0;
    }
  `;

//! ============= 1. 工作時間核心配置 =============
export const WORK_CONFIG = {
  // 🧠 工作時間核心定義
  START_HOUR: 8, // 上班開始時間
  END_HOUR: 20, // 上班結束時間(12小時制)
  DEFAULT_DURATION: 2, // 預設工時(小時)
};

//! ============= 2. 時間格式配置 =============
export const TIME_FORMAT = {
  // ✨ 小時視圖 - 用於檢視詳細時間
  hour: {
    minorLabels: {
      minute: "mm", // 只顯示分鐘
      hour: "HH:mm", // 顯示時:分
    },
    majorLabels: {
      minute: "HH:mm", // 主刻度顯示時:分
      hour: "M月D日", // 顯示月日
    },
  },

  // 💡 天視圖 - 最常用的預設視圖
  day: {
    minorLabels: {
      hour: "HH:mm", // 副刻度顯示時:分
      day: "D日", // 顯示日期
    },
    majorLabels: {
      hour: "M月D日", // 顯示月日
      day: "YYYY年M月", // 顯示年月
    },
  },
};

export const TIME_RANGES = {
  hour: {
    label: "小時",
    getWindow: (centerTime) => getTimeWindow("hour", centerTime),
    format: {
      minorLabels: {
        minute: "mm", // 改為只顯示分鐘
        hour: "HH:mm",
      },
      majorLabels: {
        minute: "HH:mm", // 主刻度顯示時間
        hour: "MM-DD HH:mm",
      },
    },
  },
  day: {
    label: "天",
    getWindow: (centerTime) => getTimeWindow("day", centerTime),
    format: {
      minorLabels: {
        hour: "HH:mm", // 顯示 "14:00"
        day: "D日", // 顯示 "20日"
      },
      majorLabels: {
        hour: "M月D日", // 顯示 "1月20日"
        day: "YYYY年M月", // 顯示 "2024年1月"
      },
    },
  },
  week: {
    label: "週",
    getWindow: (centerTime) => getTimeWindow("week", centerTime),
    format: {
      minorLabels: {
        day: "DD日", // 副刻度顯示日期
        week: "第w週", // 顯示第幾週
      },
      majorLabels: {
        day: "MM月",
        week: "YYYY年",
      },
    },
  },
  month: {
    label: "月",
    getWindow: (centerTime) => getTimeWindow("month", centerTime),
    format: {
      minorLabels: {
        day: "DD", // 副刻度顯示日期
        month: "MM月",
      },
      majorLabels: {
        day: "MM月",
        month: "YYYY年",
      },
    },
  },
};
export default {
  WORK_CONFIG,
  TIME_FORMAT,
  TIME_RANGES,
};
