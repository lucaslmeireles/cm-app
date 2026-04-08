"use server";
import { getToken } from "@/helpers/getToken";

export const fetchJobs = async () => {
  try {
    const getJobs = await fetch(process.env.API_BASE_URL + "jobs", {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const jobs = await getJobs.json();
    return jobs;
  } catch (error) {
    console.error(error);
  }
};
