//! =============== 1. 設定與常量 ===============
import { z } from "zod";

//! =============== 2. 基礎驗證規則定義 ===============
/**
 * @description 基礎驗證規則集合
 * @namespace baseSchemas
 */
export const baseSchemas = {
  /**
   * @description 必填數字欄位驗證
   * @requires 數值 >= 0
   */
  requiredNumber: z
    .number({
      required_error: "此欄位為必填",
      invalid_type_error: "請輸入有效數字",
    })
    .min(0, "不能小於 0"),

  /**
   * @description 必填字串欄位驗證
   * @requires 長度 >= 1
   */
  requiredString: z
    .string({
      required_error: "此欄位為必填",
    })
    .min(1, "此欄位為必填"),

  /**
   * @description 百分比欄位驗證
   * @requires 0 <= 數值 <= 100
   */
  percentage: z
    .number({
      required_error: "此欄位為必填",
    })
    .min(0, "不能小於 0")
    .max(100, "不能大於 100"),

  /**
   * @description 正整數欄位驗證
   * @requires 數值為整數且 > 0
   */
  positiveInteger: z
    .number({
      required_error: "此欄位為必填",
    })
    .int("必須為整數")
    .positive("必須大於 0"),
};

//! =============== 3. 業務邏輯驗證規則 ===============
/**
 * @description 各模組的詳細驗證規則
 * @namespace fieldSchemas
 */
export const fieldSchemas = {
  /**
   * @description 材料成本設置驗證
   * @requires 預估瑕疵率、材料波動率為百分比
   * @requires 萃取成本、加工成本為非負數
   */
  materialCostSetting: z.object({
    estimatedDefectRate: baseSchemas.percentage,
    estimatedMaterialFluctuation: baseSchemas.percentage,
    extractionCost: baseSchemas.requiredNumber,
    processingCost: baseSchemas.requiredNumber,
  }),

  /**
   * @description 材料成本驗證
   * @requires 所有欄位皆為必填
   * @requires 重量與單價為非負數
   */
  materialCost: z.object({
    materialSN: baseSchemas.requiredString,
    materialName: baseSchemas.requiredString,
    unit: baseSchemas.requiredString,
    weight: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
  }),

  /**
   * @description 包裝成本驗證
   * @requires 數量、容量、單價為非負數
   * @requires 每公斤袋數可為空值
   */
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

  /**
   * @description 注塑成型成本驗證
   * @requires 工時比例與瑕疵率為百分比
   * @requires 模穴數為正整數
   */
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

  /**
   * @description 運輸成本驗證
   * @requires 預估出貨量為正整數
   * @requires 其他數值欄位為非負數
   */
  freightCost: z.object({
    deliveryDistance: baseSchemas.requiredNumber,
    driverWorkHours: baseSchemas.requiredNumber,
    fuelCostPerKM: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: baseSchemas.requiredNumber,
  }),

  /**
   * @description 關稅成本驗證
   * @requires 預估出貨量為正整數
   */
  customsDutyCost: z.object({
    feeType: baseSchemas.requiredString,
    freight: baseSchemas.requiredNumber,
    estimatedShipment: baseSchemas.positiveInteger,
    amount: baseSchemas.requiredNumber,
  }),

  /**
   * @description 委外加工成本驗證
   * @requires 單價與金額為非負數
   */
  outsourcedProcessingCost: z.object({
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
  }),

  /**
   * @description 廠內加工成本驗證
   * @requires 工時(秒)、單價與金額為非負數
   */
  internalProcessingCost: z.object({
    workSecond: baseSchemas.requiredNumber,
    unitPrice: baseSchemas.requiredNumber,
    amount: baseSchemas.requiredNumber,
  }),
};
