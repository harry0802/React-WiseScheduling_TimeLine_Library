import { z } from "zod";
import {
  STATE_OLD_TESTING,
  STATE_OLD_OFFLINE,
  STATE_OLD_TUNING,
  STATE_OLD_IDLE,
  CODE_TESTING,
  CODE_OFFLINE,
  CODE_TUNING,
  CODE_IDLE,
  CODE_RUNNING,
} from "../utils/statusConverter";

export const statusSchema = z.object({
  // 基礎信息
  id: z.string(),
  group: z.string(),
  area: z.string(),

  // 狀態相關（英文內部使用與中文顯示）
  status: z.enum([
    CODE_TESTING,
    CODE_OFFLINE,
    CODE_TUNING,
    CODE_IDLE,
    CODE_RUNNING,
  ]),
  statusDisplay: z.string().optional(),

  // 時間相關
  startTime: z.date(),
  endTime: z.date(),

  // 計劃與實際日期
  planStartDate: z.date().optional(),
  planEndDate: z.date().optional(),
  actualStartDate: z.date().optional(),
  actualEndDate: z.date().optional(),

  // 停機狀態必須選擇原因
  reason: z
    .string({
      required_error: "停機狀態必須選擇原因",
      message: "停機狀態必須選擇原因",
    })
    .optional(),

  // 產品試模狀態必須輸入產品名稱
  product: z
    .string({
      required_error: "請輸入產品名稱",
      message: "產品名稱不能為空",
    })
    .min(1, { message: "產品名稱不能為空" })
    .optional(),
});

/*
{
  // 基本信息
  id: "某個製令單號",
  group: "某個機台群組",
  area: "某個區域",
  timeLineStatus: "產品試模" | "機台停機" | "上模與調機" | "待機中",
  
  // 狀態相關
  status: "TESTING" | "OFFLINE" | "TUNING" | "IDLE" | "RUN", // 英文狀態（內部使用）
  statusDisplay: "產品試模" | "機台停機" | "上模與調機" | "待機中", // 中文狀態（顯示用）
  
  // 時間相關
  startTime: Date對象,
  endTime: Date對象,
  reason: "機台故障" | "人員不足" | "等待物料" | 其他原因, // 只有在停機狀態才需要
  product: "產品信息",
  
  // 計劃與實際日期
  planStartDate: Date對象或null,
  planEndDate: Date對象或null,
  actualStartDate: Date對象或null,
  actualEndDate: Date對象或null,
  

}
*/
