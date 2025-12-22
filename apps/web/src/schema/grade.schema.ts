import {z} from 'zod'

export const gradeSchema = z.object({
    metric_id: z.string().uuid(),
    score: z.coerce.number().min(0).max(100),
    employee_id: z.string().uuid()
})

export const gradeSchemaPost = z.object({}).merge(gradeSchema.omit({employee_id: true}))