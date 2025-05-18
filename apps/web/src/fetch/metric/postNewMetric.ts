"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { metricSchema } from "../../schema/metric.schema";

export const postNewMetric = async (
  newMetric: z.infer<typeof metricSchema>,
) => {
  const safeData = metricSchema.safeParse(newMetric);
  console.log("safeData", JSON.stringify(safeData.data));
  if (!safeData.success) return safeData.error.errors;
  try {
    const newMetric = await fetch(process.env.API_BASE_URL + "metric", {
      method: "POST",
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
    console.log("newMetric", newMetric);
    const metric = await newMetric.json();
    return metric;
  } catch (error) {
    console.error(error);
  }
};
