import { z } from "zod";
import { fieldSchemas } from "../schema/processFormValidation";
import { PROCESS_CATEGORY_OPTION } from "../../../config/config";

// 基本 schema 定義
const baseSchema = z.object({
  processCategory: z.string().min(1, "製程類型為必填"),
  processSN: z.string().min(1, "製程名稱為必填"),
  activeTab: z.number().optional(),
  // 可選欄位默認空陣列
  SQMaterialCostSetting: fieldSchemas.materialCostSetting.optional(),
  SQMaterialCosts: z.array(fieldSchemas.materialCost).default([]),
  SQPackagingCosts: z.array(fieldSchemas.packagingCost).default([]),
  SQInPostProcessingCosts: z
    .array(fieldSchemas.internalProcessingCost)
    .default([]),
  SQOutPostProcessingCosts: z
    .array(fieldSchemas.outsourcedProcessingCost)
    .default([]),
  SQInjectionMoldingCosts: z
    .array(fieldSchemas.injectionMoldingCost)
    .default([]),
});

// 製程特定的 schema 定義
const processSchemas = {
  // 廠內出貨檢驗
  [PROCESS_CATEGORY_OPTION[4].category]: baseSchema.extend({
    SQInPostProcessingCosts: z
      .array(fieldSchemas.internalProcessingCost)
      .min(1, "至少需要一筆檢驗費用資料"),
  }),

  // 委外成型製程
  [PROCESS_CATEGORY_OPTION[1].category]: baseSchema.extend({
    SQMaterialCostSetting: fieldSchemas.materialCostSetting,
    SQMaterialCosts: z
      .array(fieldSchemas.materialCost)
      .min(1, "至少需要一筆材料成本資料"),
    SQPackagingCosts: z
      .array(fieldSchemas.packagingCost)
      .min(1, "至少需要一筆包裝材料費資料"),
    SQOutPostProcessingCosts: z
      .array(fieldSchemas.outsourcedProcessingCost)
      .min(1, "至少需要一筆委外加工費資料"),
  }),

  // 廠內成型製程
  [PROCESS_CATEGORY_OPTION[0].category]: baseSchema.extend({
    SQMaterialCostSetting: fieldSchemas.materialCostSetting,
    SQMaterialCosts: z
      .array(fieldSchemas.materialCost)
      .min(1, "至少需要一筆材料成本資料"),
    SQPackagingCosts: z
      .array(fieldSchemas.packagingCost)
      .min(1, "至少需要一筆包裝材料費資料"),
    SQInjectionMoldingCosts: z
      .array(fieldSchemas.injectionMoldingCost)
      .min(1, "至少需要一筆注塑成型成本資料"),
  }),

  // 運輸表單
  TRANSPORTATION: z.object({
    SQFreights: z.array(fieldSchemas.freightCost),
    SQCustomsDuties: z.array(fieldSchemas.customsDutyCost),
  }),
};

// 統一的錯誤格式化
const formatErrors = (error) => ({
  type: "validation",
  message: error.message,
});

// 通用的驗證處理
const validateForm = async (schema, values) => {
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
          [curr.path.join(".")]: formatErrors(curr),
        }),
        {}
      ),
    };
  }
};

// 輸出的驗證函數
export const validateTransportationForm = (values) =>
  validateForm(processSchemas.TRANSPORTATION, values);

export const getProcessResolver = (processCategory) => {
  const schema = processSchemas[processCategory] || baseSchema;
  return (values) => validateForm(schema, values);
};
