// validationSchema.js
import { z } from "zod";
import dayjs from "dayjs";
import { MACHINE_STATUS } from "./constants";

// 🧠 基礎時間驗證
const timeSchema = z.object({
  startTime: z
    .string()
    .min(1, "開始時間為必填")
    .refine((val) => dayjs(val).isAfter(dayjs()), {
      message: "開始時間不能早於現在",
    }),
});

// ✨ 各狀態的驗證 Schema
export const statusSchemas = {
  // 製立單驗證規則
  [MACHINE_STATUS.ORDER_CREATED]: z.object({
    group: z.string().min(1, "機台編號為必填"),
    start: z.string().min(1, "預計開始時間為必填"),
    end: z
      .string()
      .min(1, "預計結束時間為必填")
      .refine(
        (end, ctx) => {
          return dayjs(end).isAfter(dayjs(ctx.data.start));
        },
        {
          message: "結束時間必須晚於開始時間",
        }
      ),
  }),

  // 待機中驗證規則
  [MACHINE_STATUS.IDLE]: timeSchema.extend({
    endTime: z
      .string()
      .optional()
      .refine((val) => !val || dayjs(val).isAfter(dayjs()), {
        message: "結束時間必須晚於現在",
      }),
  }),

  // 上模與調機驗證規則
  [MACHINE_STATUS.SETUP]: timeSchema.extend({
    setupInfo: z.string().optional(),
  }),

  // 產品試模驗證規則
  [MACHINE_STATUS.TESTING]: timeSchema.extend({
    product: z.string().optional(),
  }),

  // 機台停機驗證規則
  [MACHINE_STATUS.STOPPED]: timeSchema.extend({
    reason: z
      .string()
      .min(2, "停機原因至少需要2個字")
      .max(50, "停機原因不能超過50個字"),
  }),
};

// 💡 獲取對應狀態的驗證 schema
export const getValidationSchema = (status) => {
  return statusSchemas[status] || z.object({});
};
