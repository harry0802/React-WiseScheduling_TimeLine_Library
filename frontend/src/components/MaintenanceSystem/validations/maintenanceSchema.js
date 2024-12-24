// schemas/maintenanceSchema.js
import { z } from "zod";

const baseFieldSchema = z
  .string({
    required_error: "請選擇一個選項",
  })
  .nullable()
  .refine((value) => value === "OK" || value === "NG" || value === null, {
    message: "請選擇 'OK' 或 'NG'",
  })
  .refine((value) => value !== null, {
    message: "請選擇一個選項",
  });

export const createMaintenanceSchema = (config) => {
  const checkItemsSchema = config.fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: baseFieldSchema,
    }),
    {}
  );

  const personnelSchema =
    config.personnel.type === "select"
      ? z
          .string()
          .min(1, "請選擇" + config.personnel.label)
          .refine(
            (value) => config.personnel.options.includes(value),
            "請選擇有效的選項"
          )
      : z
          .string()
          .min(1, "請輸入" + config.personnel.label)
          .max(50, "名稱過長");

  return z.object({
    checkItems: z.object(checkItemsSchema),
    personnel: personnelSchema,
    date: z.string(),
    remarks: z.string().optional(),
  });
};

export const validateMaintenance = (config, data) => {
  const schema = createMaintenanceSchema(config);
  try {
    return {
      success: true,
      data: schema.parse(data),
    };
  } catch (error) {
    return {
      success: false,
      errors: error.errors,
    };
  }
};
