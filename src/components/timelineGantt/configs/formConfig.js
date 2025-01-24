// configs/formConfig.js

import dayjs from "dayjs";
import { formatDate } from "../utils/dateUtils";

// 🧠 集中管理表單相關配置
export const FORM_CONFIG = {
  // 表單默認值
  defaultValues: {
    content: "",
    start: formatDate(dayjs()),
    end: formatDate(dayjs().add(2, "hour")),
    group: "",
  },

  // 時間選擇器配置
  timePickerProps: {
    type: "datetime-local",
    InputLabelProps: { shrink: true },
    inputProps: { step: 300 }, // 5分鐘間隔
  },
};

// ✨ 表單驗證規則
export const VALIDATION_RULES = {
  content: {
    required: "訂單內容不能為空",
    maxLength: {
      value: 100,
      message: "內容不能超過100字",
    },
  },

  start: {
    required: "請選擇開始時間",
  },

  end: {
    required: "請選擇結束時間",
  },

  group: {
    required: "請選擇機台",
  },
};
