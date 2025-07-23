"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { assessmentSchema } from "@/schema/assessment.schema";

export const postNewAssessment = async (
  newAssessment: z.infer<typeof assessmentSchema>,
) => {
  const safeData = assessmentSchema.safeParse(newAssessment);
  if (!safeData.success) return safeData.error.errors;
  try {
    const newAssessment = await fetch(
      process.env.API_BASE_URL + "assessment/",
      {
        method: "POST",
        body: JSON.stringify({
          ...safeData.data,
        }),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      },
    );
    if (!newAssessment.ok) {
      const error = await newAssessment.json();
      throw { error };
    }
    const assessment = await newAssessment.json();
    return assessment;
  } catch (error) {
    throw error;
  }
};
