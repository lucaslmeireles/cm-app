import { z } from "zod";

export const assessmentSchema = z.object({
    employee_id: z.string().uuid(),
    evaluator_id: z.string().uuid(),
    status: z.enum(["DRAFT", "PENDING", "COMPLETED", "ARCHIVED"]),
    period_start: z.date(),
    period_end: z.date(),
    metrics: z
        .object({
            metric_id: z.string().uuid(),
            score: z.number(),
            employee_id: z.string().uuid(),
        })
        .array(),
    comments: z.string().optional(),
});

export const assessmentSchemaForm = assessmentSchema.partial();

export const discSchema = z.object({
    employee_id: z.string().uuid(),
    D: z.number(),
    I: z.number(),
    S: z.number(),
    C: z.number(),
});
