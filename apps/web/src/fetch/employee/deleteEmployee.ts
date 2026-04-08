"use server"
import { getToken } from "@/helpers/getToken";
import { z} from 'zod'
const employeeId = z.string().uuid({message: "Employee Id must be an UUID"})

export const deleteEmployee = async (id: z.infer<typeof employeeId>) => {
    try {
        const safeData = employeeId.safeParse(id)
        if(!safeData.success) throw new Error(safeData.error.toString())
        const deleteEmployee = await fetch(process.env.API_BASE_URL  + "employee/delete/" + safeData.data, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json"
            },
          });
          const employee = await deleteEmployee.json();
          if (employee.statusCode !==200) throw new Error(employee.message)
          return employee
    } catch (error) {
          throw new Error(error.message)
    }
}