"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const jobId = z.string().uuid({ message: "Job Id must be an UUID" });

export const fetchJobById = async (id: z.infer<typeof jobId>) => {
  try {
    const safeData = jobId.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());

    const getJob = await fetch(
      process.env.API_BASE_URL + "jobs/" + safeData.data,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const job = await getJob.json();
    return job;
  } catch (error) {
    console.error(error);
  }
};
