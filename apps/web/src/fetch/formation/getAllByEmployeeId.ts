"use server"
import { getToken } from "@/helpers/getToken";
import { z} from 'zod'
const employeeId = z.string().uuid({message: "Employee Id must be an UUID"})

export const getAllByEmployeeId = async (id: z.infer<typeof employeeId>) => {
    try {
        const safeData = employeeId.safeParse(id.split('/')[0])
        if(!safeData.success) throw new Error(safeData.error.toString())
        const getFormationsByEmployee = await fetch(process.env.API_BASE_URL  + "formations/" + safeData.data + "/employee", {
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json"
            },
          });
          
          const formations = await getFormationsByEmployee.json(); 
          console.log(formations)
          return formations.data
    } catch (error) {
        console.error(error)
    }
}