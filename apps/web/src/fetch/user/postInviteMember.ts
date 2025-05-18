"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { inviteMember } from "@/schema/setup.schema";

export const postInviteMember = async (
  newMember: z.infer<typeof inviteMember>
) => {
  const safeData = inviteMember.safeParse(newMember);
  console.log("safeData", JSON.stringify(safeData.data));
  if (!safeData.success) return safeData.error.errors;
  try {
    const newMember = await fetch(process.env.API_BASE_URL + "user/invite", {
      method: "POST",
      body: JSON.stringify({
        ...safeData.data,
        birthday: new Date(safeData.data?.birthday).toISOString(),
      }),
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
    });
    const user = await newMember.json();
    if (newMember.status === 400) throw new Error(user.message);
    if (newMember.status === 401) throw new Error(user.message);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
