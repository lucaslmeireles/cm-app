"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { absenceSchemaUpdate } from "@/schema/absence.schema";
import { getUser } from "@/helpers/getUser";

const absenceID = z.string().uuid({ message: "absenceID must be an UUID" });

export const patchAbsenceById = async (
    newAbsence: z.infer<typeof absenceSchemaUpdate>,
    id: z.infer<typeof absenceID>,
) => {
    const safeData = absenceSchemaUpdate.safeParse(newAbsence);
    const safeID = absenceID.safeParse(id);
    if (!safeData.success || !safeID.success) return safeData.error.errors;
    try {
        const patchAbsence = await fetch(
            process.env.API_BASE_URL + "absences/" + safeID.data,
            {
                method: "PATCH",
                body: JSON.stringify({ ...safeData.data }),
                headers: {
                    Authorization: "Bearer " + (await getToken()),
                    "Content-Type": "application/json",
                },
            },
        );
        const absence = await patchAbsence.json();
        console.log(absence);
        return absence;
    } catch (error) {
        console.error(error);
    }
};
