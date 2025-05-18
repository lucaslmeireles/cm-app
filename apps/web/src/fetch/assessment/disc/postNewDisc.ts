"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { discSchema } from "@/schema/assessment.schema";

export const postNewDisc = async (
  newDisc: z.infer<typeof discSchema>,
) => {
  const safeData = discSchema.safeParse(newDisc);

  if (!safeData.success) return safeData.error.errors;
  try {
    const newDisc = await fetch(process.env.API_BASE_URL + "assessments/disc/create",
      {
        method: "POST",
        body: JSON.stringify(safeData.data),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const disc = await newDisc.json();
    return disc;
  } catch (error) {
    console.error(error);
  }
};
