"use server";
import { PromoteEmployeeForm } from "@/schema/promoteEmployee";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
export const promoteEmployee = async (
  values: z.infer<typeof PromoteEmployeeForm>
) => {
  console.log(values)
  try {
    const safeData = PromoteEmployeeForm.safeParse(values);
    if (!safeData.success) throw new Error(safeData.error.toString());
    JSON.stringify(safeData.data)
    console.log(safeData.data);
    const data = await fetch(process.env.API_BASE_URL + "managers/" + safeData.data.user_id, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(safeData.data),
    });

    return data.json();
  } catch (error) {
    console.error(error.message);
  }
};
