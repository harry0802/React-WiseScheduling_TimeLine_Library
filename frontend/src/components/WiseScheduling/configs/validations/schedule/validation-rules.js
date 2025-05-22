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
  group: "機台編號",
  machineSN: "機台編號",
  productionArea: "生產區域",
  timeLineStatus: "狀態類型",
  machineStatusProduct: "產品",
  machineStatusReason: "停機原因",
  productName: "產品名稱",
  planOnMachineDate: "計劃上機時間",
};
