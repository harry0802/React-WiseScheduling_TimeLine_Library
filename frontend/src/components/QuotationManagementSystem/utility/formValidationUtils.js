import { z } from "zod";
import { fieldSchemas } from "../schema/processFormValidation";

export const validateTransportationForm = (values) => {
  const schema = z
    .object({
      SQFreights: z.array(fieldSchemas.freightCost),
      SQCustomsDuties: z.array(fieldSchemas.customsDutyCost),
    })
    .safeParse(values);

  return {
    values,
    errors: schema.success ? {} : schema.error.flatten().fieldErrors,
  };
};
