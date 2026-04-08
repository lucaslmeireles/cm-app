"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const userId = z.string().uuid({ message: "User Id must be an UUID" });

export const fetchManagerChart = async (id: string) => {
  try {
    const safeData = userId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const getManagerChart = await fetch(
      process.env.API_BASE_URL + "org/chart/manager/" + safeData.data,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const managerChart = await getManagerChart.json();
    return managerChart;
  } catch (error) {
    console.error(error);
  }
};
