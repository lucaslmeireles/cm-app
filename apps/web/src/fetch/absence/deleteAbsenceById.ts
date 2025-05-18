"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const absenceID = z.string().uuid({message: "absenceID must be an UUID"})

export const deleteAbsenceById = async (id: z.infer<typeof absenceID>) => {
  try {
    const safeData = await absenceID.safeParse(id)
    if (!safeData.success) return safeData.error.errors;
    const deleteAbsence = await fetch(process.env.API_BASE_URL + "absence/" +  safeData.data, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const absence = await deleteAbsence.json();
    return absence;
  } catch (error) {
    console.error(error);
  }
};
