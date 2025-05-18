"use server";
import { getToken } from "@/helpers/getToken";

export const fetchEmployees = async () => {
  try {
    const getEmployees = await fetch(process.env.API_BASE_URL + "employee", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const employees = await getEmployees.json();
    return employees.data;
  } catch (error) {
    console.error(error);
  }
};
