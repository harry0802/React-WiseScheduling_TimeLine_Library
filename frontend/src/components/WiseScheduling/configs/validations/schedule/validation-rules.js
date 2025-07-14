/**
 * @file validation-rules.js
 * @description API 驗證規則配置 - 外部化所有驗證規則
 * @version 1.0.0
 */

import { MACHINE_STATUS } from "./constants";
import dayjs from "dayjs";

//! =============== 1. 預設值配置 ===============
//* 定義各欄位的預設值和備用欄位映射

export const DEFAULT_VALUE_CONFIG = {
  group: {
    backups: ["machineSN"],
    defaultValue: "A-1",
    warningMessage: "缺少機台組，使用預設值: A-1",
  },
  start: {
    backups: [
      "machineStatusPlanStartTime",
      "machineStatusActualStartTime",
      "planOnMachineDate",
    ],
    defaultValue: () => dayjs().format(),
    warningMessage: "缺少開始時間，使用當前時間作為預設值",
  },
  // 新增四個時間欄位的驗證配置
  planStartTime: {
    backups: ["machineStatusPlanStartTime", "start"],
    defaultValue: () => dayjs().format(),
    warningMessage: "缺少預計開始時間，使用當前時間作為預設值",
  },
  planEndTime: {
    backups: ["machineStatusPlanEndTime", "end"],
    defaultValue: () => dayjs().add(1, "hour").format(),
    warningMessage: "缺少預計結束時間，使用當前時間+1小時作為預設值",
  },
  actualStartTime: {
    backups: ["machineStatusActualStartTime"],
    defaultValue: "",
    warningMessage: "實際開始時間為選填",
  },
  actualEndTime: {
    backups: ["machineStatusActualEndTime"],
    defaultValue: "",
    warningMessage: "實際結束時間為選填",
  },
};

//! =============== 2. 狀態特定驗證規則 ===============
//* 每種狀態對應的必填欄位和錯誤訊息

export const STATUS_VALIDATION_RULES = {
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

//! =============== 3. 狀態轉換規則 ===============
//* 定義哪些狀態轉換是被禁止的

export const TRANSITION_RULES = {
  // 製令單狀態不能被切換
  [MACHINE_STATUS.ORDER_CREATED]: {
    canSwitchFrom: false,
    errorMessage: "製令單狀態不能被切換",
  },

  // 非待機狀態只能切換回待機
  nonIdleTransitions: {
    onlyToIdle: true,
    errorMessage: "從非待機狀態只能切換回待機狀態",
  },

  // 切換到待機狀態時的特殊要求
  toIdleRequirements: {
    requireEndTime: true,
    errorMessage: "從非待機狀態切換回待機狀態時，必須設置結束時間",
  },
};

//! =============== 4. 欄位名稱映射 ===============
//* 用於錯誤訊息的友好顯示

export const FIELD_NAME_MAP = {
  start: "開始時間",
  end: "結束時間",
  // 新增四個時間欄位的友好名稱
  planStartTime: "預計開始時間",
  planEndTime: "預計結束時間",
  actualStartTime: "實際開始時間",
  actualEndTime: "實際結束時間",
  group: "機台編號",
  machineSN: "機台編號",
  productionArea: "生產區域",
  timeLineStatus: "狀態類型",
  machineStatusProduct: "產品",
  machineStatusReason: "停機原因",
  productName: "產品名稱",
  planOnMachineDate: "計劃上機時間",
};

//! =============== 5. 跨欄位驗證規則 ===============
//* 時間欄位之間的邏輯驗證規則

/**
 * 驗證預計結束時間必須晚於預計開始時間
 * @param {string} planStartTime - 預計開始時間
 * @param {string} planEndTime - 預計結束時間
 * @returns {boolean|string} 驗證結果
 */
export const validatePlanTimeOrder = (planStartTime, planEndTime) => {
  if (!planStartTime || !planEndTime) return true; // 如果有空值則跳過驗證

  const startTime = dayjs(planStartTime);
  const endTime = dayjs(planEndTime);

  if (!startTime.isValid() || !endTime.isValid()) {
    return "時間格式無效";
  }

  if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
    return "預計結束時間必須晚於預計開始時間";
  }

  return true;
};

/**
 * 驗證實際結束時間必須晚於實際開始時間
 * @param {string} actualStartTime - 實際開始時間
 * @param {string} actualEndTime - 實際結束時間
 * @returns {boolean|string} 驗證結果
 */
export const validateActualTimeOrder = (actualStartTime, actualEndTime) => {
  if (!actualStartTime || !actualEndTime) return true; // 如果有空值則跳過驗證

  const startTime = dayjs(actualStartTime);
  const endTime = dayjs(actualEndTime);

  if (!startTime.isValid() || !endTime.isValid()) {
    return "時間格式無效";
  }

  if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
    return "實際結束時間必須晚於實際開始時間";
  }

  return true;
};

/**
 * 驗證實際時間的合理性（可選驗證：實際時間不能早於預計時間）
 * @param {string} planTime - 預計時間
 * @param {string} actualTime - 實際時間
 * @param {string} timeType - 時間類型（"start" 或 "end"）
 * @returns {boolean|string} 驗證結果
 */
export const validateActualTimeReasonableness = (
  planTime,
  actualTime,
  timeType = "start"
) => {
  if (!planTime || !actualTime) return true; // 如果有空值則跳過驗證

  const planned = dayjs(planTime);
  const actual = dayjs(actualTime);

  if (!planned.isValid() || !actual.isValid()) {
    return "時間格式無效";
  }

  // 實際時間顯著早於預計時間時給予警告（但不阻止提交）
  const hoursDifference = planned.diff(actual, "hours");
  if (hoursDifference > 2) {
    const timeTypeName = timeType === "start" ? "開始" : "結束";
    return `實際${timeTypeName}時間比預計${timeTypeName}時間早了${hoursDifference}小時，請確認是否正確`;
  }

  return true;
};

/**
 * 跨欄位驗證規則集合
 */
export const CROSS_FIELD_VALIDATION_RULES = {
  // 預計時間順序驗證
  planTimeOrder: {
    validator: validatePlanTimeOrder,
    fields: ["planStartTime", "planEndTime"],
    message: "預計結束時間必須晚於預計開始時間",
  },
  // 實際時間順序驗證
  actualTimeOrder: {
    validator: validateActualTimeOrder,
    fields: ["actualStartTime", "actualEndTime"],
    message: "實際結束時間必須晚於實際開始時間",
  },
  // 實際時間合理性驗證（警告級別）
  actualStartTimeReasonableness: {
    validator: (formValues) =>
      validateActualTimeReasonableness(
        formValues.planStartTime,
        formValues.actualStartTime,
        "start"
      ),
    fields: ["planStartTime", "actualStartTime"],
    level: "warning", // 警告級別，不阻止提交
  },
  actualEndTimeReasonableness: {
    validator: (formValues) =>
      validateActualTimeReasonableness(
        formValues.planEndTime,
        formValues.actualEndTime,
        "end"
      ),
    fields: ["planEndTime", "actualEndTime"],
    level: "warning", // 警告級別，不阻止提交
  },
};
