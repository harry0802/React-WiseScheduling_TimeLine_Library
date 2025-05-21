//! =============== 1. 設定與常量 ===============
import dayjs from "dayjs";
import { MACHINE_STATUS } from "./constants";
import { getValidationSchema } from "./validationSchema";
import { DATE_FORMATS } from "../../../utils/schedule/dateUtils";

export const FORM_CONFIG = {
  defaultValues: {
    id: "",
    group: "",
    timeLineStatus: "",
    content: "",
    start: "",
    end: "",
    productId: "",
    productName: "",
    quantity: 0,
    completedQty: 0,
    process: "",
    orderStatus: "",
  },

  // MUI 時間選擇器通用配置
  timePickerProps: {
    type: "datetime-local",
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: 300, // 5分鐘間隔
    },
  },
};

export const VALIDATION_RULES = {
  group: {
    required: "請選擇機台",
  },
  start: {
    required: "請選擇開始時間",
    validate: {
      isValid: (value) => {
        if (!value) return true;
        return dayjs(value).isValid() || "無效的日期格式";
      },
      isFuture: (value) => {
        if (!value) return true;
        return dayjs(value).isAfter(dayjs()) || "開始時間必須在當前時間之後";
      },
    },
  },
  // 完全移除對 end 欄位的驗證規則，因為製令單對話框中是唯讀欄位
};
// 🧠 表單配置
export const STATUS_FORM_CONFIG = {
  [MACHINE_STATUS.ORDER_CREATED]: {
    name: "製令單表單",
    schema: getValidationSchema(MACHINE_STATUS.ORDER_CREATED),
    defaultValues: {
      group: "",
      start: "",
      // end 欄位對於製令單是唯讀的，不需要預設值
    },
  },

  [MACHINE_STATUS.IDLE]: {
    name: "待機表單",
    schema: getValidationSchema(MACHINE_STATUS.IDLE),
    defaultValues: {
      startTime: dayjs().toDate(),
      endTime: dayjs().add(2, "hour").toDate(),
      group: "",
      area: "",
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
