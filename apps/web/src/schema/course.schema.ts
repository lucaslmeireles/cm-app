import { z } from "zod";

export const courseSchema = z.object({
    name: z.string(),
    level: z.coerce.string(),
    due_date: z.coerce.date(),
    department_id: z.string().uuid(),
    employees_id: z.array(z.string().uuid()),
})
