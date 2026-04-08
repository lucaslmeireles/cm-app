"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { gradeSchema } from "../../schema/grade.schema";

export const postNewGrade = async (newGrade: z.infer<typeof gradeSchema>) => {
  const safeData = gradeSchema.safeParse(newGrade);

  if (!safeData.success) return safeData.error.errors;
  try {
    const newGrade = await fetch(process.env.API_BASE_URL + "grade/create", {
      method: "POST",
      body: JSON.stringify({
        employee_id: safeData.data.employee_id,
        metric_id: safeData.data.metric_id,
        score: safeData.data.score,
      }),
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
    });
    const grade = await newGrade.json();
    return grade;
  } catch (error) {
    console.error(error);
  }
};
