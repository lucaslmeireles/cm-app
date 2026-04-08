"use server"
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const attachEmployee = z.object({
    employee_id: z.string().uuid(),
    user_id: z.string().uuid().array()
})

export const postRemoveEmployee = async (
  attechedEmployee: z.infer<typeof attachEmployee>
) => {
  const safeData = attachEmployee.safeParse(attechedEmployee);
  if (!safeData.success) return safeData.error.errors;
  try {
    const attechedEmployee = await fetch(process.env.API_BASE_URL + "managers/employee/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      },
      body: JSON.stringify(safeData.data)
    })
    const managerEmployee = await attechedEmployee.json();
    return managerEmployee;
  } catch (error) {
    console.error(error);
  }
};
