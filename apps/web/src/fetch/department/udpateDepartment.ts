"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { updateDepartmentSchema } from "@/schema/department.schema";

export const updateDepartment = async (
  department: z.infer<typeof updateDepartmentSchema>
) => {
  console.log(department);
  const safeData = updateDepartmentSchema.safeParse(department);
  if (!safeData.success) return safeData.error.errors;
  try {
    const departmentData = await fetch(
      process.env.API_BASE_URL + "departments/" + safeData.data.id,
      {
        method: "PATCH",
        body: JSON.stringify(safeData.data),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const department = await departmentData.json();
    return department;
  } catch (error) {
    console.error(error);
  }
};
