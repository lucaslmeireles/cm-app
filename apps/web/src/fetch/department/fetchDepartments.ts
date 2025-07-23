"use server";
import { getToken } from "@/helpers/getToken";

export const fetchDepartments = async () => {
  try {
    const getDepartments = await fetch(
      process.env.API_BASE_URL + "department",
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      },
    );
    const departments = await getDepartments.json();
    return departments.data;
  } catch (error) {
    console.error(error);
  }
};
