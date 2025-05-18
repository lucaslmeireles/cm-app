"use server";
import { getToken } from "@/helpers/getToken";

export const fetchAllChart = async () => {
  try {
    const getAllChart = await fetch(process.env.API_BASE_URL + "org/chart", {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const allChart = await getAllChart.json();
    return allChart;
  } catch (error) {
    console.error(error);
  }
};
