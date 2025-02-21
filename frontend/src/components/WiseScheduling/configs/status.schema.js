import { z } from "zod";

export const statusSchema = z.object({
  id: z.string(),
  group: z.string(),
  area: z.string(),
  // 產品試模 機台停機 上模與調機 待機中
  timeLineStatus: z.enum(["產品試模", "機台停機", "上模與調機", "待機中"]),

  status: z.object({
    startTime: z.date(),
    endTime: z.date(),
    // 停機狀態必須選擇原因
    reason: z
      .string({
        required_error: "停機狀態必須選擇原因",
        message: "停機狀態必須選擇原因",
      })
      .optional(),
    product: z.string().optional(),
  }),
  //  以下單純紀錄不需要驗證
  orderInfo: z
    .object({
      scheduledStartTime: z.date().nullable(),
      scheduledEndTime: z.date().nullable(),
      actualStartTime: z.date().nullable(),
      actualEndTime: z.date().nullable(),
      productId: z.string().nullable(),
      productName: z.string().nullable(),
      quantity: z.number().nullable(),
      completedQty: z.number().nullable(),
      process: z.string().nullable(),
      orderStatus: z.string().nullable(),
    })
    .optional(),
});
