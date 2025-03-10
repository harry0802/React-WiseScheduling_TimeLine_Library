import * as z from "zod";
import dayjs from "dayjs";
import {
  MACHINE_STATUS,
  STATUS_NAME_MAP,
  getStatusDisplay,
} from "../../../configs/constants/fieldNames";
// 在開頭添加調試信息
// 新增的直接輸出裡面的狀態常量值

/**
 * @file machineSchemas.jsx
 * @description 機台狀態相關的資料格式和驗證規則
 * @version 2.0.0
 */

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置,便於統一管理

//! =============== 2. 狀態常量定義 ===============
//* 主要狀態和對應值

/**
 * @constant MACHINE_STATUS_ALIASES
 * @description 狀態別名對應表（兼容舊代碼）
 * @type {Object}
 */
export const MACHINE_STATUS_ALIASES = {
  SETUP: MACHINE_STATUS.TUNING, // 上模與調機 (別名)
  STOPPED: MACHINE_STATUS.OFFLINE, // 機台停機 (別名)
};

// 註：主要的 MACHINE_STATUS 和 STATUS_NAME_MAP 已從 fieldNames.js 導入

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
});

/**
 * @constant idleSchema
 * @description 待機狀態的表單驗證結構
 * @type {Object}
 */
export const idleSchema = baseSchema.extend({
  // 添加必填欄位驗證
  planStartDate: dateValidation.refine((val) => !!val, {
    message: "請輸入預計開始時間",
  }),
  planEndDate: dateValidation.refine((val) => !!val, {
    message: "請輸入預計結束時間",
  }),
  actualStartDate: dateValidation.refine((val) => !!val, {
    message: "請輸入實際開始時間",
  }),
});

/**
 * @constant tuningSchema
 * @description 上模與調機狀態的表單驗證結構
 *
 * @type {Object}
 */
export const tuningSchema = baseSchema.extend({
  // 添加必填欄位驗證
  planStartDate: dateValidation.refine((val) => !!val, {
    message: "請輸入預計開始時間",
  }),
  planEndDate: dateValidation.refine((val) => !!val, {
    message: "請輸入預計結束時間",
  }),
  actualStartDate: dateValidation.refine((val) => !!val, {
    message: "請輸入實際開始時間",
  }),
});

/**
 * @constant testingSchema
 * @description 產品試模狀態的表單驗證結構
 * @type {Object}
 */
export const testingSchema = baseSchema.extend({
  // TestingForm.jsx 中使用的欄位
  product: z.string().min(1, { message: "請輸入試模產品名稱" }),
});

/**
 * @constant offlineSchema
 * @description 機台停機狀態的表單驗證結構
 * @type {Object}
 */
export const offlineSchema = baseSchema.extend({
  // StoppedForm.jsx 中使用的欄位
  reason: z.string().min(1, { message: "請選擇停機原因" }),
});

//! =============== 5. 匯出輔助函數 ===============
//* 匯出所有狀態對應的驗證結構

// 註：getStatusDisplay 已從 fieldNames.js 導入
// 添加調試日誌包裝函數
const getStatusDisplayWithLog = (statusCode) => {
  console.log("🚀 ~ getStatusDisplay ~ statusCode:", statusCode);
  return getStatusDisplay(statusCode);
};

/**
 * @function getStandardizedStatus
 * @description 標準化狀態代碼（處理別名）
 * @param {string} status - 狀態代碼
 * @returns {string} - 標準化後的狀態代碼
 */
export const getStandardizedStatus = (status) => {
  // 處理別名
  if (status === MACHINE_STATUS_ALIASES.SETUP) return MACHINE_STATUS.TUNING;
  if (status === MACHINE_STATUS_ALIASES.STOPPED) return MACHINE_STATUS.OFFLINE;
  return status;
};

// 為了向後兼容，再次導出從 fieldNames.js 導入的常量和函數
export { MACHINE_STATUS, STATUS_NAME_MAP };

export default {
  MACHINE_STATUS,
  STATUS_NAME_MAP,
  MACHINE_STATUS_ALIASES,
  baseSchema,
  idleSchema,
  tuningSchema,
  testingSchema,
  offlineSchema,
  getStatusDisplay: getStatusDisplayWithLog,
  getStandardizedStatus,
};
