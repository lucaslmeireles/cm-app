"use server"
import { getToken } from "@/helpers/getToken";
import { z} from 'zod'
const employeeId = z.string().uuid({message: "Employee Id must be an UUID"})

export const deleteFormation = async (id: z.infer<typeof employeeId>) => {
    try {
        const safeData = employeeId.safeParse(id)
        if(!safeData.success) throw new Error(safeData.error.toString())
        const deletedFormation = await fetch(process.env.API_BASE_URL  + "formations/" + safeData.data, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json"
            },
          });
          const formation = await deletedFormation.json();
          return formation
    } catch (error) {
          throw new Error(error.message)
    }
}