/**
 * @fileoverview 製程表單驗證邏輯
 * @description
 * 此文件負責處理所有製程相關的表單驗證邏輯，包括:
 * - 不同製程類型的欄位驗證
 * - 動態表單驗證
 * - 錯誤處理與格式化
 */

import { z } from "zod";
import { baseSchemas, fieldSchemas } from "../schema/processFormValidation";
import { PROCESS_CATEGORY_OPTION } from "../../../config/config";

//! =============== 1. 設定與常量 ===============
//* 基礎必填欄位定義，用於所有製程類型
const baseRequiredFields = {
  processCategory: z
    .number({
      required_error: "製程類型為必填",
      invalid_type_error: "製程類型為必填",
    })
    .min(1, "製程類型為必填"),
  processSN: z
    .string({ required_error: "製程名稱為必填" })
    .min(1, "製程名稱為必填")
    .or(z.number({ required_error: "製程名稱為必填" })),
  activeTab: z.number().optional(),
};

//! =============== 2. 類型與介面 ===============
//* 共用欄位定義
const commonFields = {
  //* 基本機台資訊
  machineInfo: {
    machineId: z
      .number({
        required_error: "請選擇機台區域",
        invalid_type_error: "請選擇機台區域",
      })
      .min(1, "請選擇機台區域"),
    machineSN: z
      .string({ required_error: "請選擇機台編號" })
      .min(1, "請選擇機台編號"),
  },

  //* 材料成本設置
  materialCostSetting: {
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
  },

  //* 成型加工費用
  injectionMoldingCost: {
    machineId: z
      .number({
        required_error: "請選擇機台區域",
        invalid_type_error: "請選擇機台區域",
      })
      .min(1, "請選擇機台區域"),
    machineSN: z.string().min(1, "請選擇機台編號"),
    workHoursRatio: baseSchemas.percentage,
    defectiveRate: baseSchemas.percentage,
    cycleTime: baseSchemas.requiredNumber,
    packageTime: baseSchemas.requiredNumber,
    moldCavity: baseSchemas.positiveInteger,
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
    if (!val || val === "") return [];
    return Array.isArray(val) ? val : [];
  }, z.array(schema).optional());

/**
 * @function getProcessFields
 * @description 根據製程類型獲取對應的欄位驗證規則
 * @param {number} processCategory - 製程類型代碼
 * @returns {Object} 對應的欄位驗證規則
 */
const getProcessFields = (processCategory) => {
  //* ========= 製程類型對應邏輯 =========
  // 1. 每個 case 對應一種製程類型
  // 2. 根據不同類型組合不同的驗證規則
  // 3. 使用擴展運算符合併共用欄位
  switch (processCategory) {
    case PROCESS_CATEGORY_OPTION[0].category: // 廠內成型製程
      return {
        SQMaterialCostSetting: z.object(commonFields.materialCostSetting),
        SQInjectionMoldingCosts: createArraySchemaWithStringFallback(
          z.object(commonFields.injectionMoldingCost)
        ),
        SQMaterialCosts: createArraySchemaWithStringFallback(
          fieldSchemas.materialCost
        ),
        SQPackagingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.packagingCost
        ),
      };

    case PROCESS_CATEGORY_OPTION[1].category: // 委外成型製程
      return {
        SQMaterialCostSetting: z.object(commonFields.materialCostSetting),
        SQMaterialCosts: createArraySchemaWithStringFallback(
          fieldSchemas.materialCost
        ),
        SQPackagingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.packagingCost
        ),
        SQOutPostProcessingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.outsourcedProcessingCost
        ),
      };

    case PROCESS_CATEGORY_OPTION[2].category: // 廠內後製程
      return {
        SQMaterialCostSetting: z.object(commonFields.materialCostSetting),
        SQMaterialCosts: createArraySchemaWithStringFallback(
          fieldSchemas.materialCost
        ),
        SQPackagingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.packagingCost
        ),
        SQInPostProcessingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.internalProcessingCost
        ),
      };

    case PROCESS_CATEGORY_OPTION[3].category: // 委外後製程
      return {
        SQMaterialCostSetting: z.object(commonFields.materialCostSetting),
        SQMaterialCosts: createArraySchemaWithStringFallback(
          fieldSchemas.materialCost
        ),
        SQPackagingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.packagingCost
        ),
        SQOutPostProcessingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.outsourcedProcessingCost
        ),
      };

    case PROCESS_CATEGORY_OPTION[4].category: // 廠內出貨檢驗
      return {
        SQInPostProcessingCosts: createArraySchemaWithStringFallback(
          fieldSchemas.internalProcessingCost
        ),
      };

    default:
      return commonFields;
  }
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
    return {
      values: {},
      errors: error.errors.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.path.join(".")]: {
            type: "validation",
            message: curr.message,
          },
        }),
        {}
      ),
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
    return () => ({
      values: {},
      errors: {
        type: "validation",
        message: "製程類型為必填",
      },
    });
  }

  let processCategoryOption;
  if (typeof processCategory === "number")
    processCategoryOption =
      PROCESS_CATEGORY_OPTION[processCategory - 1].category;
  else processCategoryOption = processCategory;

  return async (values) => {
    try {
      const schema = createDynamicSchema(processCategoryOption);
      return validateWithSchema(schema, values);
    } catch (error) {
      console.error("Validation error:", error);
      return {
        values: {},
        errors: {
          processCategoryOption: {
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
  SQFreights: z.array(fieldSchemas.freightCost),
  SQCustomsDuties: z.array(fieldSchemas.customsDutyCost),
});
