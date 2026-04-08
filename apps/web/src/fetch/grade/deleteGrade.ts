"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const gradeId = z.string().uuid({ message: "Grade Id must be an UUID" });

export const deleteGrade = async (id: z.infer<typeof gradeId>) => {
  try {
    const safeData = gradeId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const deleteGrade = await fetch(
      process.env.API_BASE_URL + "grade/id/" + safeData.data,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const grade = await deleteGrade.json();
    return grade;
  } catch (error) {
    console.error(error);
  }
};
