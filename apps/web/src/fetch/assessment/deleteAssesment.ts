"use server";
import { getToken } from "@/helpers/getToken";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const assessmentId = z
  .string()
  .uuid({ message: "Assessment Id must be an UUID" });

export const deleteAssessment = async (id: z.infer<typeof assessmentId>) => {
  try {
    const safeData = assessmentId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const deleteAssessment = await fetch(
      process.env.API_BASE_URL + "assessments/" + safeData.data,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const assessment = await deleteAssessment.json();
    revalidatePath('/assessment')
    return assessment;
  } catch (error) {
    throw new Error(error);
  }
};
