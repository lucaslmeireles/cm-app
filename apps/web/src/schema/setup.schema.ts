import { z } from "zod";
import { UserSchema } from "./user.schema";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const parseDateString = (dateString: string): String => {
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) throw new Error("Invalid date");
  return date.toDateString();
};


export const setupSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Should contain at least 8 characters" })
    .max(16, { message: "Should contain at maximum 16 characters" }),
  org_name: z.string().min(1, { message: "You must have a organization name" }),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const memberSchema = z
  .object({
    role_name: z.string(),
  })
  .merge(
    UserSchema.omit({ employee_id: true, tenant_id: true, role_id: true })
  );

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Should contain at least 8 characters" })
    .max(16, { message: "Should contain at maximum 16 characters" }),
});


export const inviteMember = z.object({
  name: z.string().min(1).max(156),
  email: z.string().email(),
  birthday: z.string().transform(parseDateString),
  phone: z.string().min(8),
  role_name: z.string(),
  job_id: z.string().uuid(),
  password: z.string().min(8).max(16),
  confirm_password: z.string().min(8).max(16),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'], // Aplica o erro ao campo de confirmação de senha
});