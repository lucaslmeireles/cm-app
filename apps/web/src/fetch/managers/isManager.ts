"use server";
import { getToken } from "@/helpers/getToken";
import { z } from 'zod'
const employeeId = z.string().uuid({ message: "Employee Id must be an UUID" })
export const fetchIsManager = async (id: z.infer<typeof employeeId>) => {
    try {
        const safeData = employeeId.safeParse(id)
        if (!safeData.success) throw new Error(safeData.error.toString())
        const getIsManager = await fetch(process.env.API_BASE_URL + "employee/manager/" + safeData.data, {
            headers: {
                Authorization: "Bearer " + (await getToken()),
            },
        });
        const isManager = await getIsManager.json();
        if (isManager.statusCode === 403) return false
        return isManager;
    } catch (error) {
        return false
    }
};
