import { z } from "zod";

export const absenceSchema = z.object({
    start_date: z.date(),
    end_date: z.date().optional().nullable(),
    type: z.enum(["VACATION", "SICK_LEAVE", "UNPAID_LEAVE", "OTHER"]),
    justification: z.string().optional().nullable(),
    documents: z.string().optional().nullable(),
    status: z.string().default("PENDING"),
    approver_id: z.string().uuid(),
    employee_id: z.string().uuid(),
});

export const absenceSchemaUpdate = absenceSchema.partial();

export const absenceSchemaForm = z.object({
    start_date: z.date(),
    end_date: z.date().optional().nullable(),
    type: z.enum(["VACATION", "SICK_LEAVE", "UNPAID_LEAVE", "OTHER"]),
    justification: z.string().optional().nullable(),
    documents: z.string().optional().nullable(),
    status: z.string().default("PENDING"),
    approver_id: z.string().uuid().optional(),
    employee_id: z.string().uuid().optional(),
});
