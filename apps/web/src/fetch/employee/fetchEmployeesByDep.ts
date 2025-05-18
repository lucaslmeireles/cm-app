"use server"
import { getToken } from "@/helpers/getToken";

export const fetchEmployeesByDep = async (department_id: string[]) => {
    try {
        const getEmployees = await fetch(process.env.API_BASE_URL + "employee/department", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                department_id: department_id
            })
          });
          const employees = await getEmployees.json(); 
          console.log(employees)
          return employees
    } catch (error) {
        console.error(error)
    }
}