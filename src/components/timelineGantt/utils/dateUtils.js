import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 註冊插件
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

// 時間格式化工具
export const dateFormats = {
  fullDateTime: "YYYY-MM-DD HH:mm:ss",
  dateTime: "YYYY-MM-DD HH:mm",
  date: "YYYY-MM-DD",
  time: "HH:mm",
};

// 獲取時間視窗
// dateUtils.js
export const getTimeWindow = (range, centerTime = dayjs()) => {
  const now = centerTime;
  const windows = {
    hour: {
      start: now.subtract(1, "hour"),
      end: now.add(1, "hour"),
    },
    day: {
      start: now.startOf("day"),
      end: now.endOf("day"),
    },
    week: {
      start: now.startOf("week"),
      end: now.endOf("week"),
    },
    month: {
      start: now.startOf("month"),
      end: now.endOf("month"),
    },
  };

  return windows[range] || windows.day;
};

// 格式化日期
export const formatDate = (date, format = dateFormats.dateTime) => {
  return dayjs(date).format(format);
};

// 解析日期字符串
export const parseDate = (dateString) => {
  return dayjs(dateString);
};

// 檢查日期是否有效
export const isValidDate = (date) => {
  return dayjs(date).isValid();
};
