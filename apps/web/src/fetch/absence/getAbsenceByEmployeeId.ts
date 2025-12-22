"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const employeeId = z.object({
    name: z.string(),
    args: z.string().uuid(),
});

export const fetchAbsenceByEmployeeId = async (
    id: z.infer<typeof employeeId>,
) => {
    try {
        const safeData = await employeeId.safeParse(id);
        if (!safeData.success) return safeData.error.errors;
        const getAbsence = await fetch(
            process.env.API_BASE_URL +
                "absences/" +
                safeData.data.args +
                "/employee",
            {
                headers: {
                    Authorization: "Bearer " + (await getToken()),
                },
            },
        );
        const absences = await getAbsence.json();
        return absences.data;
    } catch (error) {
        console.error(error);
    }
};
