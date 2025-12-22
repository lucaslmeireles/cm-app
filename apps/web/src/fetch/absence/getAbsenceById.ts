"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const absenceID = z.string().uuid({message: "absenceID must be an UUID"})

export const fetchAbsenceById = async (id: z.infer<typeof absenceID>) => {
  try {
    const safeData = await absenceID.safeParse(id)
    if (!safeData.success) return safeData.error.errors;
    const getAbsence = await fetch(process.env.API_BASE_URL + "absence/" +  safeData.data, {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const absence = await getAbsence.json();
    return absence;
  } catch (error) {
    console.error(error);
  }
};
