import { z } from "zod";
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

export const EmployeeSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  address: z.string().optional(),
  register: z.string().optional(),
  birthday: z.date(),
  entry_date: z.date(),
  current_postion: z.string().optional(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
  departments: z.string().array(),
});

export const addEmployeeForm = z
  .object({})
  .merge(EmployeeSchema.partial());

export const editEmployeeForm = z.object({}).merge(
  EmployeeSchema.partial()
);

export const completeProfile = z
  .object({
    password: z.string().min(8).max(16),
    confirm_password: z.string().min(8).max(16),
  })
  .merge(
    EmployeeSchema.partial()
  )
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
  });
