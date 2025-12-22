"use server";
import { getToken } from "@/helpers/getToken";

export const fetchAssessments = async () => {
  try {
    const getAssessments = await fetch(process.env.API_BASE_URL + "assessments", {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const assessments = await getAssessments.json();
    return assessments;
  } catch (error) {
    console.error(error);
  }
};
