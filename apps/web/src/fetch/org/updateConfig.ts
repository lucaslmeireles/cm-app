"use server";
import { getToken } from "@/helpers/getToken";

export const updateConfig = async () => {
  try {
    const getOrgConfig = await fetch(
      process.env.API_BASE_URL + "org/set/config",
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const orginfo = await getOrgConfig.json();
    return orginfo;
  } catch (error) {
    console.error(error);
  }
};
