import { z } from "zod";
import { EmployeeSchema } from "./employee.schema";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  employee_id: z.string().uuid(),
  role_name: z.string().optional(),
  tenant_id: z.coerce.number(),
  job_id: z.string(),
  name: z.string()
});

export const UserUpdateSchema = z
  .object({
    password: z.string().min(8),
    confirm_password: z
      .string()
      .min(8)
      .refine((data) => data === this.password, {
        message: "Passwords do not match",
      }),
  })
  .merge(EmployeeSchema)
  .omit({});
