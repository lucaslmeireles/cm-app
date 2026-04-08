"use server"
import { getToken } from "@/helpers/getToken";
import { z } from 'zod'
const userId = z.string().uuid({ message: "Employee Id must be an UUID" })

export const deleteManager = async (id: z.infer<typeof userId>) => {
    try {
        const safeData = userId.safeParse(id)
        if (!safeData.success) throw new Error(safeData.error.toString())
        const deleteManager = await fetch(process.env.API_BASE_URL + "managers/" + safeData.data, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + (await getToken()),
                "Content-Type": "application/json"
            },
        });
        const manager = await deleteManager.json();
        if (manager.statusCode !== 200) throw new Error(manager.message)
        return manager
    } catch (error) {
        throw new Error(error.message)
    }
}