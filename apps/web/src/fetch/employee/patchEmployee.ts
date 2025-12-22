"use server"
import { editEmployeeForm } from "@/schema/employee.schema";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";

const employeeId = z
  .string()
  .uuid({ message: "MetricId must be an UUID" });

export const patchEmployee = async (
  editEmployee: z.infer<typeof editEmployeeForm>, employee_id: z.infer<typeof employeeId>
) => {
  const safeData = editEmployeeForm.safeParse(editEmployee);
  const employee_Id = employeeId.safeParse(employee_id)
  if (!safeData.success) return safeData.error.errors;
  try {
    const employee = await fetch(process.env.API_BASE_URL + "employee/edit/" + employee_Id.data, {
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
    });
    const date = await employee.json();
    console.log(date)
    return date;
  } catch (e) {
    console.log(e);
    return e;
  }
};
