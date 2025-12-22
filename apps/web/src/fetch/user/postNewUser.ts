"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { UserSchema } from "@/schema/user.schema";

export const postNewUser = async (newUser: z.infer<typeof UserSchema>) => {
  const safeData = UserSchema.safeParse(newUser);
  if (!safeData.success) return safeData.error.errors;
  try {
    const newUser = await fetch(process.env.API_BASE_URL + "user/invite", {
      method: "POST",
      body: JSON.stringify(safeData.data),
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
    });
    const user = await newUser.json();
    console.log('USER', user)
    return user;
  } catch (error) {
    console.log(error)
  }
};
