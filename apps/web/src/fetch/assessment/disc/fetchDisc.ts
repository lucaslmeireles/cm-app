"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const employeeId = z.string().uuid({message: "Employee Id must be an UUID"})

export const fetchDiscByEmployee = async (id: z.infer<typeof employeeId>) => {
  try {
    const safeData = await employeeId.safeParse(id)
    if (!safeData.success) return safeData.error.errors;
    const getDisc = await fetch(process.env.API_BASE_URL + "assessments/disc/" +  safeData.data, {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const disc = await getDisc.json();
    return disc;
  } catch (error) {
    console.error(error);
  }
};
