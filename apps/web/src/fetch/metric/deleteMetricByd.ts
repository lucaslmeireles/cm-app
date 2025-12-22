"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const metricID = z.string().uuid({message: "metricID  must be an UUID"})

export const deleteMetricByID = async (id: z.infer<typeof metricID>) => {
  try {
    const safeData = metricID.safeParse(id);
    if (!safeData.success) throw new Error(safeData.error.toString());
    const deleteMetric = await fetch(
      process.env.API_BASE_URL + "metric/id/" + safeData.data,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const metric = await deleteMetric.json();
    return metric;
  } catch (error) {
    console.error(error);
  }
};
