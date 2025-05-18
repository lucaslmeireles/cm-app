"use server";

import { getToken } from "@/helpers/getToken";


export const fetchAllUsers = async () => {
  try {
    const getTokenInfo = await fetch(
      process.env.API_BASE_URL + "user/all/",
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const user = await getTokenInfo.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};
