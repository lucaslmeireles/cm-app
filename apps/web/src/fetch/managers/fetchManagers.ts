"use server";
import { getToken } from "@/helpers/getToken";

export const fetchManagers = async () => {
  try {
    const getManagers = await fetch(process.env.API_BASE_URL + "managers", {
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });
    const managers = await getManagers.json();
    return managers;
  } catch (error) {
    console.error(error);
  }
};
