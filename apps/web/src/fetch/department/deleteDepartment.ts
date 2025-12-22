"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const departmentId = z
  .string()
  .uuid({ message: "Department Id must be an UUID" });

export const deleteDepartment = async (id: z.infer<typeof departmentId>) => {
  try {
    const safeData = departmentId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const deleteDepartment = await fetch(
      process.env.API_BASE_URL + "departments/" + safeData.data,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const department = await deleteDepartment.json();
    return department;
  } catch (error) {
    console.error(error);
  }
};
