//! =============== 1. 設定與常量 ===============
import dayjs from "dayjs";

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
        return (
          dayjs(value).isAfter(dayjs()) ||
          "開始時間必須在當前時間之後"
        );
      },
    },
  },
  end: {
    required: "請選擇結束時間",
    validate: {
      isValid: (value) => {
        if (!value) return true;
        return dayjs(value).isValid() || "無效的日期格式";
      },
      isAfterStart: (value, formValues) => {
        if (!value || !formValues.start) return true;
        return (
          dayjs(value).isAfter(dayjs(formValues.start)) ||
          "結束時間必須在開始時間之後"
        );
      },
    },
  },
};
