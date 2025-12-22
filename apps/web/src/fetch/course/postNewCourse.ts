"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { departmentSchema } from "@/schema/department.schema";
import { courseSchema } from "@/schema/course.schema";

export const postNewCourse = async (
  newCourse: z.infer<typeof courseSchema>
) => {
  const safeData = courseSchema.safeParse(newCourse);
  if (!safeData.success) return safeData.error.errors;
  try {
    const newCourse = await fetch(
      process.env.API_BASE_URL + "course/create",
      {
        method: "POST",
        body: JSON.stringify(safeData.data),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const course = await newCourse.json();
    return course;
  } catch (error) {
    console.error(error);
  }
};
