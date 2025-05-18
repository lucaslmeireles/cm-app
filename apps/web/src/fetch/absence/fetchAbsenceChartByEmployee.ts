"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const employeeId = z.string().uuid({ message: "Employee Id must be an UUID" });

export const fetchAbsenceChartByEmployee = async (id: string, type: "month" | "year") => {
  try {
    const safeData = employeeId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getAbsenceChart = await fetch(
      process.env.API_BASE_URL  + "absences/" + safeData.data + "/chart/employee/" + type,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const absenceChart = await getAbsenceChart.json();
    return absenceChart;
  } catch (error) {
    console.error(error);
  }
};
