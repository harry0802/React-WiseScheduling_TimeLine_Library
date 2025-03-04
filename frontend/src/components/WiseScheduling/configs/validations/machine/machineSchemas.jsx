import { z } from "zod";
import { MACHINE_STATUS } from "../schedule/constants";

// 共用驗證規則
const commonSchema = {
  machineId: z.string().min(1, "請選擇機台"),
  planStartDate: z.date().nullable().optional(),
  planEndDate: z.date().nullable().optional(),
  actualStartDate: z.date().nullable().optional(),
  actualEndDate: z.date().nullable().optional(),
  status: z.nativeEnum(MACHINE_STATUS),
};

// 待機中狀態的驗證規則
export const idleSchema = z.object({
  ...commonSchema,
  startTime: z.date(),
  endTime: z.date().nullable().optional(),
  note: z.string().optional(),
});

// 上模與調機狀態的驗證規則
export const setupSchema = z.object({
  ...commonSchema,
  product: z.string().min(1, "請輸入產品名稱"),
});

// 產品試模狀態的驗證規則
export const testingSchema = z.object({
  ...commonSchema,
  product: z.string().min(1, "請輸入產品名稱"),
});

// 機台停機狀態的驗證規則
export const stoppedSchema = z.object({
  ...commonSchema,
  reason: z.string().min(1, "請選擇停機原因"),
});
