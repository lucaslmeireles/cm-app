"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const employeeId = z.string().uuid({ message: "Employee Id must be an UUID" });

export const fetchEmployeeChart = async (id: string) => {
  try {
    const safeData = employeeId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getEmployeeChart = await fetch(
      process.env.API_BASE_URL + "org/chart/employee/" + safeData.data,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const employeeChart = await getEmployeeChart.json();
    return employeeChart;
  } catch (error) {
    console.error(error);
  }
};
