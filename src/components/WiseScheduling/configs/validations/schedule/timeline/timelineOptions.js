// configs/timelineOptions.js
import moment from "moment";
import { zhTWLocale } from "./timelineLocale";

export const BASE_TIMELINE_OPTIONS = {
  width: "100%",
  minHeight: "600px",
  margin: {
    item: {
      horizontal: 10,
      vertical: 10, // 🎯 增加垂直間距，讓 row 高度更舒適
    },
  },
  groupHeightMode: "auto", // 🔧 自動調整群組高度，保持標籤與內容同步
  orientation: "top",
  zoomable: false,
  moveable: true,
  stack: true,
  stackSubgroups: true,
  verticalScroll: true,
  horizontalScroll: true,
  showCurrentTime: true,
  locale: "zh-TW", // 改為大寫 TW
  snap: null,
  locales: {
    "zh-TW": zhTWLocale,
  },
  moment: function (date) {
    return moment(date).locale("zh-tw").utcOffset("+08:00"); // 使用引入的 moment
  },
};

export const TIME_FORMAT_CONFIG = {
  minorLabels: {
    millisecond: "SSS",
    second: "s秒",
    minute: "a h:mm",
    hour: "a h點",
    weekday: "M月D日",
    day: "D日",
    week: "第w週",
    month: "M月",
    year: "YYYY年",
  },
  majorLabels: {
    millisecond: "HH:mm:ss",
    second: "M月D日 a h:mm",
    minute: "M月D日 a h:mm",
    hour: "M月D日 a",
    weekday: "YYYY年M月",
    day: "YYYY年M月",
    week: "YYYY年M月",
    month: "YYYY年",
    year: "",
  },
};
