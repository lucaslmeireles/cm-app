"use server";
import { addEmployeeForm } from "@/schema/employee.schema";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

export const postNewEmployee = async (
  newEmployee: z.infer<typeof addEmployeeForm>,
) => {
  const safeData = addEmployeeForm.safeParse(newEmployee);
  if (!safeData.success) return safeData.error.errors;
  const { image, ...data } = safeData.data;

  try {
    const employee = await fetch(process.env.API_BASE_URL + "employee", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        birthday: new Date(safeData.data?.birthday).toISOString(),
        entry_date: new Date(safeData.data.entry_date).toISOString(),
      }),
    });
    const date = await employee.json();
    console.log(date);
    if (date.statusCode !== 201) throw new Error(date.message);
    return date;
  } catch (e) {
    throw new Error(e.message);
  }
};
