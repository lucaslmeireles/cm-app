"use server"
import { getToken } from "@/helpers/getToken";

export const fetchAllOrgs = async () => {
    try {
        const getOrgs = await fetch(process.env.API_BASE_URL  + "org/", {
            headers: {
              Authorization: "Bearer " + (await getToken()),
            },
          });
          const orgs = await getOrgs.json(); 
          return orgs
    } catch (error) {
        console.error(error)
    }
}