"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { jobSchemaAdd } from "@/schema/job.schema";

const jobId = z.string().uuid({message: "Job Id must be an UUID"})

export const patchJob = async (newJob: z.infer<typeof jobSchemaAdd>, job_id: z.infer<typeof jobId>) => {
  const safeData = jobSchemaAdd.safeParse(newJob);
  const safeDataId = jobId.safeParse(job_id)
  if (!safeData.success) return safeData.error.errors;
  console.log(safeData.data, safeDataId.id)
  try {
    const updateJob = await fetch(process.env.API_BASE_URL + "jobs/" + safeDataId.data, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: safeData.data.name,
        type: safeData.data.type,
        metric_id: safeData.data.metric_id,
        department_id: safeData.data.department_id,
      }),
    });
    const job = await updateJob.json();

    return job;
  } catch (error) {
    console.error(error);
  }
};
