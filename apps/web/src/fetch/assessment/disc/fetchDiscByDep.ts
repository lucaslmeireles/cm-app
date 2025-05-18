"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const depId = z.object({
  name: z.string(),
  args: z.string().uuid({message: "Department Id must be an UUID"})
})

export const fetchDiscByDep = async (id: z.infer<typeof depId>) => {
  const data = []
  try {
    const safeData = await depId.safeParse(id)
    if (!safeData.success) return safeData.error.errors;
    const getDisc = await fetch(process.env.API_BASE_URL + "assessments/disc/dep/" +  safeData.data.args, {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const disc = await getDisc.json();
    for (let key in disc.data._avg) {
      data.push({ name: key, score: disc.data._avg[key] });
    }
    return data
  } catch (error) {
    console.error(error);
  }
};
