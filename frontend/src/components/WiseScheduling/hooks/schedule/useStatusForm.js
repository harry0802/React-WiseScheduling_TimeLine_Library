// hooks/useStatusForm.js
import { useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { formatToFormDateTime } from "../../components/timelineGantt/utils/dateUtils";

// 🧠 集中管理表單欄位配置
const FORM_FIELDS = {
  basic: ["status", "id", "group", "area", "timeLineStatus"],
  order: [
    "productName",
    "process",
    "quantity",
    "completedQty",
    "scheduledStartTime",
    "scheduledEndTime",
    "orderStatus",
  ],
  time: ["start", "end"],
  status: [
    "startTime",
    "endTime",
    "reason",
    "product",
    "planStartDate",
    "planEndDate",
    "actualStartDate",
    "actualEndDate",
  ],
};

export const useStatusForm = (status, item) => {
  console.log("🚀 ~ useStatusForm ~ item:", item);
  const methods = useFormContext();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = methods;

  // 使用 ref 追踪初始化狀態
  const isInitialized = useRef(false);

  // 初始化表單數據
  useEffect(() => {
    if (!item || isInitialized.current) return;

    // 批次設置所有值
    const updates = {
      // 基本資訊
      ...FORM_FIELDS.basic.reduce(
        (acc, field) => ({
          ...acc,
          [field]: field === "status" ? status : item[field],
        }),
        {}
      ),

      // 訂單資訊
      ...FORM_FIELDS.order.reduce(
        (acc, field) => ({
          ...acc,
          [field]: item.orderInfo?.[field],
        }),
        {}
      ),

      // 時間資訊
      ...FORM_FIELDS.time.reduce(
        (acc, field) => ({
          ...acc,
          [field]: formatToFormDateTime(item[field]),
        }),
        {}
      ),

      // 狀態資訊
      ...FORM_FIELDS.status.reduce(
        (acc, field) => ({
          ...acc,
          [field]: item.status?.[field],
        }),
        {}
      ),
    };
    console.log("🚀 ~ useEffect ~ updates:", updates);

    // 一次性設置所有值
    Object.entries(updates).forEach(([field, value]) => {
      if (value !== undefined) {
        setValue(field, value, {
          shouldValidate: true,
          shouldDirty: false,
        });
      }
    });

    isInitialized.current = true;
  }, [item, setValue, status]);

  // 提供初始化狀態
  const initialized = isInitialized.current;

  return {
    register,
    watch,
    errors,
    control,
    setValue,
    initialized,
    getFieldValue: watch,
    isFieldError: (fieldName) => !!errors[fieldName],
  };
};
