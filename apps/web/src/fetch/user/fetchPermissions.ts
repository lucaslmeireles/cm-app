"use server";

import { getToken } from "@/helpers/getToken";

export const fetchPermission = async (token: string) => {
  try {
    const getPermissions = await fetch(
      process.env.API_BASE_URL + "user/permissions",
      {
        headers: {
                  Authorization: "Bearer " + (token),
                  "Content-Type": "application/json",
                },
      }
    );
    const permission = await getPermissions.json();
    return permission.data[0];
  } catch (error) {
    console.error(error);
  }
};
