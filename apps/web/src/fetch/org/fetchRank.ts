"use server"
import { getToken } from "@/helpers/getToken";

export const fetchRank = async () => {
    try {
        const getRankInfo = await fetch(process.env.API_BASE_URL  + "org/rank", {
            headers: {
              Authorization: "Bearer " + (await getToken()),
            },
          });
          const rankInfo = await getRankInfo.json(); 
          return rankInfo
    } catch (error) {
        console.error(error)
    }
}