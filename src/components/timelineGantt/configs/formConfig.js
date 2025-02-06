// configs/formConfig.js

import dayjs from "dayjs";
import { formatDate } from "../utils/dateUtils";
import { getValidationSchema } from "./validationSchema";
import { MACHINE_STATUS } from "./constants";

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

// 🧠 表單配置
export const STATUS_FORM_CONFIG = {
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: "製立單表單",
    schema: getValidationSchema(MACHINE_STATUS.ORDER_CREATED),
    defaultValues: {
      group: "",
      start: "",
      end: "",
    },
  },

  [MACHINE_STATUS.IDLE]: {
    name: "待機表單",
    schema: getValidationSchema(MACHINE_STATUS.IDLE),
    defaultValues: {
      startTime: dayjs().toDate(),
      endTime: dayjs().add(2, "hour").toDate(),
    },
  },

  [MACHINE_STATUS.SETUP]: {
    name: "上模與調機表單",
    schema: getValidationSchema(MACHINE_STATUS.SETUP),
    defaultValues: {
      startTime: "",
      setupInfo: "",
    },
  },

  [MACHINE_STATUS.TESTING]: {
    name: "產品試模表單",
    schema: getValidationSchema(MACHINE_STATUS.TESTING),
    defaultValues: {
      startTime: "",
      product: "",
    },
  },

  [MACHINE_STATUS.STOPPED]: {
    name: "機台停機表單",
    schema: getValidationSchema(MACHINE_STATUS.STOPPED),
    defaultValues: {
      startTime: "",
      reason: "",
    },
  },
};
