import {z} from 'zod'

export const jobSchema = z.object({
    name: z.string(),
    type: z.enum(["WhiteCollar", "BlueCollar"]),
    employee_id: z.string().array(),
    department_id: z.string().array(),
    metric_id: z.string().array()
})

export const jobSchemaAdd = z.object({}).merge(jobSchema.omit({employee_id:true}))