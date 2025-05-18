"use server";
import { completeProfile } from "@/schema/employee.schema";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

export const updateMe = async (
  editEmployee: z.infer<typeof completeProfile>
) => {
  const safeData = completeProfile.safeParse(editEmployee);
  console.log(editEmployee);
  if (!safeData.success) return safeData.error.errors;
  try {
    const employee = await fetch(
      process.env.API_BASE_URL + "employee/edit/me",
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + (await getToken()),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...safeData.data,
          score: 0,
          birthday: new Date(safeData.data?.birthday).toISOString(),
          entry_date: new Date(safeData.data.entry_date).toISOString(),
        }),
      }
    );
    const date = await employee.json();
    return date;
  } catch (e) {
    console.log(e);
    return e;
  }
};
