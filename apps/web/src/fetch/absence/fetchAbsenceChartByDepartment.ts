"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const departamentId = z.string().uuid({ message: "Department Id must be an UUID" });

export const fetchAbsenceChartByDepartment = async (id: string, type: "month" | "year") => {
  try {
    const safeData = departamentId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getAbsenceChart = await fetch(
      process.env.API_BASE_URL  + "absences/" + safeData.data + "/chart/department/" + type,
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
