import { getTimeWindow } from "../utils/dateUtils";

export const TIMELINE_STYLES = `
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
        hour: "HH:mm", // 副刻度顯示時:分
        day: "DD日",
      },
      majorLabels: {
        hour: "MM-DD", // 主刻度顯示月-日
        day: "YYYY年MM月",
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
