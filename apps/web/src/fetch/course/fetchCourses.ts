"use server";
import { getToken } from "@/helpers/getToken";

export const fetchCourses = async () => {
  try {
    const getCourses = await fetch(process.env.API_BASE_URL + "course", {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const courses = await getCourses.json();
    return courses;
  } catch (error) {
    console.error(error);
  }
};
