"use server";
import { getToken } from "@/helpers/getToken";
import { string, z } from "zod";
export const employeeId = z
  .string()
  .uuid({ message: "MetricId must be an UUID" });

export const fetchAllGradesByEmployee = async (
  id: z.infer<typeof employeeId>
) => {
  try {
    console.log(id);
    const safeData = employeeId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getAllGradesById = await fetch(
      process.env.API_BASE_URL + "grade/employee/" + safeData.data,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const grades = await getAllGradesById.json();
    console.log(grades);
    return grades;
  } catch (error) {
    console.error(error);
  }
};
