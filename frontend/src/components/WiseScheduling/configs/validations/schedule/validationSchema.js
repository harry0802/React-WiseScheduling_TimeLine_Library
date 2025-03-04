// validationSchema.ts
import { z } from "zod";
import dayjs from "dayjs";
import { MACHINE_STATUS } from "./constants";

// 🧠 基礎時間驗證
const timeValidation = {
  start: z
    .string()
    .min(1, "開始時間為必填")
    .transform((val) => dayjs(val).toDate())
    .refine((date) => dayjs(date).isValid(), "時間格式錯誤"),
  end: z
    .string()
    .min(1, "結束時間為必填")
    .transform((val) => dayjs(val).toDate())
    .refine((date) => dayjs(date).isValid(), "時間格式錯誤"),
};

// 💡 製令單驗證
const orderSchema = z
  .object({
    group: z.string().min(1, "機台編號為必填"),
    area: z.string().min(1, "區域為必填"),
    // 系統記錄值，不需嚴格驗證
    actualStartTime: z.optional(z.date()),
    actualEndTime: z.optional(z.date()),
    productId: z.optional(z.string()),
    productName: z.optional(z.string()),
    quantity: z.optional(z.number()),
    completedQty: z.optional(z.number()),
    process: z.optional(z.string()),
    orderStatus: z.optional(z.string()),
    ...timeValidation,
  })
  .refine(
    (data) => {
      console.log("🚀 ~ data:", data);
      const now = dayjs();
      const end = dayjs(data.end);
      return end.isAfter(now);
    },
    { message: "結束時間不能早於現在", path: ["end"] }
  )
  .refine(
    (data) => {
      const start = dayjs(data.start);
      const end = dayjs(data.end);
      return end.isAfter(start);
    },
    { message: "結束時間必須晚於開始時間", path: ["end"] }
  )
  .refine(
    (data) => {
      const start = dayjs(data.start);
      const end = dayjs(data.end);
      return end.diff(start, "hour") >= 4;
    },
    { message: "排程時間至少需要 4 小時", path: ["end"] }
  );

// 其他狀態驗證
export const statusSchemas = {
  [MACHINE_STATUS.ORDER_CREATED]: orderSchema,

  [MACHINE_STATUS.IDLE]: z.object({
    start: z.string().min(1, "開始時間為必填"),
    end: z.string().optional(),
    area: z.string().min(1, "區域為必填"),
    group: z.string().min(1, "機台編號為必填"),
  }),

  [MACHINE_STATUS.SETUP]: z.object({
    start: z.string().min(1, "開始時間為必填"),
    end: z.string().optional(),
    area: z.string().min(1, "區域為必填"),
    group: z.string().min(1, "機台編號為必填"),
    setupInfo: z.string().optional(),
    className: z.string().optional(),
    reason: z.string().optional(),
  }),

  [MACHINE_STATUS.TESTING]: z.object({
    product: z.string().optional(),
    start: z.string().min(1, "開始時間為必填"),
    end: z.string().optional(),
    area: z.string().min(1, "區域為必填"),
    group: z.string().min(1, "機台編號為必填"),
    className: z.string().optional(),
  }),

  [MACHINE_STATUS.STOPPED]: z.object({
    product: z.string().optional(),
    start: z.string().min(1, "開始時間為必填"),
    end: z.string().optional(),
    area: z.string().min(1, "區域為必填"),
    group: z.string().min(1, "機台編號為必填"),
    className: z.string().optional(),
    reason: z
      .string()
      .min(2, "停機原因至少需要2個字")
      .max(50, "停機原因不能超過50個字"),
  }),
};

export const getValidationSchema = (status) =>
  statusSchemas[status] || z.object({});
