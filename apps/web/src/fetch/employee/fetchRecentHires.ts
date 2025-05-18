"use server";
import { getToken } from "@/helpers/getToken";

export const fetchRecentHires = async () => {
  try {
    const getRecentHires = await fetch(process.env.API_BASE_URL + "employee/recent/hires", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const recentHires = await getRecentHires.json();
    return recentHires;
  } catch (error) {
    console.error(error);
  }
};
