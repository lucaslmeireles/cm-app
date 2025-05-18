"use server";
import { getToken } from "@/helpers/getToken";

export const fetchEmployeesByManager = async () => {
  try {
    const getEmployees = await fetch(
      process.env.API_BASE_URL + "employee/manager",
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "applicatioon/json",
        },
      }
    );
    const employees = await getEmployees.json();
    console.log(employees);
    return employees;
  } catch (error) {
    console.error(error);
  }
};
