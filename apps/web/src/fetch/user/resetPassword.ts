"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { passwordSchema } from "@/schema/setup.schema";
const userId = z.string().uuid({message: "User must be an uuid"})


export const reset_password = async (
  password: z.infer<typeof passwordSchema>,
  id: z.infer<typeof userId>
) => {
  const safeData = passwordSchema.safeParse(password);
  const safeId = userId.safeParse(id);
  if (!safeData.success || !safeId.success) return safeData.error.errors || safeId.error?.errors;
  try {
    const userData = await fetch(
      process.env.API_BASE_URL + "user/reset-password/" + safeId.data,
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
    return user;
  } catch (error) {
    console.error(error);
  }
};
