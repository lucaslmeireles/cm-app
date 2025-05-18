import { z } from "zod";

export const metricSchema = z.object({
  name: z.string().min(1, "Name must contain at least 1 character"),
  type: z.enum(["HardSkill", "SoftSkill"]),
  weight: z.coerce
    .number()
    .int("Weight must be an integer")
    .min(1, "Weight must be at least 1")
    .max(5, "Weight must be at most 5"),
});


export const updateMetricSchema = metricSchema.partial()