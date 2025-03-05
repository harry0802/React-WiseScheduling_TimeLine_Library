/**
 * @file machineSchemas.jsx
 * @description 機台狀態相關的資料格式和驗證規則
 * @version 2.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

import * as z from "zod";
import dayjs from "dayjs";

//! =============== 2. 狀態常量定義 ===============
//* 主要狀態和對應值

/**
 * @constant MACHINE_STATUS
 * @description 機台狀態常量對應表
 * @type {Object}
 */
export const MACHINE_STATUS = {
  RUN: "RUN", // 生產中
  IDLE: "IDLE", // 待機中
  TUNING: "TUNING", // 上模與調機
  SETUP: "SETUP", // 上模與調機 (別名)
  TESTING: "TESTING", // 產品試模
  OFFLINE: "OFFLINE", // 機台停機
  STOPPED: "STOPPED", // 機台停機 (別名)

  // 中文對應
  生產中: "RUN",
  待機中: "IDLE",
  上模與調機: "TUNING",
  產品試模: "TESTING",
  機台停機: "OFFLINE",
};

/**
 * @constant STATUS_NAME_MAP
 * @description 狀態代碼與中文名稱映射
 * @type {Object}
 */
export const STATUS_NAME_MAP = {
  [MACHINE_STATUS.RUN]: "生產中",
  [MACHINE_STATUS.IDLE]: "待機中",
  [MACHINE_STATUS.TUNING]: "上模與調機",
  [MACHINE_STATUS.SETUP]: "上模與調機",
  [MACHINE_STATUS.TESTING]: "產品試模",
  [MACHINE_STATUS.OFFLINE]: "機台停機",
  [MACHINE_STATUS.STOPPED]: "機台停機",
};

//! =============== 3. 基礎格式驗證 ===============
//* 通用的格式和欄位驗證規則

/**
 * @constant dateValidation
 * @description 日期格式驗證規則
 * @type {Object}
 */
const dateValidation = z
  .string()
  .refine((val) => !val || dayjs(val).isValid(), {
    message: "請輸入有效的日期格式",
  });

//! =============== 4. 不同狀態的表單驗證 ===============
//* 根據不同機台狀態定義對應的表單驗證結構

/**
 * @constant baseSchema
 * @description 基礎機台狀態欄位結構 (所有狀態共用)
 * @type {Object}
 */
export const baseSchema = z.object({
  machineId: z
    .number()
    .or(z.string().transform((val) => parseInt(val, 10)))
    .optional(),
  planStartDate: dateValidation,
  planEndDate: dateValidation,
  actualStartDate: dateValidation,
  actualEndDate: dateValidation.optional(),
  status: z.string(),
  statusDisplay: z.string().optional(),
  note: z.string().optional(),
});

/**
 * @constant idleSchema
 * @description 待機狀態的表單驗證結構
 * @type {Object}
 */
export const idleSchema = baseSchema.extend({
  // IdleForm.jsx 中使用的欄位
  reason: z.string().optional(),
});

/**
 * @constant tuningSchema
 * @description 上模與調機狀態的表單驗證結構
 * @type {Object}
 */
export const tuningSchema = baseSchema.extend({
  // SetupForm.jsx 中使用的欄位
  setupDetails: z.string().optional(),
  note: z.string().optional(),
});

/**
 * @constant testingSchema
 * @description 產品試模狀態的表單驗證結構
 * @type {Object}
 */
export const testingSchema = baseSchema.extend({
  // TestingForm.jsx 中使用的欄位
  product: z.string().nonempty({ message: "請輸入試模產品名稱" }),
  note: z.string().optional(),
});

/**
 * @constant offlineSchema
 * @description 機台停機狀態的表單驗證結構
 * @type {Object}
 */
export const offlineSchema = baseSchema.extend({
  // StoppedForm.jsx 中使用的欄位
  reason: z.string().nonempty({ message: "請選擇停機原因" }),
  note: z.string().optional(),
});

//! =============== 5. 匯出輔助函數 ===============
//* 匯出所有狀態對應的驗證結構

/**
 * @function getStatusDisplay
 * @description 根據狀態代碼取得中文顯示名稱
 * @param {string} statusCode - 狀態代碼
 * @returns {string} - 中文狀態名稱
 */
export const getStatusDisplay = (statusCode) => {
  return STATUS_NAME_MAP[statusCode] || statusCode;
};

/**
 * @function getStandardizedStatus
 * @description 標準化狀態代碼（處理別名）
 * @param {string} status - 狀態代碼
 * @returns {string} - 標準化後的狀態代碼
 */
export const getStandardizedStatus = (status) => {
  // 處理別名
  if (status === MACHINE_STATUS.SETUP) return MACHINE_STATUS.TUNING;
  if (status === MACHINE_STATUS.STOPPED) return MACHINE_STATUS.OFFLINE;
  return status;
};

export default {
  MACHINE_STATUS,
  STATUS_NAME_MAP,
  baseSchema,
  idleSchema,
  tuningSchema,
  testingSchema,
  offlineSchema,
  getStatusDisplay,
  getStandardizedStatus,
};
