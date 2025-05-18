import { z } from "zod";

export const PromoteEmployee = z.object({
  user_id: z.string().uuid(),
  employee_id: z.string().uuid(),
  department: z
    .array(z.string())
    .refine((value) => value.some((item) => item)),
  employees: z
    .string()
    .uuid()
    .refine((value) => value.length > 0)
    .array(),
  role: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  tenant_id: z.string().transform((v) => Number(v)),
  name: z.string(),
});

export const PromoteEmployeeForm = z
  .object({})
  .merge(PromoteEmployee)
  .omit({ email: true, password: true, tenant_id: true, name: true, employee_id: true });
