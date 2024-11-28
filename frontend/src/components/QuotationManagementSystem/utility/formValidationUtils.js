import { z } from "zod";
import { baseSchemas, fieldSchemas } from "../schema/processFormValidation";
import { PROCESS_CATEGORY_OPTION } from "../../../config/config";

// 基礎必填欄位
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

// 根據製程類型獲取額外的欄位
const getProcessFields = (processCategory) => {
  const commonFields = {
    machineId: z
      .number({
        required_error: "請選擇機台區域",
        invalid_type_error: "請選擇機台區域",
      })
      .min(1, "請選擇機台區域"),
    machineSN: z
      .string({ required_error: "請選擇機台編號" })
      .min(1, "請選擇機台編號"),
    // 通用數值欄位
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
    workHoursRatio: baseSchemas.percentage,
    defectiveRate: baseSchemas.percentage,
    cycleTime: baseSchemas.requiredNumber,
    packageTime: baseSchemas.requiredNumber,
    moldCavity: baseSchemas.positiveInteger,
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
    subtotal: baseSchemas.requiredNumber,
    electricityCost: baseSchemas.requiredNumber,
  };

  // 根據不同製程類型返回不同的欄位組合
  switch (processCategory) {
    case PROCESS_CATEGORY_OPTION[4].category: // 廠內出貨檢驗
      return {
        SQInPostProcessingCosts: z
          .array(fieldSchemas.internalProcessingCost)
          .min(1, "至少需要一筆檢驗費用資料"),
      };

    case PROCESS_CATEGORY_OPTION[0].category: // 廠內成型製程
      return {
        ...commonFields,
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
      };

    case PROCESS_CATEGORY_OPTION[1].category: // 委外成型製程
      return {
        ...commonFields,
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
      };

    case PROCESS_CATEGORY_OPTION[2].category: // 廠內後製程
      return {
        ...commonFields,
        SQMaterialCostSetting: fieldSchemas.materialCostSetting,
        SQMaterialCosts: z
          .array(fieldSchemas.materialCost)
          .min(1, "至少需要一筆材料成本資料"),
        SQPackagingCosts: z
          .array(fieldSchemas.packagingCost)
          .min(1, "至少需要一筆包裝材料費資料"),
        SQInPostProcessingCosts: z
          .array(fieldSchemas.internalProcessingCost)
          .min(1, "至少需要一筆廠內加工費資料"),
      };

    case PROCESS_CATEGORY_OPTION[3].category: // 委外後製程
      return {
        ...commonFields,
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
      };

    default:
      return commonFields;
  }
};

// 動態生成 schema
const createDynamicSchema = (processCategory) => {
  return z.object({
    ...baseRequiredFields,
    ...getProcessFields(processCategory),
  });
};

// 通用的驗證處理
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

// 運輸表單驗證
const transportationSchema = z.object({
  SQFreightCosts: z
    .array(fieldSchemas.freightCost)
    .min(1, "至少需要一筆運輸費用資料"),
  SQCustomsDutyCosts: z
    .array(fieldSchemas.customsDutyCost)
    .min(1, "至少需要一筆貨運關稅資料"),
});

export const validateTransportationForm = (values) =>
  validateWithSchema(transportationSchema, values);

export const getProcessResolver = (processCategory) => {
  console.log(
    "🔥🔥🔥🔥 ~ getProcessResolver ~ PROCESS_CATEGORY_OPTION[processCategory]:",
    PROCESS_CATEGORY_OPTION[processCategory - 1]
  );
  const processCategoryOption =
    PROCESS_CATEGORY_OPTION[processCategory - 1].category;

  return async (values) => {
    try {
      const schema = createDynamicSchema(processCategoryOption);
      console.log("🔥🔥🔥🔥 ~ return ~ schema:", schema);
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
