"use server";
import { getToken } from "@/helpers/getToken";
import { formationSchema } from "@/schema/formation.schema";
import { z } from "zod";

export const postNewFormation = async (
  newFormation: z.infer<typeof formationSchema>
) => {
  const safeData = formationSchema.safeParse(newFormation);

  if (!safeData.success) return safeData.error.errors;
  try {
    const newFormation = await fetch(process.env.API_BASE_URL + "formations", {
      method: "POST",
      body: JSON.stringify({
        name: safeData.data.name,
        employee_id: safeData.data.employee_id,
        type: safeData.data.type,
      }),
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
    });
    const formation = await newFormation.json();
    return formation;
  } catch (error) {
    console.error(error);
  }
};
