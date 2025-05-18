"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { updateMetricSchema } from "../../schema/metric.schema";

const metricID = z.string().uuid({message: "metricID  must be an UUID"})

export const updateMetricById = async (
  upMetric: z.infer<typeof updateMetricSchema> , metricId: z.infer<typeof metricID>
) => {
  const safeData = updateMetricSchema.safeParse(upMetric);
  const safeDataId = metricID.safeParse(metricId);
  if (!safeData.success || !safeDataId.success) return {error: [safeData.error?.errors,safeDataId.error?.errors] };
  try {
    const updateMetric = await fetch(process.env.API_BASE_URL + "metric/id/" + safeDataId.data, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: safeData.data.name,
        type: safeData.data.type,
        weight: safeData.data.weight,
      }),
    });
    const metric = await updateMetric.json();
    return metric;
  } catch (error) {
    console.error(error);
  }
};
