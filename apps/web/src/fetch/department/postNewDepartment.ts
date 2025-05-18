"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { departmentSchema } from "@/schema/department.schema";

export const postNewDepartment = async (
  newDepartment: z.infer<typeof departmentSchema>
) => {
  const safeData = departmentSchema.safeParse(newDepartment);
  if (!safeData.success) return safeData.error.errors;
  try {
    const newDepartment = await fetch(
      process.env.API_BASE_URL + "departments",
      {
        method: "POST",
        body: JSON.stringify(safeData.data),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const department = await newDepartment.json();
    return department;
  } catch (error) {
    console.error(error);
  }
};
