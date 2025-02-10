// hooks/useStatusForm.js
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { formatToFormDateTime } from "../utils/dateUtils";

// 🧠 集中管理表單欄位配置
const FORM_FIELDS = {
  basic: ["status", "id", "group"],
  order: ["productName", "process", "quantity", "completedQty"],
  time: ["start", "end"],
  status: ["orderStatus", "startTime", "endTime"],
};

export const useStatusForm = (status, item) => {
  const methods = useFormContext();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  // ✨ 初始化表單數據
  useEffect(() => {
    if (!item) return;
    console.log("🚀 ~ useEffect ~ item:", item);
    // 設置基本資訊
    FORM_FIELDS.basic.forEach((field) => {
      setValue(field, field === "status" ? status : item[field]);
    });

    // 設置訂單資訊
    FORM_FIELDS.order.forEach((field) => {
      setValue(field, item.orderInfo[field]);
    });

    // 設置時間資訊
    FORM_FIELDS.time.forEach((field) => {
      const value = item[field];
      setValue(field, formatToFormDateTime(value));
    });

    // 設置狀態資訊
    FORM_FIELDS.status.forEach((field) => {
      if (field === "orderStatus") {
        setValue(field, item.orderInfo[field]);
      } else {
        setValue(field, item.status?.[field]);
      }
    });
  }, [item, setValue, status]);

  return {
    register,
    watch,
    errors,
    setValue,
    // 💡 提供一些常用的輔助方法
    getFieldValue: watch,
    isFieldError: (fieldName) => !!errors[fieldName],
  };
};
