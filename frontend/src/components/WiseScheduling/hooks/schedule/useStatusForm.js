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

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理

/**
 * 集中管理表單欄位配置
 *
 * 🎯 設計思想：
 * - 將不同類型的表單欄位進行分類管理
 * - 根據機台狀態動態組合所需欄位
 * - 便於維護和擴展新的欄位組合
 */
export const FORM_FIELDS = {
  basic: ["status", "id", "group", "area", "timeLineStatus", "machineId"], // 基礎欄位 - 所有狀態都需要
  order: [
    // 訂單相關欄位 - 僅訂單狀態使用
    "productName",
    "process",
    "quantity",
    "completedQty",
    "scheduledStartTime",
    "scheduledEndTime",
    "orderStatus",
    "postponeTime", // 延遲完成日 - 僅用於顯示
    "workOrderSN", // 製令單號 - 僅用於顯示
  ],
  time: ["start", "end"], // 時間欄位 - 通用時間控制
  status: [
    // 狀態相關欄位 - 機台狀態特定
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
 *
 * 🔄 映射邏輯：
 * 1. 直接映射: id: "id" - 表單欄位名稱 = 資料欄位名稱
 * 2. 多路徑映射: start: [...] - 按順序嘗試多個資料來源
 * 3. 嵌套映射: productName: "orderInfo.productName" - 從嵌套物件取值
 *
 * 🛡️ 安全機制：
 * - 訂單狀態優先使用 orderInfo.* 路徑
 * - 其他狀態優先使用 status.* 路徑
 * - 防止資料來源混用造成的錯誤
 */
export const FIELD_MAPPING = {
  // 直接映射欄位
  id: "id",
  group: "group",
  area: "area",
  timeLineStatus: "timeLineStatus",
  machineId: "machineId", // 添加 machineId

  // 多路徑映射欄位（按優先順序嘗試）
  start: ["start", "status.startTime", "orderInfo.scheduledStartTime"],
  end: ["end", "status.endTime", "orderInfo.scheduledEndTime"],

  // 訂單資料嵌套映射
  productName: "orderInfo.productName",
  process: "orderInfo.process",
  quantity: "orderInfo.quantity",
  completedQty: "orderInfo.completedQty",
  orderStatus: "orderInfo.orderStatus",
  postponeTime: "orderInfo.postponeTime", // 延遲完成日
  workOrderSN: "orderInfo.workOrderSN", // 製令單號

  // 狀態資料嵌套映射
  reason: "status.reason",
  product: "status.product",
};

//! =============== 2. 核心功能 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function getRequiredFields
 * @description 根據狀態類型獲取必要欄位列表
 * @param {string} status - 機台狀態
 * @returns {Array} 欄位列表
 *
 * 🎯 執行流程：
 * 1. 基礎欄位組合 - 所有狀態都需要 basic + time 欄位
 * 2. 狀態特化 - 根據機台狀態添加特定欄位
 * 3. 返回完整列表 - 去重後的欄位陣列
 *
 * @example
 *  訂單狀態
 * getRequiredFields("ORDER_CREATED")
 *  返回: ["status", "id", "group", "area", "timeLineStatus", "start", "end",
 *         "productName", "process", "quantity", "completedQty", ...]
 *
 *  測試狀態
 * getRequiredFields("TESTING")
 *  返回: ["status", "id", "group", "area", "timeLineStatus", "start", "end", "product"]
 */
function getRequiredFields(status) {
  const baseFields = [...FORM_FIELDS.basic, ...FORM_FIELDS.time];

  if (status === MACHINE_STATUS.ORDER_CREATED) {
    return [...baseFields, ...FORM_FIELDS.order]; // 基礎 + 時間 + 訂單
  }

  if (status === MACHINE_STATUS.TESTING) {
    return [...baseFields, "product"]; // 基礎 + 時間 + 產品
  }

  if (status === MACHINE_STATUS.STOPPED) {
    return [...baseFields, "reason"]; // 基礎 + 時間 + 原因
  }

  if (status === MACHINE_STATUS.SETUP) {
    return [...baseFields, "setupInfo", "reason"]; // 基礎 + 時間 + 設定資訊 + 原因
  }

  return baseFields; // 基礎 + 時間
}

/**
 * @function getFieldValue
 * @description 從項目數據中提取指定欄位的值
 * @param {string} field - 欄位名稱
 * @param {Object} itemData - 項目數據
 * @param {string} status - 當前狀態
 * @returns {*} 欄位值
 *
 * 🧠 智能判斷邏輯：
 * 1. 資料來源判斷：
 *    - 訂單狀態 → 優先使用 orderInfo.* 路徑
 *    - 其他狀態 → 優先使用 status.* 路徑
 *
 * 2. 路徑類型處理：
 *    - 陣列映射 → 按優先順序嘗試多個路徑
 *    - 字串映射 → 單一路徑存取
 *    - 無映射 → 直接屬性存取
 *
 * @example
 *  假設資料結構
 * const itemData = {
 *   id: "M001",
 *   orderInfo: { scheduledStartTime: "2024-01-01T09:00:00Z" },
 *   status: { startTime: "2024-01-01T09:15:00Z" }
 * };
 *
 *  訂單狀態下取得開始時間
 * getFieldValue("start", itemData, "ORDER_CREATED")
 *  嘗試順序: ["start", "status.startTime", "orderInfo.scheduledStartTime"]
 *  跳過 "status.startTime" (因為是訂單狀態)
 *  返回: "2024-01-01T09:00:00Z" (來自 orderInfo.scheduledStartTime)
 *
 *  非訂單狀態下取得開始時間
 * getFieldValue("start", itemData, "RUNNING")
 *  嘗試順序: ["start", "status.startTime", "orderInfo.scheduledStartTime"]
 *  跳過 "orderInfo.scheduledStartTime" (因為非訂單狀態)
 *  返回: "2024-01-01T09:15:00Z" (來自 status.startTime)
 */
function getFieldValue(field, itemData, status) {
  if (!itemData) return null;

  const mapping = FIELD_MAPPING[field];
  const isOrderStatus = status === MACHINE_STATUS.ORDER_CREATED;

  // 🔄 多路徑處理
  if (Array.isArray(mapping)) {
    return findValueFromPaths(mapping, itemData, isOrderStatus);
  }

  // 🎯 單一路徑處理
  if (mapping) {
    return getValueFromPath(mapping, itemData, isOrderStatus);
  }

  // 📍 直接欄位存取
  return itemData[field];
}

/**
 * @function findValueFromPaths
 * @description 從多個路徑中尋找有效值
 * @param {Array} paths - 路徑陣列
 * @param {Object} itemData - 項目數據
 * @param {boolean} isOrderStatus - 是否為訂單狀態
 * @returns {*} 找到的值
 *
 * 🔍 搜尋策略：
 * 1. 優先順序搜尋 - 按陣列順序依次嘗試
 * 2. 路徑過濾 - 跳過不符合當前狀態的路徑
 * 3. 值有效性檢查 - 只有非 null/undefined 值才被採用
 * 4. 短路返回 - 找到第一個有效值即停止搜尋
 */
function findValueFromPaths(paths, itemData, isOrderStatus) {
  // 遍歷所有可能的路徑
  for (const path of paths) {
    // 🚦 路徑適用性檢查
    if (shouldSkipPath(path, isOrderStatus)) {
      continue; // 跳過不適用的路徑
    }

    // 🔍 嘗試提取值
    const value = getNestedValue(itemData, path);
    if (value !== undefined && value !== null) {
      return value; // 找到有效值，立即返回
    }
  }
  return null; // 所有路徑都無效
}

/**
 * @function getValueFromPath
 * @description 從單一路徑獲取值
 * @param {string} path - 屬性路徑
 * @param {Object} itemData - 項目數據
 * @param {boolean} isOrderStatus - 是否為訂單狀態
 * @returns {*} 值或 null
 */
function getValueFromPath(path, itemData, isOrderStatus) {
  if (shouldSkipPath(path, isOrderStatus)) {
    return null;
  }
  return getNestedValue(itemData, path);
}

/**
 * @function shouldSkipPath
 * @description 判斷是否應該跳過指定路徑
 * @param {string} path - 屬性路徑
 * @param {boolean} isOrderStatus - 是否為訂單狀態
 * @returns {boolean} 是否跳過
 *
 * 🛡️ 邏輯說明：
 * - 資料隔離：防止訂單資料和狀態資料混用
 * - 路徑過濾：確保只存取適當的資料來源
 * - 類型安全：避免存取不存在的嵌套屬性
 */
function shouldSkipPath(path, isOrderStatus) {
  return (
    (isOrderStatus && path.startsWith("status.")) || // 訂單狀態跳過 status 路徑
    (!isOrderStatus && path.startsWith("orderInfo.")) // 非訂單狀態跳過 orderInfo 路徑
  );
}

/**
 * @function processTimeField
 * @description 處理時間欄位的特殊邏輯
 * @param {string} field - 欄位名稱
 * @param {Object} item - 項目數據
 * @param {string} status - 狀態
 * @returns {*} 處理後的時間值
 *
 * ⏰ 處理邏輯：
 * 1. 唯讀時間：製令單的結束時間保持原始格式，供顯示用
 * 2. 可編輯時間：其他時間欄位格式化為表單可用格式
 * 3. 預設值：開始時間若無值則使用當前時間
 * 4. 空值處理：其他情況返回 null
 */
function processTimeField(field, item, status) {
  // 🔒 製令單結束時間 - 保持原始值（唯讀）
  if (field === "end" && status === MACHINE_STATUS.ORDER_CREATED) {
    const rawValue = getFieldValue(field, item, status);
    console.log(`🔍 [processTimeField] 唯讀的 end 欄位原始值:`, rawValue);
    console.log(
      `🔍 [processTimeField] 唯讀的 end 欄位類型:`,
      rawValue ? typeof rawValue : "undefined"
    );
    return rawValue; // 不格式化，保持原始 Date 物件
  }

  // ⚙️ 其他時間欄位 - 格式化處理
  const rawValue = getFieldValue(field, item, status);
  return formatToFormDateTime(
    rawValue || (field === "start" && new Date()) || null
  );
}

/**
 * @function buildFormFields
 * @description 建構表單初始化所需的欄位數據
 * @param {Array} fields - 欄位列表
 * @param {Object} item - 項目數據
 * @param {string} status - 狀態
 * @returns {Object} 表單欄位數據
 *
 * 🏗️ 建構流程：
 * 1. 欄位遍歷 - 處理所有必要欄位
 * 2. 類型分流 - 時間欄位和一般欄位分別處理
 * 3. 預設值設定 - 特殊欄位的預設值邏輯
 * 4. 有效值過濾 - 只保留有意義的值
 */
function buildFormFields(fields, item, status) {
  const updateFields = {};

  fields.forEach((field) => {
    let value;

    // ⏰ 時間欄位特殊處理
    if (field === "start" || field === "end") {
      value = processTimeField(field, item, status);
    } else {
      // 📝 一般欄位處理
      value = getFieldValue(field, item, status);

      // 🎯 狀態欄位預設值
      if (field === "timeLineStatus") {
        value = value || status; // 無值時使用當前狀態
      }
    }

    // ✅ 只設定有效值
    if (value !== undefined) {
      updateFields[field] = value;
    }
  });

  return updateFields;
}

/**
 * @function useFormInitialization
 * @description 處理表單初始化邏輯
 * @param {Object} item - 項目數據
 * @param {string} status - 狀態
 * @param {Function} setValue - react-hook-form 的 setValue 函數
 * @returns {Object} 初始化狀態和初始欄位值
 *
 * 🚀 初始化時序：
 * 1. 檢查是否已初始化 - 防重複初始化
 * 2. 取得必要欄位 - 根據狀態計算所需欄位
 * 3. 建構表單資料 - 提取並處理欄位值
 * 4. 保存初始值 - 用於變更追蹤
 * 5. 批次設定表單值 - 一次性更新所有欄位
 * 6. 標記初始化完成 - 避免重複執行
 *
 * 🛡️ 錯誤處理：
 * - 捕獲初始化過程中的錯誤
 * - 記錄錯誤日誌但不中斷運行
 * - 確保系統穩定性
 */
function useFormInitialization(item, status, setValue) {
  const isInitialized = useRef(false); // 🎯 初始化狀態追蹤
  const initialFields = useRef({}); // 📋 初始欄位值保存

  useEffect(() => {
    // 🛡️ 防重複初始化
    if (!item || isInitialized.current) return;

    try {
      // 1️⃣ 取得必要欄位
      const fields = getRequiredFields(status);

      // 2️⃣ 建構表單資料
      const updateFields = buildFormFields(fields, item, status);

      // 3️⃣ 保存初始值（用於變更追蹤）
      initialFields.current = { ...updateFields };

      // 4️⃣ 批次設定表單值
      Object.entries(updateFields).forEach(([field, value]) => {
        setValue(field, value, {
          shouldValidate: true, // 觸發驗證
          shouldDirty: false, // 不標記為已變更
        });
      });

      // 5️⃣ 標記初始化完成
      isInitialized.current = true;
    } catch (error) {
      // 🚨 錯誤處理但不中斷
      logError(
        new FormError("表單初始化失敗", {
          status,
          itemId: item?.id,
          error: error.message,
        })
      );
      console.error("表單初始化錯誤:", error);
    }
  }, [item, setValue, status]);

  return {
    initialized: isInitialized.current,
    initialFields: initialFields.current,
  };
}

/**
 * @function useFieldChangeTracking
 * @description 追蹤欄位變更
 * @param {boolean} isDirty - 表單是否已變更
 * @param {Object} dirtyFields - 已變更的欄位
 * @param {Function} watch - react-hook-form 的 watch 函數
 * @param {Object} initialFields - 初始欄位值
 * @returns {Object} 變更的欄位詳情
 *
 * 📝 變更追蹤策略：
 * 1. 效能優化 - 無變更時避免計算
 * 2. 精確比較 - 比較真實值而非表單狀態
 * 3. 變更歷史 - 記錄前後值的變化
 * 4. 記憶化 - 使用 useMemo 避免重複計算
 *
 * @example
 * // 返回格式
 * {
 *   productName: { from: "舊產品", to: "新產品" },
 *   quantity: { from: 100, to: 150 }
 * }
 */
function useFieldChangeTracking(isDirty, dirtyFields, watch, initialFields) {
  return useMemo(() => {
    // 🚫 無變更時直接返回空物件
    if (!isDirty) return {};

    // 🔍 分析每個變更欄位
    return Object.keys(dirtyFields).reduce((result, field) => {
      const currentValue = watch(field); // 📍 當前值
      const initialValue = initialFields[field]; // 📍 初始值

      // ✅ 只記錄真正有變更的欄位
      if (currentValue !== initialValue) {
        result[field] = {
          from: initialValue, // 變更前
          to: currentValue, // 變更後
        };
      }

      return result;
    }, {});
  }, [isDirty, dirtyFields, watch, initialFields]);
}

/**
 * @function useStatusForm
 * @description 表單處理 Hook，提供統一的表單處理邏輯
 * @param {string} status - 狀態類型，來自 MACHINE_STATUS
 * @param {Object} item - 表單項目數據
 * @returns {Object} 表單處理工具和狀態
 *
 * 🎯 統一介面設計：
 * - 🛠️ 表單基礎方法：register, watch, control, setValue
 * - 🚨 錯誤處理：errors, isFieldError
 * - 📊 狀態跟踪：initialized, isDirty, changedFields
 * - 📋 欄位相關工具：fields, isFieldRequired, getFieldValue
 * - 🔧 輔助方法：resetField
 *
 * 🔄 執行流程：
 * 1. 取得 react-hook-form 方法
 * 2. 計算必要欄位列表
 * 3. 執行表單初始化
 * 4. 追蹤欄位變更
 * 5. 返回統一的 API 介面
 *
 * @example
 * // 📝 基本使用
 * const {
 *   register,
 *   watch,
 *   errors,
 *   initialized,
 *   changedFields,
 *   isFieldRequired,
 *   resetField
 * } = useStatusForm(MACHINE_STATUS.ORDER_CREATED, orderItem);
 *
 * // 🔍 欄位註冊
 * <input {...register("productName")} />
 *
 * // 📊 監控變更
 * console.log("變更的欄位:", changedFields);
 * // 輸出: { productName: { from: "舊產品", to: "新產品" } }
 *
 * // 🎯 條件渲染
 * {isFieldRequired("reason") && (
 *   <textarea {...register("reason")} />
 * )}
 *
 * // 🔄 重置欄位
 * <button onClick={() => resetField("productName")}>
 *   重置產品名稱
 * </button>
 */
export const useStatusForm = (status, item) => {
  // 🔗 取得 react-hook-form 方法
  const methods = useFormContext();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  // 📋 計算必要欄位
  const fields = useMemo(() => getRequiredFields(status), [status]);

  // 🚀 執行表單初始化
  const { initialized, initialFields } = useFormInitialization(
    item,
    status,
    setValue
  );

  // 📝 追蹤欄位變更
  const changedFields = useFieldChangeTracking(
    isDirty,
    dirtyFields,
    watch,
    initialFields
  );

  return {
    // 🛠️ 表單基礎方法
    register,
    watch,
    control,
    setValue,

    // 🚨 錯誤處理
    errors,
    isFieldError: (fieldName) => !!errors[fieldName],

    // 📊 狀態跟踪
    initialized,
    isDirty,
    changedFields,

    // 📋 欄位相關工具
    fields,
    isFieldRequired: (field) => fields.includes(field),
    getFieldValue: watch,

    // 🔧 輔助方法
    resetField: (field, options = {}) => {
      const defaultValue =
        initialFields[field] ||
        (field === "start" ? formatToFormDateTime(new Date()) : "");

      setValue(field, defaultValue, {
        shouldValidate: true,
        shouldDirty: false,
        ...options,
      });
    },
  };
};

//! =============== 4. 工具函數 ===============
//* 通用功能區，可被多個模組復用

/**
 * @function getNestedValue
 * @description 從嵌套對象中安全獲取值
 * @param {Object} obj - 源對象
 * @param {string} path - 屬性路徑，例如 "orderInfo.productName"
 * @returns {*} 找到的值或 undefined
 *
 * 🛡️ 安全機制：
 * 1. 空值檢查 - 防止對 null/undefined 進行屬性存取
 * 2. 路徑驗證 - 確保嵌套物件存在
 * 3. 遞迴保護 - 每層都檢查屬性存在性
 * 4. 一致性返回 - 統一返回 undefined 而非 null
 *
 * @example
 * const value = getNestedValue(data, "orderInfo.productName");
 *
 * @notes
 * - 會檢查路徑的有效性，避免混用訂單和狀態資料
 * - 安全處理 null 和 undefined 值
 * - 遞迴處理多層嵌套屬性
 */
export const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;

  const parts = path.split(".");

  // 🛡️ 資料來源安全檢查
  if (parts[0] === "orderInfo" && (!obj.orderInfo || obj.orderInfo === null)) {
    return undefined; // orderInfo 不存在時直接返回
  }

  if (parts[0] === "status" && (!obj.status || obj.status === null)) {
    return undefined; // status 不存在時直接返回
  }

  // 🔍 遞迴安全存取
  return parts.reduce((current, part) => {
    return current && current[part] !== undefined ? current[part] : undefined;
  }, obj);
};

/**
 * @function flattenFormErrors
 * @description 將嵌套的表單錯誤攤平為單層對象
 * @param {Object} errors - 來自 react-hook-form 的錯誤對象
 * @returns {Object} 攤平的錯誤對象
 *
 * 🔄 處理邏輯：
 * 1. 遞迴處理多層嵌套錯誤
 * 2. 使用點記號連接嵌套路徑
 * 3. 保留原始錯誤訊息結構
 * 4. 統一錯誤格式便於處理
 *
 * @example
 * const flatErrors = flattenFormErrors(formErrors);
 * // 輸入: { user: { name: { message: "姓名為必填" }, email: { message: "信箱格式錯誤" } } }
 * // 輸出: { "user.name": "姓名為必填", "user.email": "信箱格式錯誤" }
 *
 * @notes
 * - 遞迴處理多層嵌套錯誤
 * - 使用點記號連接嵌套路徑
 * - 適用於複雜表單結構的錯誤處理
 */
export const flattenFormErrors = (errors) => {
  if (!errors) return {};

  const flatErrors = {};

  Object.entries(errors).forEach(([key, value]) => {
    if (value && typeof value === "object" && "message" in value) {
      // 基本錯誤訊息
      flatErrors[key] = value.message;
    } else if (value && typeof value === "object") {
      // 嵌套錯誤遞迴處理
      const nestedErrors = flattenFormErrors(value);
      Object.entries(nestedErrors).forEach(([nestedKey, nestedValue]) => {
        flatErrors[`${key}.${nestedKey}`] = nestedValue;
      });
    }
  });

  return flatErrors;
};
