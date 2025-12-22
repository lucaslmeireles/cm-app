import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string(),
  metric_id: z.string().array().optional(),
  job_id: z.string().array().optional(),
});

export const updateDepartmentSchema = z
  .object({ id: z.string().uuid() })
  .merge(departmentSchema);
