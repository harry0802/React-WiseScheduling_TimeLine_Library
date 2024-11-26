import { z } from "zod";

// 基礎驗證規則
export const baseSchemas = {
  requiredNumber: z
    .number({
      required_error: "此欄位為必填",
      invalid_type_error: "請輸入有效數字",
    })
    .min(0, "不能小於 0"),

  requiredString: z
    .string({
      required_error: "此欄位為必填",
    })
    .min(1, "此欄位為必填"),

  percentage: z
    .number({
      required_error: "此欄位為必填",
    })
    .min(0, "不能小於 0")
    .max(100, "不能大於 100"),

  positiveInteger: z.number().int("必須為整數").positive("必須大於 0"),
};

// 對應各個字段組的 schema
export const fieldSchemas = {
  // 材料成本設置
  materialCostSetting: z.object({
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
  }),

  // 材料成本
  materialCost: z.object({
    materialSN: baseSchemas.requiredString,
    materialName: baseSchemas.requiredString,
    unit: baseSchemas.requiredString,
    weight: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
  }),

  // 包裝成本
  packagingCost: z.object({
    packagingType: baseSchemas.requiredString,
    materialSN: baseSchemas.requiredString,
    materialName: baseSchemas.requiredString,
    unit: baseSchemas.requiredString,
    quantity: baseSchemas.requiredNumber,
    capacity: baseSchemas.requiredNumber,
    bagsPerKg: baseSchemas.requiredNumber.nullable(),
    unitPrice: baseSchemas.requiredNumber,
  }),

  // 注塑成型成本
  injectionMoldingCost: z.object({
    workHoursRatio: baseSchemas.percentage,
    defectiveRate: baseSchemas.percentage,
    cycleTime: baseSchemas.requiredNumber,
    packageTime: baseSchemas.requiredNumber,
    moldCavity: baseSchemas.positiveInteger,
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
    subtotal: baseSchemas.requiredNumber,
    electricityCost: baseSchemas.requiredNumber,
  }),

  // 運輸成本
  freightCost: z.object({
    deliveryDistance: baseSchemas.requiredNumber,
    driverWorkHours: baseSchemas.requiredNumber,
    fuelCostPerKM: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: baseSchemas.requiredNumber,
  }),

  // 關稅成本
  customsDutyCost: z.object({
    feeType: baseSchemas.requiredString,
    freight: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: baseSchemas.requiredNumber,
  }),

  // 委外加工成本
  outsourcedProcessingCost: z.object({
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
  }),

  // 廠內加工成本
  internalProcessingCost: z.object({
    workSecond: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
  }),
};
