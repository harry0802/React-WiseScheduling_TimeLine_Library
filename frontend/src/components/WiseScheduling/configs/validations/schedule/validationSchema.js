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
    .transform((val) => dayjs(val).toDate())
    .refine((date) => dayjs(date).isValid(), "時間格式錯誤"),
  
  // 結束時間 - 可選但若提供必須是有效日期時間
  // 接受字符串或日期類型，解決 "Expected string, received date" 錯誤
  end: z
    .union([
      z.string().optional(),
      z.date().optional()
    ])
    .optional()
    .transform((val) => (val ? dayjs(val).toDate() : undefined))
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
 * @function createBaseSchema
 * @description 創建基礎表單架構
 * @param {Object} additionalFields - 額外的欄位驗證
 * @param {string} statusType - 狀態類型，用於特殊處理
 * @returns {z.ZodObject} Zod 驗證對象
 */
const createBaseSchema = (additionalFields = {}, statusType = '') => {
  // 創建基礎機台欄位驗證
  const baseFields = {
    ...machineFieldValidation,
    ...additionalFields,
  };
  
  // 修改時間欄位處理方式
  if (statusType === MACHINE_STATUS.ORDER_CREATED) {
    // 製令單狀態：只需要 start 欄位驗證，end 欄位為唯讀
    return z.object({
      ...baseFields,
      // 開始時間 - 必填且必須是有效日期時間
      start: timeFieldValidation.start,
      // 結束時間 - 完全接受任何值，因為是唯讀欄位
      end: z.any().optional(),
    });
  } else {
    // 其他狀態：使用標準時間欄位驗證
    return z.object({
      ...baseFields,
      ...timeFieldValidation,
    });
  }
};

/**
 * 製令單狀態表單驗證
 */
const orderSchema = createBaseSchema({
  // 產品名稱 - 改為選填，因為是唯讀欄位
  productName: z.string().optional(),
  
  // 製程 - 改為選填，因為是唯讀欄位
  process: z.string().optional(),
  
  // 數量 - 選填但必須是數字
  quantity: z
    .union([
      z.string().transform(val => parseInt(val) || 0),
      z.number()
    ])
    .optional(),
  
  // 已完成數量 - 選填但必須是數字
  completedQty: z
    .union([
      z.string().transform(val => parseInt(val) || 0),
      z.number()
    ])
    .optional(),
  
  // 完全移除 end 欄位，改為在 createBaseSchema 函數中處理
}, MACHINE_STATUS.ORDER_CREATED);

/**
 * 待機狀態表單驗證
 */
const idleSchema = createBaseSchema({
  // 待機狀態不需要額外的驗證字段
});

/**
 * 上模與調機狀態表單驗證
 */
const setupSchema = createBaseSchema({
  // 調機信息 - 選填
  setupInfo: z.string().optional(),
  
  // 原因 - 選填
  reason: z.string().optional(),
});

/**
 * 產品試模狀態表單驗證
 */
const testingSchema = createBaseSchema({
  // 產品 - 改為選填，不是必填
  product: z.string().optional(),
});

/**
 * 機台停機狀態表單驗證
 */
const stoppedSchema = createBaseSchema({
  // 產品 - 選填
  product: z.string().optional(),
  
  // 停機原因 - 必填且有效值
  reason: z
    .string()
    .min(1, "請選擇停機原因"),
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

// 輸出製令單驗證模式，用於調試
console.log(`🔍 [ZOD] 製令單 (ORDER_CREATED) 驗證模式:`, orderSchema);

/**
 * @function getValidationSchema
 * @description 根據狀態類型獲取對應的驗證模式
 * @param {string} status - 狀態類型，來自 MACHINE_STATUS
 * @returns {z.ZodObject} Zod 驗證對象
 */
export const getValidationSchema = (status) => {
  console.log(`🔍 [ZOD] 獲取驗證模式: ${status}`);
  
  if (!status) {
    console.warn('❌ [ZOD] 缺少狀態類型參數，使用空對象驗證');
    return z.object({});
  }
  
  const schema = statusSchemas[status];
  
  if (!schema) {
    console.warn(`❌ [ZOD] 未找到狀態 "${status}" 的驗證模式，使用空對象驗證`);
    return z.object({});
  }
  
  console.log(`✅ [ZOD] 找到 "${status}" 狀態的驗證模式`);
  return schema;
};

/**
 * @function createDynamicSchema
 * @description 創建動態驗證模式 (可以在運行時調整)
 * @param {string} status - 狀態類型
 * @param {Object} additionalConstraints - 額外的驗證約束
 * @returns {z.ZodObject} Zod 驗證對象
 */
export const createDynamicSchema = (status, additionalConstraints = {}) => {
  // 獲取基礎驗證模式
  const baseSchema = getValidationSchema(status);
  
  // 如果沒有額外約束，直接返回基礎模式
  if (Object.keys(additionalConstraints).length === 0) {
    return baseSchema;
  }
  
  // 創建新的模式，添加額外的約束
  const extendedSchema = z.object({
    // 保留原始模式的所有欄位
    ...baseSchema.shape,
    
    // 添加新的欄位或覆蓋現有欄位
    ...Object.entries(additionalConstraints).reduce((acc, [field, config]) => {
      acc[field] = config.schema;
      return acc;
    }, {}),
  });
  
  // 添加 refine 約束
  const refines = Object.entries(additionalConstraints)
    .filter(([_, config]) => config.refine)
    .map(([field, config]) => ({
      check: config.refine.check,
      message: config.refine.message || `${field} 驗證失敗`,
      path: config.refine.path || [field],
    }));
  
  // 應用所有 refine 約束
  return refines.reduce((schema, refine) => {
    return schema.refine(refine.check, {
      message: refine.message,
      path: refine.path,
    });
  }, extendedSchema);
};

//! =============== 4. 輔助功能 ===============
//* 用於處理驗證結果和錯誤的實用函數

/**
 * @function validateFormData
 * @description 驗證表單數據，返回結果而非拋出錯誤
 * @param {string} status - 狀態類型
 * @param {Object} data - 要驗證的表單數據
 * @returns {Object} 包含驗證結果、錯誤和處理後數據的對象
 */
export const validateFormData = (status, data) => {
  console.log(`🔍 [ZOD] 開始驗證狀態: ${status}`, data);
  
  const schema = getValidationSchema(status);
  console.log(`🔍 [ZOD] 使用驗證模式: ${status}`, schema);
  
  try {
    // 執行驗證，轉換數據類型
    console.log(`🔍 [ZOD] 驗證前數據:`, data);
    const validatedData = schema.parse(data);
    console.log(`✅ [ZOD] 驗證成功:`, validatedData);
    
    return {
      success: true,
      data: validatedData,
      errors: null,
    };
  } catch (error) {
    console.error(`❌ [ZOD] 驗證失敗:`, error);
    
    if (error.name === "ZodError") {
      // 格式化 Zod 錯誤
      const formattedErrors = {};
      
      error.errors.forEach(err => {
        const path = err.path.join(".");
        formattedErrors[path] = err.message;
        console.error(`❌ [ZOD] 欄位錯誤: ${path} - ${err.message}`);
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
};
