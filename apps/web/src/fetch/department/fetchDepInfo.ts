"use server"

import { getToken } from "@/helpers/getToken";

export const fetchDepOrgInfo = async () => {
    try {
        const getOrgInfo = await fetch(process.env.API_BASE_URL  + "org/info", {
            headers: {
              Authorization: "Bearer " + (await getToken()),
            },
          });
          const orgInfo = await getOrgInfo.json(); 
          return orgInfo
    } catch (error) {
        console.error(error)
    }
}