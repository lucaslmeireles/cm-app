"use server"
import { getToken } from "@/helpers/getToken";
export const fetchEmployeeByUserId = async () => {
    try {
        const getEmployee = await fetch(process.env.API_BASE_URL  + "user/employee", {
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json"
            },
          });
          const employee = await getEmployee.json(); 
          return employee
    } catch (error) {
        console.error(error)
    }
}