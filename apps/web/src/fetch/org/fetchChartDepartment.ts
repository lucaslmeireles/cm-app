"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const departmentId = z
  .string()
  .uuid({ message: "Department Id must be an UUID" });

export const fetchDepartmentChart = async (id: string) => {
  try {
    const safeData = departmentId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getDepartmentChart = await fetch(
      process.env.API_BASE_URL + "org/chart/department/" + safeData.data,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const departmentChart = await getDepartmentChart.json();
    return departmentChart;
  } catch (error) {
    console.error(error);
  }
};
