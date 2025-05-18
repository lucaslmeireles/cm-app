"use server";
import { getToken } from "@/helpers/getToken";
import { formationSchema } from "@/schema/formation.schema";
import { z } from "zod";
const formationId = z.string().uuid({ message: "formationId must be an UUID" });


export const patchFormation = async (
  formation: z.infer<typeof formationSchema>, id: z.infer<typeof formationId>
) => {
  const safeData = formationSchema.safeParse(formation);
  const safeDataId =  formationId.safeParse(id)

  if (!safeData.success || !safeDataId.success ) return [safeData.error.errors, safeDataId.error.errors];
  try {
    const patchFormation = await fetch(process.env.API_BASE_URL + "formations/" + safeDataId.data, {
      method: "PATCH",
      body: JSON.stringify({
        name: safeData.data.name,
        type: safeData.data.type,
      }),
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
    });
    const formation = await patchFormation.json();
    console.log(formation)
    return formation;
  } catch (error) {
    console.error(error);
  }
};
