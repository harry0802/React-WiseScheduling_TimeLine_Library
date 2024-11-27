//! =============== 1. 設定與常量 ===============
//* 引入必要的依賴與常量定義
import { z } from "zod";
import { fieldSchemas } from "../schema/processFormValidation";

//! =============== 2. 類型與介面 ===============
/**
 * @typedef {Object} ValidationResult
 * @property {Object} values - 驗證成功時的值
 * @property {Object} errors - 驗證錯誤訊息
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} type - 錯誤類型
 * @property {string} message - 錯誤訊息
 */

//! =============== 3. 核心功能 ===============
/**
 * @function validateTransportationForm
 * @description 驗證運輸表單數據的完整性和正確性
 * @param {Object} values - 要驗證的表單數據
 * @returns {Promise<ValidationResult>} 驗證結果
 *
 * @example
 *  基本使用方式
 * const result = await validateTransportationForm({
 *   SQFreights: [{...}],
 *   SQCustomsDuties: [{...}]
 * });
 *
 * @notes
 * - 使用 Zod 進行數據驗證
 * - 自動處理錯誤格式化
 *
 * @commonErrors
 * - 數據格式不符合 schema 定義
 * - 必填欄位缺失
 */
export const validateTransportationForm = async (values) => {
  try {
    await transportationSchema.parseAsync(values);
    return { values, errors: {} };
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      //! 重要：非預期的錯誤需要向上拋出
      throw error;
    }
    return {
      values: {},
      errors: formatValidationErrors(error),
    };
  }
};

//! =============== 4. 工具函數 ===============
/**
 * @function formatValidationErrors
 * @description 將 Zod 錯誤對象轉換為易於使用的格式
 * @param {z.ZodError} error - Zod 驗證錯誤對象
 * @returns {Object<string, ValidationError>} 格式化後的錯誤訊息
 *
 * @example
 * const errors = formatValidationErrors(zodError);
 *  返回格式: { "field.path": { type: "validation", message: "錯誤訊息" } }
 */
export const formatValidationErrors = (error) =>
  error.errors.reduce(
    (acc, { path, message }) => ({
      ...acc,
      [path.join(".")]: { type: "validation", message },
    }),
    {}
  );

//* ========= Schema 定義 =========
/**
 * @description 運輸表單驗證 schema
 * @property {Array} SQFreights - 運費項目陣列
 * @property {Array} SQCustomsDuties - 關稅項目陣列
 */
const transportationSchema = z.object({
  SQFreights: z.array(fieldSchemas.freightCost),
  SQCustomsDuties: z.array(fieldSchemas.customsDutyCost),
});
