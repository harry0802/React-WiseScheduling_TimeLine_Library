// validationSchema.js
import { z } from "zod";
import dayjs from "dayjs";
import { MACHINE_STATUS } from "./constants";

//! =============== 1. 共享驗證規則 ===============
//* 所有表單共享的基礎驗證邏輯，提高一致性

/**
 * 時間欄位基礎驗證 - 用於所有狀態的時間欄位
 */
const timeFieldValidation = {
  // 開始時間 - 必填且必須是有效日期時間
  start: z
    .string()
    .min(1, "開始時間為必填")
    .pipe(z.coerce.date())
    .refine((date) => dayjs(date).isValid(), "時間格式錯誤"),

  // 結束時間 - 可選但若提供必須是有效日期時間
  end: z
    .string()
    .optional()
    .pipe(z.coerce.date())
    .refine((date) => !date || dayjs(date).isValid(), "時間格式錯誤")
    .optional(),
};

/**
 * 機台基礎欄位驗證 - 用於所有狀態的機台相關欄位
 */
const machineFieldValidation = {
  // 機台編號 - 必填
  group: z.string().min(1, "機台編號為必填"),

  // 區域 - 必填
  area: z.string().min(1, "區域為必填"),
};

//! =============== 2. 狀態特定驗證 ===============
//* 根據狀態類型提供特定的驗證規則

/**
 * @function createOrderSchema
 * @description 創建製令單專用驗證架構
 * @param {Object} additionalFields - 額外的欄位驗證
 * @returns {z.ZodObject} Zod 驗證對象
 */
function createOrderSchema(additionalFields = {}) {
  return z.object({
    ...machineFieldValidation,
    ...additionalFields,
    // 製令單特殊處理：start 必填，end 為唯讀
    start: timeFieldValidation.start,
    end: z.any().optional(), // 製令單的結束時間是唯讀計算字段
  });
}

/**
 * @function createRegularSchema
 * @description 創建一般狀態驗證架構
 * @param {Object} additionalFields - 額外的欄位驗證
 * @returns {z.ZodObject} Zod 驗證對象
 */
function createRegularSchema(additionalFields = {}) {
  return z.object({
    ...machineFieldValidation,
    ...timeFieldValidation,
    ...additionalFields,
  });
}

/**
 * 製令單狀態表單驗證
 */
const orderSchema = createOrderSchema({
  // 產品名稱 - 選填，因為是唯讀欄位
  productName: z.string().optional(),

  // 製程 - 選填，因為是唯讀欄位
  process: z.string().optional(),

  // 數量 - 選填但必須是數字
  quantity: z.coerce.number().optional(),

  // 已完成數量 - 選填但必須是數字
  completedQty: z.coerce.number().optional(),
});

/**
 * 待機狀態表單驗證
 */
const idleSchema = createRegularSchema({
  // 待機狀態不需要額外的驗證字段
  machineId: z.number().optional(),
});

/**
 * 上模與調機狀態表單驗證
 */
const setupSchema = createRegularSchema({
  // 調機信息 - 選填
  setupInfo: z.string().optional(),

  // 原因 - 選填
  reason: z.string().optional(),
});

/**
 * 產品試模狀態表單驗證
 */
const testingSchema = createRegularSchema({
  // 產品 - 選填
  product: z.string().optional(),
});

/**
 * 機台停機狀態表單驗證
 */
const stoppedSchema = createRegularSchema({
  // 產品 - 選填
  product: z.string().optional(),

  // 停機原因 - 必填且有效值
  reason: z.string().min(1, "請選擇停機原因"),
});

//! =============== 3. 驗證模式導出 ===============
//* 整合所有驗證模式，提供統一的 API

/**
 * 所有狀態的表單驗證模式
 */
export const statusSchemas = {
  [MACHINE_STATUS.ORDER_CREATED]: orderSchema,
  [MACHINE_STATUS.IDLE]: idleSchema,
  [MACHINE_STATUS.SETUP]: setupSchema,
  [MACHINE_STATUS.TESTING]: testingSchema,
  [MACHINE_STATUS.STOPPED]: stoppedSchema,
};

/**
 * @function getValidationSchema
 * @description 根據狀態類型獲取對應的驗證模式
 * @param {string} status - 狀態類型，來自 MACHINE_STATUS
 * @returns {z.ZodObject} Zod 驗證對象
 */
export function getValidationSchema(status) {
  if (!status) {
    console.warn("❌ [ZOD] 缺少狀態類型參數，使用空對象驗證");
    return z.object({});
  }

  const schema = statusSchemas[status];

  if (!schema) {
    console.warn(`❌ [ZOD] 未找到狀態 "${status}" 的驗證模式，使用空對象驗證`);
    return z.object({});
  }

  return schema;
}

//! =============== 4. 輔助功能 ===============
//* 用於處理驗證結果和錯誤的實用函數

/**
 * @function validateFormData
 * @description 驗證表單數據，返回結果而非拋出錯誤
 * @param {string} status - 狀態類型
 * @param {Object} data - 要驗證的表單數據
 * @returns {Object} 包含驗證結果、錯誤和處理後數據的對象
 */
export function validateFormData(status, data) {
  const schema = getValidationSchema(status);

  try {
    const validatedData = schema.parse(data);

    return {
      success: true,
      data: validatedData,
      errors: null,
    };
  } catch (error) {
    if (error.name === "ZodError") {
      // 格式化 Zod 錯誤
      const formattedErrors = {};

      error.errors.forEach((err) => {
        const path = err.path.join(".");
        formattedErrors[path] = err.message;
      });

      return {
        success: false,
        data: null,
        errors: formattedErrors,
        originalError: error,
      };
    }

    // 非 Zod 錯誤
    return {
      success: false,
      data: null,
      errors: { _errors: [error.message] },
      originalError: error,
    };
  }
}
