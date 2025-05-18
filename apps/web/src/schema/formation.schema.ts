import { CourseType } from "@/types/formation.type";
import { z } from "zod";

export const formationSchema = z.object({
  name: z.string(),
  employee_id: z.string().optional(),
  type: z.enum(["Bachelor",
  "Master",
  "MBA",
  "Doctorate",
  "Technical",
  "Specialization",
  "Postgraduate",
  "Extension",
  "Training",
  "Others"]),
});
