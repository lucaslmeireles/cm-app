"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const employeeId = z.string().uuid({ message: "Employee ID must be an UUID" });

export const fetchEmployeeById = async (id: z.infer<typeof employeeId>) => {
    try {
        console.log(id);
        const safeData = employeeId.safeParse(id);
        if (!safeData.success) throw new Error(safeData.error.toString());
        const getEmployee = await fetch(
            process.env.API_BASE_URL + "employee/" + safeData.data,
            {
                headers: {
                    Authorization: "Bearer " + (await getToken()),
                    "Content-Type": "application/json",
                },
            },
        );
        const employee = await getEmployee.json();
        console.log(employee);
        return employee.data;
    } catch (error) {
        console.error(error);
    }
};
