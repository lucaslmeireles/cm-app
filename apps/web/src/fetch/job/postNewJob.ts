"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { jobSchemaAdd } from "@/schema/job.schema";
import { revalidatePath } from "next/cache";

export const postNewJob = async (newJob: z.infer<typeof jobSchemaAdd>) => {
  const safeData = jobSchemaAdd.safeParse(newJob);

  if (!safeData.success) return safeData.error.errors;
  console.log(
    JSON.stringify({
      name: safeData.data.name,
      type: safeData.data.type,
      metric_id: safeData.data.metric_id,
      department_id: safeData.data.department_id,
    })
  );
  try {
    const newJob = await fetch(process.env.API_BASE_URL + "jobs/create", {
      method: "POST",
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
    const job = await newJob.json();
    revalidatePath("/jobs");
    return job;
  } catch (error) {
    console.error(error);
  }
};
