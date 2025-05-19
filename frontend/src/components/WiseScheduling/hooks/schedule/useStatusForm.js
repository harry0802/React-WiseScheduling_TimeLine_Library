// hooks/useStatusForm.js
import { useFormContext } from "react-hook-form";
import { useEffect, useRef, useMemo } from "react";
import dayjs from "dayjs";
import { formatToFormDateTime } from "../../utils/schedule/dateUtils";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import {
  ValidationError,
  FormError,
  logError,
} from "../../utils/schedule/errorHandler";

//! =============== 1. 表單欄位配置 ===============
//* 集中管理表單欄位配置，便於統一管理

/**
 * 集中管理表單欄位配置
 */
export const FORM_FIELDS = {
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

/**
 * 欄位映射 - 將內部欄位映射到表單欄位
 */
export const FIELD_MAPPING = {
  // 基本欄位直接對應
  id: "id",
  group: "group",
  area: "area",
  timeLineStatus: "timeLineStatus",

  // 時間欄位映射
  start: ["start", "status.startTime", "orderInfo.scheduledStartTime"],
  end: ["end", "status.endTime", "orderInfo.scheduledEndTime"],

  // 訂單欄位映射
  productName: "orderInfo.productName",
  process: "orderInfo.process",
  quantity: "orderInfo.quantity",
  completedQty: "orderInfo.completedQty",
  orderStatus: "orderInfo.orderStatus",

  // 狀態欄位映射
  reason: "status.reason",
  product: "status.product",
};

//! =============== 2. 表單處理 Hook ===============
//* 提供統一的表單處理邏輯

/**
 * @function useStatusForm
 * @description 表單處理 Hook，處理表單初始化、數據交互和狀態管理
 * @param {string} status - 狀態類型，來自 MACHINE_STATUS
 * @param {Object} item - 表單項目數據
 * @returns {Object} 表單處理工具和狀態
 */
export const useStatusForm = (status, item) => {
  // 使用 react-hook-form 的 context
  const methods = useFormContext();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  // 使用 ref 追踪初始化狀態
  const isInitialized = useRef(false);
  const initialFields = useRef({});

  // 依據狀態建立欄位輔助工具
  const fieldHelpers = useMemo(() => {
    // 建立當前狀態所需的欄位列表
    const requiredFields = [...FORM_FIELDS.basic, ...FORM_FIELDS.time];

    // 根據狀態類型添加特定欄位
    switch (status) {
      case MACHINE_STATUS.ORDER_CREATED:
        requiredFields.push(...FORM_FIELDS.order);
        break;
      case MACHINE_STATUS.TESTING:
        requiredFields.push("product");
        break;
      case MACHINE_STATUS.STOPPED:
        requiredFields.push("reason");
        break;
      case MACHINE_STATUS.SETUP:
        requiredFields.push("setupInfo", "reason");
        break;
      default:
        // 待機狀態或其他狀態不需添加額外欄位
        break;
    }

    return {
      // 狀態所需的欄位列表（已去重）
      fields: [...new Set(requiredFields)],

      // 檢查欄位是否為當前狀態所需
      isFieldRequired: (field) => requiredFields.includes(field),

      // 獲取欄位在表單中的預設值
      getDefaultValue: (field) => {
        // 時間欄位特殊處理
        if (field === "start") return formatToFormDateTime(new Date());
        if (field === "end") return "";

        // 其他欄位返回空值
        return "";
      },

      // 從項目中提取欄位值
      getFieldValue: (field, itemData) => {
        if (!itemData) return null;

        // 處理嵌套欄位路徑
        const mapping = FIELD_MAPPING[field];

        if (Array.isArray(mapping)) {
          // 多個可能的路徑，按優先順序尋找
          for (const path of mapping) {
            const value = getNestedValue(itemData, path);
            if (value !== undefined && value !== null) {
              return value;
            }
          }
          return null;
        } else if (mapping) {
          // 單一映射路徑
          return getNestedValue(itemData, mapping);
        }

        // 直接欄位
        return itemData[field];
      },
    };
  }, [status]);

  // 初始化表單數據
  useEffect(() => {
    if (!item || isInitialized.current) return;

    try {
      // 準備要設定的欄位數據
      const updateFields = {};

      // 遍歷所有需要的欄位
      fieldHelpers.fields.forEach((field) => {
        let value;

        // 時間欄位特殊處理
        if (field === "start" || field === "end") {
          const rawValue = fieldHelpers.getFieldValue(field, item);
          value = formatToFormDateTime(
            rawValue || (field === "start" && new Date()) || null
          );
        } else {
          // 其他欄位直接取值
          value = fieldHelpers.getFieldValue(field, item);

          // 確保狀態欄位正確設置
          if (field === "timeLineStatus") {
            value = value || status;
          }
        }

        // 只有當值存在時才更新
        if (value !== undefined) {
          updateFields[field] = value;
        }
      });

      // 保存初始欄位值，用於比較變更
      initialFields.current = { ...updateFields };

      // 批次設置所有欄位值
      Object.entries(updateFields).forEach(([field, value]) => {
        setValue(field, value, {
          shouldValidate: true,
          shouldDirty: false,
        });
      });

      isInitialized.current = true;
    } catch (error) {
      // 記錄錯誤但不中斷
      logError(
        new FormError("表單初始化失敗", {
          status,
          itemId: item?.id,
          error: error.message,
        })
      );
      console.error("表單初始化錯誤:", error);
    }
  }, [item, setValue, status, fieldHelpers]);

  // 追踪已變更的欄位
  const changedFields = useMemo(() => {
    if (!isInitialized.current || !isDirty) return {};

    // 篩選出已變更的欄位
    return Object.keys(dirtyFields).reduce((result, field) => {
      const currentValue = watch(field);
      const initialValue = initialFields.current[field];

      // 僅當值真正變更時才標記
      if (currentValue !== initialValue) {
        result[field] = {
          from: initialValue,
          to: currentValue,
        };
      }

      return result;
    }, {});
  }, [isDirty, dirtyFields, watch]);

  return {
    // 表單基礎方法
    register,
    watch,
    control,
    setValue,

    // 錯誤處理
    errors,
    isFieldError: (fieldName) => !!errors[fieldName],

    // 狀態跟踪
    initialized: isInitialized.current,
    isDirty,
    changedFields,

    // 欄位相關工具
    fields: fieldHelpers.fields,
    isFieldRequired: fieldHelpers.isFieldRequired,
    getFieldValue: watch,

    // 輔助方法
    resetField: (field, options = {}) => {
      setValue(
        field,
        initialFields.current[field] || fieldHelpers.getDefaultValue(field),
        {
          shouldValidate: true,
          shouldDirty: false,
          ...options,
        }
      );
    },
  };
};

//! =============== 3. 輔助函數 ===============
//* 提供表單處理所需的實用工具函數

/**
 * @function getNestedValue
 * @description 從嵌套對象中獲取值
 * @param {Object} obj - 源對象
 * @param {string} path - 屬性路徑，例如 "orderInfo.productName"
 * @returns {*} 找到的值或 undefined
 */
export const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;

  // 處理點符號路徑
  const parts = path.split(".");

  // 遞迴獲取嵌套值
  return parts.reduce((current, part) => {
    return current && current[part] !== undefined ? current[part] : undefined;
  }, obj);
};

/**
 * @function flattenFormErrors
 * @description 將嵌套的表單錯誤攤平為單層對象
 * @param {Object} errors - 來自 react-hook-form 的錯誤對象
 * @returns {Object} 攤平的錯誤對象
 */
export const flattenFormErrors = (errors) => {
  if (!errors) return {};

  // 攤平嵌套錯誤
  const flatErrors = {};

  Object.entries(errors).forEach(([key, value]) => {
    if (value && typeof value === "object" && "message" in value) {
      // 基本錯誤
      flatErrors[key] = value.message;
    } else if (value && typeof value === "object") {
      // 嵌套錯誤
      const nestedErrors = flattenFormErrors(value);

      Object.entries(nestedErrors).forEach(([nestedKey, nestedValue]) => {
        flatErrors[`${key}.${nestedKey}`] = nestedValue;
      });
    }
  });

  return flatErrors;
};
