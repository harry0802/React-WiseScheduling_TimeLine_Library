import { z } from "zod";

export const statusSchema = z.object({
  id: z.string(),
  group: z.string(),
  area: z.string(),
  timeLineStatus: z.enum([
    "製立單",
    "待機中",
    "上模與調機",
    "產品試模",
    "機台停機",
  ]),

  status: z.object({
    startTime: z.date(),
    endTime: z.date(),
    reason: z.string().optional(),
    product: z.string().optional(),
  }),

  orderInfo: z.object({
    scheduledStartTime: z.date(),
    scheduledEndTime: z.date(),
    actualStartTime: z.date(),
    actualEndTime: z.date(),
    productId: z.string(),
    productName: z.string(),
    quantity: z.number(),
    completedQty: z.number(),
    process: z.string(),
    orderStatus: z.string(),
  }),
});
