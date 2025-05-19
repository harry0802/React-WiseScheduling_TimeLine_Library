// configs/timelineLocale.js

// 中文本地化配置
export const zhTWLocale = {
  current: "現在",
  time: "時間",
  deleteSelected: "刪除選取",
  editable: {
    add: "新增",
    remove: "刪除",
    updateTime: "調整時間",
    updateGroup: "調整群組",
  },
};

// moment 語系設定
export const momentLocaleConfig = {
  months:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  meridiem: (hour, minute) => {
    const timeValue = hour * 100 + minute;
    if (timeValue < 600) return "凌晨";
    if (timeValue < 900) return "早上";
    if (timeValue < 1130) return "上午";
    if (timeValue < 1230) return "中午";
    if (timeValue < 1800) return "下午";
    return "晚上";
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: (hour, meridiem) => {
    let adjustedHour = hour === 12 ? 0 : hour;

    if (["凌晨", "早上", "上午"].includes(meridiem)) return adjustedHour;
    if (meridiem === "中午")
      return adjustedHour >= 11 ? adjustedHour : adjustedHour + 12;
    if (["下午", "晚上"].includes(meridiem)) return adjustedHour + 12;

    return adjustedHour;
  },
};
