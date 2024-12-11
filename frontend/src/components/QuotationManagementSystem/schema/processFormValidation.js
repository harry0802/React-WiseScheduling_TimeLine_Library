//! =============== 1. 設定與常量 ===============
import { z } from "zod";

//! =============== 2. 基礎驗證規則定義 ===============
export const baseSchemas = {
  // 必填數字
  requiredNumber: z
    .number({
      required_error: "此欄位為必填",
      invalid_type_error: "請輸入有效數字",
    })
    .min(0, "不能小於 0"),

  // 百分比
  percentage: z
    .number({
      required_error: "此欄位為必填",
      invalid_type_error: "請輸入有效數字",
    })
    .min(0, "不能小於 0")
    .max(100, "不能大於 100"),

  // 正整數
  positiveInteger: z
    .number({
      required_error: "此欄位為必填",
      invalid_type_error: "請輸入有效數字",
    })
    .int("必須為整數")
    .positive("必須大於 0"),
};

export const nullableNumber = z.coerce.number().nullable().optional();

//! =============== 3. 業務邏輯驗證規則 ===============
export const fieldSchemas = {
  // 材料成本設置驗證
  materialCostSetting: z.object({
    SQProcessId: nullableNumber,
    id: nullableNumber,
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
  }),

  // 材料成本驗證
  materialCost: z.object({
    id: nullableNumber,
    SQProcessId: nullableNumber,
    materialOptionId: nullableNumber,
    materialName: z.union([
      z.string().min(1, "物料名稱為必填"),
      z
        .object({})
        .transform(() => "")
        .pipe(z.string().min(1, "載入中請稍後...")),
    ]),
    materialSN: z.string().min(1, "物料編號為必填"),
    unit: z.string().min(1, "單位為必填"),
    weight: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
  }),

  // 包裝成本驗證
  packagingCost: z
    .object({
      SQProcessId: nullableNumber,
      id: nullableNumber,
      materialName: z.string().min(1, "包材名稱為必填"),
      materialSN: z.string().min(1, "包材編號為必填"),
      packagingType: z.string().optional(),
      unit: z.string().min(1, "單位為必填"),
      quantity: baseSchemas.positiveInteger,
      unitPrice: baseSchemas.requiredNumber,
      amount: nullableNumber,
      capacity: z.number({
        required_error: "容量為必填",
        invalid_type_error: "請輸入有效數字",
      }),
      bagsPerKg: z
        .number({
          invalid_type_error: "請輸入有效數字",
        })
        .nullable()
        .optional(),
    })
    .refine(
      (schema) => {
        if (!schema) return false;

        const unit = schema.unit?.trim().toLowerCase();

        // 公斤或磅：capacity 和 bagsPerKg 必須大於 0
        if (unit === "公斤" || unit === "磅") {
          if (
            schema.capacity <= 0 ||
            !schema.bagsPerKg ||
            schema.bagsPerKg <= 0
          ) {
            return false;
          }
          return true;
        }

        return true;
      },
      {
        message: "當單位為公斤或磅時，容量和每公斤袋數必須大於0",
        path: ["bagsPerKg"],
      }
    ),

  // 注塑成型成本驗證
  injectionMoldingCost: z.object({
    id: nullableNumber,
    SQProcessId: nullableNumber,
    machineId: baseSchemas.requiredNumber,
    machineSN: z.string().optional(),
    workHoursRatio: baseSchemas.percentage,
    defectiveRate: baseSchemas.percentage,
    cycleTime: baseSchemas.requiredNumber,
    packageTime: baseSchemas.requiredNumber,
    moldCavity: baseSchemas.positiveInteger,
    unitPrice: nullableNumber,
    amount: nullableNumber,
    subtotal: nullableNumber,
    electricityCostPerSec: nullableNumber,
    electricityCost: nullableNumber,
  }),

  // 委外加工成本驗證
  outsourcedProcessingCost: z.object({
    unitPrice: baseSchemas.requiredNumber,
    amount: nullableNumber,
  }),

  // 廠內加工成本驗證
  internalProcessingCost: z.object({
    workSecond: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
    amount: nullableNumber,
  }),

  // 保留原有運輸相關驗證
  freightCost: z.object({
    deliveryDistance: baseSchemas.requiredNumber,
    driverWorkHours: baseSchemas.requiredNumber,
    fuelCostPerKM: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: nullableNumber,
  }),

  customsDutyCost: z.object({
    feeType: z.string().min(1, "費用類型為必填"),
    freight: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: nullableNumber,
  }),
};
