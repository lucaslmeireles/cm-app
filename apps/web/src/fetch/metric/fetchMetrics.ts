"use server";
import { getToken } from "@/helpers/getToken";

//TODO Alterar esse nome

export const fetchMetrics = async () => {
    try {
        const getMetrics = await fetch(process.env.API_BASE_URL + "metric", {
            headers: {
                Authorization: "Bearer " + (await getToken()),
            },
        });
        const metrics = await getMetrics.json();
        console.log(metrics);
        return metrics.data;
    } catch (error) {
        console.error(error);
    }
};
