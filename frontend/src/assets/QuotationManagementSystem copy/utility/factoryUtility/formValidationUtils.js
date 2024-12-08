/**
 * @fileoverview 製程表單驗證邏輯
 * @description
 * 此文件負責處理所有製程相關的表單驗證邏輯，包括:
 * - 不同製程類型的欄位驗證
 * - 動態表單驗證
 * - 錯誤處理與格式化
 */

import { z } from "zod";

import {
  nullableNumber,
  baseSchemas,
  fieldSchemas,
} from "../../schema/factoryFormValidation";
import { PROCESS_CATEGORY_OPTION } from "../../../../config/config";

//! =============== 1. 設定與常量 ===============

//* 基礎必填欄位定義，用於所有製程類型
const baseRequiredFields = {
  id: nullableNumber,
  factoryQuotationId: nullableNumber,
  processOptionId: z.any(),
  processCategory: z.union([
    z
      .number({
        required_error: "製程類型為必填",
        invalid_type_error: "製程類型為必填",
      })
      .min(1, "製程類型為必填"),
    z.string(),
  ]),
  processSN: z.union([
    z.string().min(1, "製程序號為必填"),
    z.number().min(0, "製程序號為必填"),
  ]),
  processName: z.string().optional(),
};

//! =============== 2. 類型與介面 ===============
//* 共用欄位定義
const commonFields = {
  //* 材料成本設置
  materialCostSetting: {
    id: nullableNumber,
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
  },

  //* 基本機台資訊
  //* 成型加工費用
  injectionMoldingCost: {
    id: nullableNumber,
    FQProcessId: nullableNumber,
    machineId: z
      .number({
        required_error: "請選擇機台區域",
        invalid_type_error: "請選擇機台區域",
      })
      .min(1, "請選擇機台區域"),
    machineSN: z.string().min(1, "請選擇機台編號"),
    workHoursRatio: baseSchemas.percentage.min(0.01, "工時比例不能為0"),
    defectiveRate: baseSchemas.percentage.min(0, "不良率不能小於0"),
    cycleTime: baseSchemas.requiredNumber.min(0.01, "週期時間不能為0"),
    packageTime: baseSchemas.requiredNumber.min(0, "包裝時間不能小於0"),
    moldCavity: baseSchemas.positiveInteger.min(1, "模具穴數至少為1"),
    unitPrice: nullableNumber,
    amount: nullableNumber,
    subtotal: nullableNumber,
    electricityCostPerSec: nullableNumber,
    electricityCost: nullableNumber,
  },
};

//! =============== 3. 核心功能 ===============
/**
 * @function createArraySchemaWithStringFallback
 * @description 創建一個可處理空值的陣列 schema
 * @param {z.ZodSchema} schema - 要轉換的基礎 schema
 * @returns {z.ZodSchema} 處理後的 schema
 */
const createArraySchemaWithStringFallback = (schema) =>
  z.preprocess((val) => {
    if (
      !val ||
      val === "" ||
      (Array.isArray(val) &&
        val.every((item) => Object.keys(item).length === 0))
    ) {
      return [];
    }
    return Array.isArray(val) ? val : [];
  }, z.array(schema).optional());

/**
 * @function getProcessFields
 * @description 根據製程類型獲取對應的欄位驗證規則
 * @param {number} processCategory - 製程類型代碼
 * @returns {Object} 對應的欄位驗證規則
 */
const getProcessFields = (processCategory) => {
  const categoryMap = {
    [PROCESS_CATEGORY_OPTION[0].category]: {
      FQMaterialCostSetting: z.object(commonFields.materialCostSetting),
      FQInjectionMoldingCosts: z
        .array(z.object(commonFields.injectionMoldingCost))
        .min(1, "至少需要一筆注射成型費用資料")
        .nonempty("注射成型費用不能為空"),
      FQMaterialCosts: createArraySchemaWithStringFallback(
        fieldSchemas.materialCost
      ),
      FQPackagingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.packagingCost
      ),
    },
    [PROCESS_CATEGORY_OPTION[1].category]: {
      FQMaterialCostSetting: z.object(commonFields.materialCostSetting),
      FQMaterialCosts: createArraySchemaWithStringFallback(
        fieldSchemas.materialCost
      ),
      FQPackagingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.packagingCost
      ),
      FQOutPostProcessingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.outsourcedProcessingCost
      ),
    },
    [PROCESS_CATEGORY_OPTION[2].category]: {
      FQMaterialCostSetting: z.object(commonFields.materialCostSetting),
      FQMaterialCosts: createArraySchemaWithStringFallback(
        fieldSchemas.materialCost
      ),
      FQPackagingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.packagingCost
      ),
      FQInPostProcessingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.internalProcessingCost
      ),
    },
    [PROCESS_CATEGORY_OPTION[3].category]: {
      FQMaterialCostSetting: z.object(commonFields.materialCostSetting),
      FQMaterialCosts: createArraySchemaWithStringFallback(
        fieldSchemas.materialCost
      ),
      FQPackagingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.packagingCost
      ),
      FQOutPostProcessingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.outsourcedProcessingCost
      ),
    },
    [PROCESS_CATEGORY_OPTION[4].category]: {
      FQInPostProcessingCosts: createArraySchemaWithStringFallback(
        fieldSchemas.internalProcessingCost
      ),
    },
  };
  console.log(processCategory);
  return categoryMap[processCategory] || {};
};

/**
 * @function createDynamicSchema
 * @description 動態生成驗證 schema
 * @param {number} processCategory - 製程類型
 * @returns {z.ZodSchema} 完整的驗證 schema
 */
const createDynamicSchema = (processCategory) => {
  return z.object({
    ...baseRequiredFields,
    ...getProcessFields(processCategory),
  });
};

//! =============== 4. 工具函數 ===============
/**
 * @function validateWithSchema
 * @description 通用的驗證處理函數
 * @param {z.ZodSchema} schema - 驗證 schema
 * @param {Object} values - 要驗證的值
 * @returns {Promise<{values: Object, errors: Object}>} 驗證結果
 */
const validateWithSchema = async (schema, values) => {
  try {
    const validData = await schema.parseAsync(values);
    return { values: validData, errors: {} };
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      throw error;
    }

    // 改进错误处理，确保数组验证错误也能被捕获
    const errors = error.errors.reduce((acc, curr) => {
      // 处理数组验证错误
      if (curr.path.length === 1 && Array.isArray(values[curr.path[0]])) {
        return {
          ...acc,
          [curr.path[0]]: {
            type: "validation",
            message: curr.message,
            root: true, // 标记为根级错误
          },
        };
      }

      // 处理其他错误
      return {
        ...acc,
        [curr.path.join(".")]: {
          type: "validation",
          message: curr.message,
        },
      };
    }, {});

    return {
      values: {},
      errors,
    };
  }
};

/**
 * @function getProcessResolver
 * @description 獲取製程驗證解析器
 * @param {number} processCategory - 製程類型
 * @returns {Function} 驗證解析器函數
 *
 * @example
 * const resolver = getProcessResolver(1);
 * const result = await resolver(formValues);
 */
export const getProcessResolver = (processCategory) => {
  if (!processCategory) {
    return async () => ({
      values: {},
      errors: {
        processCategory: {
          type: "validation",
          message: "製程類型為必填",
        },
      },
    });
  }
  return async (values) => {
    try {
      const schema = createDynamicSchema(processCategory);
      const result = await validateWithSchema(schema, values);
      return result;
    } catch (error) {
      console.error("Validation error:", error);
      return {
        values: {},
        errors: {
          processCategory: {
            type: "validation",
            message: "驗證過程發生錯誤",
          },
        },
      };
    }
  };
};

/**
 * @function formatValidationErrors
 * @description 格式化驗證錯誤
 * @param {z.ZodError} error - Zod 錯誤對象
 * @returns {Object} 格式化後的錯誤對象
 */
export const formatValidationErrors = (error) =>
  error.errors.reduce(
    (acc, { path, message }) => ({
      ...acc,
      [path.join(".")]: { type: "validation", message },
    }),
    {}
  );

// 保留運費關稅相關邏輯，不進行重構
export const validateTransportationForm = async (values) => {
  try {
    await transportationSchema.parseAsync(values);
    return { values, errors: {} };
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      throw error;
    }
    return {
      values: {},
      errors: formatValidationErrors(error),
    };
  }
};

const transportationSchema = z.object({
  FQFreights: z.array(fieldSchemas.freightCost),
  FQCustomsDuties: z.array(fieldSchemas.customsDutyCost),
});
