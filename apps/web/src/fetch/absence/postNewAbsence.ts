"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { absenceSchema } from "@/schema/absence.schema";
import { getUser } from "@/helpers/getUser";

export const postNewAbsence = async (
    newAbsence: z.infer<typeof absenceSchema>,
) => {
    const safeData = absenceSchema.safeParse(newAbsence);

    if (!safeData.success) return safeData.error.errors;

    const user = await getUser();

    try {
        const newAbsence = await fetch(process.env.API_BASE_URL + "absences", {
            method: "POST",
            body: JSON.stringify({
                ...safeData.data,
            }),
            headers: {
                Authorization: "Bearer " + (await getToken()),
                "Content-Type": "application/json",
            },
        });
        const absence = await newAbsence.json();
        console.log();
        return absence;
    } catch (error) {
        console.error(error);
    }
};
