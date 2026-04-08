import { z } from "zod";

export const postionSchema = z.object({
    name: z.string(),
    job_id: z.string().uuid(),
    department_id: z.string().uuid(),
    level: z.number(),
    requirements: z.string().optional(),
    is_active: z.boolean(),
    max_slots: z.number().optional(),
    employees: z.array(z.object({ id: z.string().uuid() })).min(1),
    departments: z.array(z.object({ id: z.string().uuid() })).min(1),
    carrer_steps: z.array(z.object({ id: z.string().uuid() })).min(1),
})

export const positionSchemaForm = postionSchema.partial();