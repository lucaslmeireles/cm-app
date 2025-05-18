"use server"
import { getToken } from "@/helpers/getToken";
import {string, z} from 'zod'
export const metricId = z.string().uuid({message: "MetricId must be an UUID"})

export const fetchMetricById = async (id: z.infer<typeof metricId>) => {
    try {
        console.log(id)
        const safeData = metricId.safeParse(id)
        if(!safeData.success) throw new Error(safeData.error.toString())
        const getMetricById = await fetch(process.env.API_BASE_URL  + "metric/id/" + safeData.data, {
            headers: {
              Authorization: "Bearer " + (await getToken()),
              "Content-Type": "application/json"
            },
          });
          const metric = await getMetricById.json(); 
          return metric
    } catch (error) {
        console.error(error)
    }
}