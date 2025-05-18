"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { passwordSchema } from "@/schema/setup.schema";
import { auth } from "@/auth";

export const updatePassword = async (
  password: z.infer<typeof passwordSchema>
) => {
  const userSession = await auth();
  const safeData = passwordSchema.safeParse(password);
  if (!safeData.success) return safeData.error.errors;
  console.log(
    JSON.stringify({
      password: safeData.data.password,
    })
  );
  try {
    const userData = await fetch(
      process.env.API_BASE_URL + "user/change/password",
      {
        method: "PATCH",
        body: JSON.stringify({
          password: safeData.data.password,
        }),
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const user = await userData.json();
    console.log(user);

    return user;
  } catch (error) {
    console.error(error);
  }
};
