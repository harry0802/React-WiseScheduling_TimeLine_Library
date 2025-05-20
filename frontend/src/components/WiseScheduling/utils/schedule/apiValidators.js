/**
 * @file apiValidators.js
 * @description API請求層的驗證函數，確保數據符合業務規則
 * @version 2.0.0
 */

import {
  StateTransitionError,
  ValidationError,
  ApiError,
} from "./errorHandler";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import dayjs from "dayjs";
import { z } from "zod";

//! =============== 1. API 基礎驗證 ===============
//* 定義 API 請求必填字段和資料格式驗證

/**
 * @function validateApiStatusTransition
 * @description 驗證要提交給API的狀態轉換是否合法
 * @param {Object} internalItem - 內部格式的項目數據
 * @param {Object} originalItem - 原始項目數據（如果有）
 * @throws {StateTransitionError} 狀態轉換不合法時拋出錯誤
 */
export const validateApiStatusTransition = (
  internalItem,
  originalItem = null
) => {
  // 如果沒有原始項目，則視為新建項目
  if (!originalItem) {
    return; // 新建項目不需要驗證狀態轉換
  }

  const initialStatus = originalItem.timeLineStatus;
  const targetStatus = internalItem.timeLineStatus;

  // 如果沒有狀態變化，則直接通過
  if (initialStatus === targetStatus) {
    return;
  }

  // 如果原始狀態是製令單，不允許切換
  if (initialStatus === MACHINE_STATUS.ORDER_CREATED) {
    throw new StateTransitionError("製令單狀態不能被切換", {
      initialStatus,
      targetStatus,
      itemId: internalItem.id,
    });
  }

  // 如果不是待機狀態切換到其他狀態，那麼只能是非待機狀態切換到待機
  if (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus !== MACHINE_STATUS.IDLE
  ) {
    throw new StateTransitionError("從非待機狀態只能切換回待機狀態", {
      initialStatus,
      targetStatus,
      itemId: internalItem.id,
    });
  }

  // 從非待機狀態轉到待機狀態，確保有結束時間
  if (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus === MACHINE_STATUS.IDLE &&
    (!internalItem.end || !internalItem.status?.endTime)
  ) {
    throw new StateTransitionError(
      "從非待機狀態切換回待機狀態時，必須設置結束時間",
      {
        initialStatus,
        targetStatus,
        itemId: internalItem.id,
        endTime: internalItem.end || internalItem.status?.endTime,
      }
    );
  }
};

/**
 * @function validateApiItemCompleteness1
 * @description 驗證API項目的數據完整性
 * @param {Object} apiItem - 要發送到API的項目數據
 * @param {boolean} isTest - 是否為測試模式，測試模式下跳過某些驗證
 * @throws {ValidationError} 數據不完整時拋出錯誤
 */
export const validateApiItemCompleteness = (apiItem, isTest = false) => {
  // 如果是測試模式，跳過驗證
  if (isTest) {
    return;
  }

  // 定義必填字段及其可能的備用欄位
  const requiredFields = {
    group: {
      backups: ["machineSN"],
      defaultValue: "A-1",
      defaultValueWarning: "缺少機台組，使用預設值: A-1",
    },
    start: {
      backups: [
        "machineStatusPlanStartTime",
        "machineStatusActualStartTime",
        "planOnMachineDate",
      ],
      defaultValue: dayjs().format(),
      defaultValueWarning: "缺少開始時間，使用當前時間作為預設值",
    },
  };

  // 檢查並修復必填字段
  Object.entries(requiredFields).forEach(([field, config]) => {
    if (!apiItem[field]) {
      // 嘗試從備用欄位獲取值
      const backupValue = config.backups.find((backup) => apiItem[backup]);

      if (backupValue) {
        apiItem[field] = apiItem[backupValue];
      } else {
        // 使用預設值
        apiItem[field] = config.defaultValue;
        console.warn(config.defaultValueWarning);
      }
    }
  });

  // 狀態特定驗證規則
  const statusValidationRules = {
    [MACHINE_STATUS.TESTING]: {
      requiredFields: ["machineStatusProduct"],
      errorMessages: {
        machineStatusProduct: "產品試模狀態必須指定產品",
      },
    },
    [MACHINE_STATUS.STOPPED]: {
      requiredFields: ["machineStatusReason"],
      errorMessages: {
        machineStatusReason: "機台停機狀態必須指定原因",
      },
    },
    [MACHINE_STATUS.ORDER_CREATED]: {
      requiredFields: ["productName"],
      errorMessages: {
        productName: "製令單必須指定產品名稱",
      },
    },
  };

  // 根據狀態進行特定驗證
  const statusRule = statusValidationRules[apiItem.timeLineStatus];
  if (statusRule) {
    statusRule.requiredFields.forEach((field) => {
      if (!apiItem[field]) {
        throw new ValidationError(statusRule.errorMessages[field], {
          field,
          status: apiItem.timeLineStatus,
        });
      }
    });
  } else if (!Object.values(MACHINE_STATUS).includes(apiItem.timeLineStatus)) {
    // 未知狀態
    throw new ValidationError(`未知的狀態類型: ${apiItem.timeLineStatus}`, {
      providedStatus: apiItem.timeLineStatus,
      validStatuses: Object.values(MACHINE_STATUS),
    });
  }
};

//! =============== 2. API 請求模式驗證 ===============
//* 使用 Zod 定義 API 請求數據的模式

// 基礎時間欄位驗證模式
const timeFieldsSchema = z.object({
  start: z
    .string()
    .min(1, "開始時間為必填")
    .refine((v) => dayjs(v).isValid(), "開始時間格式無效"),

  // 結束時間可選，但如果有值必須是有效日期時間
  machineStatusPlanEndTime: z
    .string()
    .optional()
    .refine((v) => !v || dayjs(v).isValid(), "計劃結束時間格式無效"),

  machineStatusActualEndTime: z
    .string()
    .optional()
    .refine((v) => !v || dayjs(v).isValid(), "實際結束時間格式無效"),
});

// 機台狀態共用的基礎欄位
const machineStatusBaseSchema = timeFieldsSchema.extend({
  machineSN: z.string().min(1, "機台編號為必填"),
  productionArea: z.string().min(1, "生產區域為必填"),
  timeLineStatus: z.string().min(1, "狀態類型為必填"),
});

// 待機狀態模式
const idleStatusSchema = machineStatusBaseSchema;

// 上模與調機狀態模式
const setupStatusSchema = machineStatusBaseSchema.extend({
  // 可以添加特定於該狀態的字段
});

// 產品試模狀態模式
const testingStatusSchema = machineStatusBaseSchema.extend({
  machineStatusProduct: z.string().min(1, "產品試模狀態必須指定產品"),
});

// 機台停機狀態模式
const stoppedStatusSchema = machineStatusBaseSchema.extend({
  machineStatusReason: z.string().min(1, "機台停機狀態必須指定原因"),
});

// 製令單狀態模式
const orderStatusSchema = timeFieldsSchema.extend({
  machineSN: z.string().min(1, "機台編號為必填"),
  productionArea: z.string().min(1, "生產區域為必填"),
  timeLineStatus: z.literal(MACHINE_STATUS.ORDER_CREATED),
  productName: z.string().min(1, "產品名稱為必填"),
  productSN: z.string().optional(),
  processName: z.string().optional(),
  workOrderQuantity: z.string().optional(),
  productionQuantity: z.string().optional(),
  planOnMachineDate: z
    .string()
    .min(1, "計劃上機時間為必填")
    .refine((v) => dayjs(v).isValid(), "計劃上機時間格式無效"),
});

// 合併所有模式，使用 discriminated union
const apiItemSchema = z.discriminatedUnion("timeLineStatus", [
  orderStatusSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.ORDER_CREATED),
  }),
  idleStatusSchema.extend({ timeLineStatus: z.literal(MACHINE_STATUS.IDLE) }),
  setupStatusSchema.extend({ timeLineStatus: z.literal(MACHINE_STATUS.SETUP) }),
  testingStatusSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.TESTING),
  }),
  stoppedStatusSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.STOPPED),
  }),
]);

/**
 * @function validateApiSchema
 * @description 使用 Zod 模式驗證 API 請求數據
 * @param {Object} apiItem - 要驗證的 API 數據
 * @param {boolean} isTest - 是否為測試模式
 * @throws {ValidationError} 驗證失敗時拋出
 */
export const validateApiSchema = (apiItem, isTest = false) => {
  if (isTest) return;

  try {
    // 基於狀態類型選擇適當的模式進行驗證
    apiItemSchema.parse(apiItem);
  } catch (error) {
    if (error.name === "ZodError") {
      // 將 Zod 錯誤轉換為應用錯誤
      const validationDetails = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        validationDetails[path] = err.message;
      });

      throw new ValidationError("API 數據格式驗證失敗", {
        zodErrors: error.errors,
        formattedErrors: validationDetails,
      });
    }

    throw error; // 重新拋出非 Zod 錯誤
  }
};

/**
 * @function validateApiRequest
 * @description 統一的 API 請求驗證函數
 * @param {Object} apiItem - API 請求數據
 * @param {Object} originalItem - 原始項目數據（如果有）
 * @param {boolean} isTest - 是否為測試模式
 */
export const validateApiRequest = (
  apiItem,
  originalItem = null,
  isTest = false
) => {
  // 跳過測試模式驗證
  if (isTest) return;

  try {
    // 1. 基礎數據完整性驗證
    validateApiItemCompleteness(apiItem, isTest);

    // 2. 模式驗證
    validateApiSchema(apiItem, isTest);

    // 3. 狀態轉換驗證（僅對更新操作）
    if (originalItem) {
      validateApiStatusTransition(apiItem, originalItem);
    }
  } catch (error) {
    // 確保所有錯誤都被轉換為應用錯誤類型
    if (error instanceof Error && !(error instanceof ApiError)) {
      throw new ApiError(error.message, {
        originalError: error,
        apiItem: {
          id:
            apiItem.id ||
            apiItem.machineStatusId ||
            apiItem.productionScheduleId,
          status: apiItem.timeLineStatus,
          // 截斷長數據但保留可讀性
          request:
            JSON.stringify(apiItem, null, 2).substring(0, 300) +
            (JSON.stringify(apiItem).length > 300 ? "..." : ""),
        },
      });
    }
    throw error;
  }
};
