/**
 * @file apiValidators.js
 * @description API請求層的驗證函數 - 重構版本，遵循單一職責原則
 * @version 3.0.0
 */

import {
  createStateTransitionError,
  createValidationError,
  createApiError,
} from "./errorHandler";
import { MACHINE_STATUS } from "../../configs/validations/schedule/constants";
import {
  DEFAULT_VALUE_CONFIG,
  STATUS_VALIDATION_RULES,
  TRANSITION_RULES,
} from "../../configs/validations/schedule/validation-rules";
import dayjs from "dayjs";
import { z } from "zod";

//! =============== 2. 數據預處理函數 ===============
//* 處理預設值填充和數據修復

/**
 * @function fillDefaultValues
 * @description 填充 API 項目的預設值
 * @param {Object} apiItem - API 項目數據（會被修改）
 */
function fillDefaultValues(apiItem) {
  // 防護檢查：確保 apiItem 存在
  if (!apiItem || typeof apiItem !== "object") {
    console.warn("fillDefaultValues: apiItem 為空或非對象類型");
    return;
  }

  Object.entries(DEFAULT_VALUE_CONFIG).forEach(([field, config]) => {
    if (!apiItem[field]) {
      // 嘗試從備用欄位獲取值
      const backupValue = config.backups?.find((backup) => apiItem[backup]);

      if (backupValue) {
        apiItem[field] = apiItem[backupValue];
      } else {
        // 使用預設值（可能是函數）
        const defaultValue =
          typeof config.defaultValue === "function"
            ? config.defaultValue()
            : config.defaultValue;
        apiItem[field] = defaultValue;
        console.warn(config.warningMessage);
      }
    }
  });
}

/**
 * @function validateRequiredFields
 * @description 驗證 API 項目的必填欄位
 * @param {Object} apiItem - API 項目數據
 */
function validateRequiredFields(apiItem) {
  // 防護檢查：確保 apiItem 存在
  if (!apiItem || typeof apiItem !== "object") {
    throw createValidationError("API 項目數據為空或格式錯誤", {
      apiItem: typeof apiItem,
    });
  }

  const basicRequiredFields = ["group", "start"];

  basicRequiredFields.forEach((field) => {
    if (!apiItem[field]) {
      throw createValidationError(`${field} 為必填欄位`, {
        field,
        value: apiItem[field],
      });
    }
  });
}

/**
 * @function validateStatusSpecificRules
 * @description 驗證狀態特定的必填欄位
 * @param {Object} apiItem - API 項目數據
 */
function validateStatusSpecificRules(apiItem) {
  // 防護檢查：確保 apiItem 存在
  if (!apiItem || typeof apiItem !== "object") {
    throw createValidationError("API 項目數據為空或格式錯誤", {
      apiItem: typeof apiItem,
    });
  }

  const statusRule = STATUS_VALIDATION_RULES[apiItem.timeLineStatus];

  if (!statusRule) {
    // 檢查是否為有效狀態
    if (!Object.values(MACHINE_STATUS).includes(apiItem.timeLineStatus)) {
      throw createValidationError(`未知的狀態類型: ${apiItem.timeLineStatus}`, {
        providedStatus: apiItem.timeLineStatus,
        validStatuses: Object.values(MACHINE_STATUS),
      });
    }
    return;
  }

  statusRule.requiredFields.forEach((field) => {
    if (!apiItem[field]) {
      throw createValidationError(statusRule.errorMessages[field], {
        field,
        status: apiItem.timeLineStatus,
      });
    }
  });
}

//! =============== 3. 狀態轉換驗證 ===============
//* 統一的狀態轉換邏輯，避免重複

/**
 * @function validateStatusTransition
 * @description 驗證狀態轉換是否合法
 * @param {string} initialStatus - 初始狀態
 * @param {string} targetStatus - 目標狀態
 * @param {Object} item - 項目數據
 */
function validateStatusTransition(initialStatus, targetStatus, item) {
  // 防護檢查：確保必要參數存在
  if (!initialStatus || !targetStatus) {
    throw createStateTransitionError("狀態轉換驗證缺少必要參數", {
      initialStatus,
      targetStatus,
      itemId: item?.id,
    });
  }

  // 沒有狀態變化時直接通過
  if (initialStatus === targetStatus) {
    return;
  }

  // 檢查製令單狀態轉換限制
  if (initialStatus === MACHINE_STATUS.ORDER_CREATED) {
    throw createStateTransitionError(
      TRANSITION_RULES[MACHINE_STATUS.ORDER_CREATED].errorMessage,
      { initialStatus, targetStatus, itemId: item?.id }
    );
  }

  // 檢查非待機狀態轉換限制
  if (shouldCheckNonIdleTransition(initialStatus, targetStatus)) {
    throw createStateTransitionError(
      TRANSITION_RULES.nonIdleTransitions.errorMessage,
      { initialStatus, targetStatus, itemId: item?.id }
    );
  }

  // 檢查切換到待機狀態的特殊要求
  if (shouldValidateIdleTransition(initialStatus, targetStatus, item)) {
    throw createStateTransitionError(
      TRANSITION_RULES.toIdleRequirements.errorMessage,
      {
        initialStatus,
        targetStatus,
        itemId: item?.id,
        endTime: item?.end || item?.status?.endTime,
      }
    );
  }
}

/**
 * @function shouldCheckNonIdleTransition
 * @description 判斷是否需要檢查非待機狀態轉換
 * @param {string} initialStatus - 初始狀態
 * @param {string} targetStatus - 目標狀態
 * @returns {boolean}
 */
function shouldCheckNonIdleTransition(initialStatus, targetStatus) {
  return (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus !== MACHINE_STATUS.IDLE
  );
}

/**
 * @function shouldValidateIdleTransition
 * @description 判斷是否需要驗證切換到待機狀態的要求
 * @param {string} initialStatus - 初始狀態
 * @param {string} targetStatus - 目標狀態
 * @param {Object} item - 項目數據
 * @returns {boolean}
 */
function shouldValidateIdleTransition(initialStatus, targetStatus, item) {
  return (
    initialStatus !== MACHINE_STATUS.IDLE &&
    targetStatus === MACHINE_STATUS.IDLE &&
    !item.end &&
    !item.status?.endTime
  );
}

//! =============== 4. 時間重疊驗證 ===============
//* 檢查除了製令單外的所有狀態都不允許時間重疊

/**
 * @function validateTimeOverlap
 * @description 驗證時間重疊 - 除了製令單外都不允許重疊
 * @param {Object} apiItem - API 項目數據
 * @param {Array|Object} existingItems - 現有項目或群組數據
 */
function validateTimeOverlap(apiItem, existingItems = null) {
  // 製令單允許時間重疊
  if (apiItem.timeLineStatus === MACHINE_STATUS.ORDER_CREATED) {
    return;
  }

  // 防護檢查
  if (!apiItem || !apiItem.start || !apiItem.group) {
    console.warn("validateTimeOverlap: 缺少必要的時間或群組資訊");
    return;
  }

  try {
    const itemStart = dayjs(apiItem.start);
    const itemEnd = dayjs(apiItem.end);

    // 如果沒有結束時間，視為現在時間 + 2小時
    const effectiveEnd = itemEnd.isValid() ? itemEnd : dayjs().add(2, "hour");

    let items = [];

    // 嘗試從全局數據獲取
    if (window.timeline && window.app && window.app.timelineData) {
      items = window.app.timelineData.get({
        filter: function (item) {
          return (
            item.id !== apiItem.id &&
            item.group === apiItem.group &&
            item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
          );
        },
      });
    } else if (existingItems) {
      // 從傳入的參數獲取
      if (Array.isArray(existingItems)) {
        // 如果是群組數據
        const currentGroup = existingItems.find((g) => g.id === apiItem.group);
        if (currentGroup && currentGroup.items) {
          items = currentGroup.items.filter(
            (item) =>
              item.id !== apiItem.id &&
              item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
          );
        }
      } else if (existingItems.filter) {
        // 如果是項目數組
        items = existingItems.filter(
          (item) =>
            item.id !== apiItem.id &&
            item.group === apiItem.group &&
            item.timeLineStatus !== MACHINE_STATUS.ORDER_CREATED
        );
      }
    }

    // 檢查時間重疊
    const hasOverlap = items.some((existingItem) => {
      const existingStart = dayjs(existingItem.start);
      const existingEnd = dayjs(existingItem.end);
      const existingEffectiveEnd = existingEnd.isValid()
        ? existingEnd
        : existingStart.add(2, "hour");

      return (
        (itemStart.isBefore(existingEffectiveEnd) &&
          effectiveEnd.isAfter(existingStart)) ||
        itemStart.isSame(existingStart) ||
        effectiveEnd.isSame(existingEffectiveEnd)
      );
    });

    if (hasOverlap) {
      throw createValidationError(
        "時間重疊：除了「製令單」外的其他狀態都不允許時間重疊",
        {
          itemId: apiItem.id,
          group: apiItem.group,
          start: apiItem.start,
          end: apiItem.end,
          status: apiItem.timeLineStatus,
        }
      );
    }
  } catch (error) {
    // 如果是驗證錯誤，直接拋出
    if (error.type === "VALIDATION_ERROR") {
      throw error;
    }

    // 其他錯誤記錄日誌但不阻止流程
    /* eslint-disable */ console.error(
      ...oo_tx(
        `4056104611_302_4_302_45_11`,
        "檢查時間重疊時發生錯誤，繼續執行:",
        error
      )
    );
  }
}

//! =============== 5. Zod 模式驗證 ===============
//* 使用 Zod 進行模式驗證，保持原有邏輯但簡化結構

const timeFieldsSchema = z.object({
  start: z
    .string()
    .min(1, "開始時間為必填")
    .refine((v) => dayjs(v).isValid(), "開始時間格式無效"),
  machineStatusPlanEndTime: z
    .string()
    .optional()
    .refine((v) => !v || dayjs(v).isValid(), "計劃結束時間格式無效"),
  machineStatusActualEndTime: z
    .string()
    .optional()
    .refine((v) => !v || dayjs(v).isValid(), "實際結束時間格式無效"),
});

const machineStatusBaseSchema = timeFieldsSchema.extend({
  machineSN: z.string().min(1, "機台編號為必填"),
  productionArea: z.string().min(1, "生產區域為必填"),
  timeLineStatus: z.string().min(1, "狀態類型為必填"),
  machineId: z.string().optional(), // 添加 machineId
});

const apiItemSchema = z.discriminatedUnion("timeLineStatus", [
  // 製令單模式
  timeFieldsSchema.extend({
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
  }),

  // 其他狀態模式
  machineStatusBaseSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.IDLE),
  }),
  machineStatusBaseSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.SETUP),
  }),
  machineStatusBaseSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.TESTING),
    machineStatusProduct: z.string().min(1, "產品試模狀態必須指定產品"),
  }),
  machineStatusBaseSchema.extend({
    timeLineStatus: z.literal(MACHINE_STATUS.STOPPED),
    machineStatusReason: z.string().min(1, "機台停機狀態必須指定原因"),
  }),
]);

/**
 * @function validateSchema
 * @description 使用 Zod 模式驗證 API 數據
 * @param {Object} apiItem - 要驗證的數據
 */
function validateSchema(apiItem) {
  // 防護檢查：確保 apiItem 存在
  if (!apiItem || typeof apiItem !== "object") {
    throw createValidationError("API 項目數據為空或格式錯誤", {
      apiItem: typeof apiItem,
    });
  }

  try {
    apiItemSchema.parse(apiItem);
  } catch (error) {
    if (error.name === "ZodError") {
      const validationDetails = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        validationDetails[path] = err.message;
      });

      throw createValidationError("API 數據格式驗證失敗", {
        zodErrors: error.errors,
        formattedErrors: validationDetails,
      });
    }
    throw error;
  }
}

//! =============== 5. 主要驗證函數 ===============
//* 統一的驗證入口，遵循 "Push Ifs Up" 原則

/**
 * @function validateApiItemCompleteness
 * @description 驗證 API 項目完整性的統一入口
 * @param {Object} apiItem - API 項目數據
 * @param {boolean} isTest - 是否為測試模式
 */
function validateApiItemCompleteness(apiItem, isTest = false) {
  if (isTest) return;

  fillDefaultValues(apiItem);
  validateRequiredFields(apiItem);
  validateStatusSpecificRules(apiItem);
}

/**
 * @function validateApiStatusTransition
 * @description 驗證 API 狀態轉換的統一入口
 * @param {Object} internalItem - 內部格式項目
 * @param {Object} originalItem - 原始項目
 * @param {boolean} isTest - 是否為測試模式
 */
function validateApiStatusTransition(
  internalItem,
  originalItem,
  isTest = false
) {
  if (isTest) return;
  if (!originalItem) return; // 新建項目不驗證轉換

  const initialStatus = originalItem.timeLineStatus;
  const targetStatus = internalItem.timeLineStatus;

  validateStatusTransition(initialStatus, targetStatus, internalItem);
}

/**
 * @function validateApiSchema
 * @description 驗證 API 模式的統一入口
 * @param {Object} apiItem - API 數據
 * @param {boolean} isTest - 是否為測試模式
 */
function validateApiSchema(apiItem, isTest = false) {
  if (isTest) return;

  validateSchema(apiItem);
}

/**
 * @function validateApiRequest
 * @description 統一的 API 請求驗證函數 - 頂層控制流
 * @param {Object} apiItem - API 請求數據
 * @param {Object} originalItem - 原始項目數據
 * @param {boolean} isTest - 是否為測試模式
 * @param {Array|Object} existingItems - 現有項目數據（用於時間重疊檢查）
 */
function validateApiRequest(
  apiItem,
  originalItem = null,
  isTest = false,
  existingItems = null
) {
  if (isTest) return;

  try {
    // 1. 數據完整性驗證和修復
    validateApiItemCompleteness(apiItem, isTest);

    // 2. 模式驗證
    validateApiSchema(apiItem, isTest);

    // 3. 時間重疊驗證（重要！）
    validateTimeOverlap(apiItem, existingItems);

    // 4. 狀態轉換驗證（僅對更新操作）
    if (originalItem) {
      validateApiStatusTransition(apiItem, originalItem, isTest);
    }
  } catch (error) {
    // 統一錯誤處理
    if (!error.type) {
      throw createApiError(error.message, {
        originalError: error,
        apiItem: {
          id:
            apiItem?.id ||
            apiItem?.machineStatusId ||
            apiItem?.productionScheduleId,
          status: apiItem?.timeLineStatus,
          request:
            JSON.stringify(apiItem, null, 2).substring(0, 300) +
            (JSON.stringify(apiItem).length > 300 ? "..." : ""),
        },
      });
    }
    throw error;
  }
}

//! =============== 6. 導出函數 ===============

// 主要驗證函數
export { validateApiRequest };

// 單獨的驗證函數（用於單元測試或特殊用途）
export {
  validateApiItemCompleteness,
  validateApiStatusTransition,
  validateApiSchema,
  validateStatusTransition, // 給 statusHelpers.js 使用
};

// 輔助函數
export {
  fillDefaultValues,
  validateRequiredFields,
  validateStatusSpecificRules,
  validateTimeOverlap,
};
