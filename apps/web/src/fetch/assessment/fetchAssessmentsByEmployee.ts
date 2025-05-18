"use server";
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
const employeeId = z.object({
    name: z.string(),
    args: z.string().uuid(),
});

export const fetchAssessmentsByEmployee = async (
    id: z.infer<typeof employeeId>,
) => {
    try {
        const safeData = employeeId.safeParse(id);
        if (!safeData.success) throw new Error(safeData.error.toString());
        console.log("DATA ARGS ID", safeData.data?.args);
        const getAssessmentsByEmployee = await fetch(
            process.env.API_BASE_URL +
                "assessments/employee/" +
                safeData.data.args,
            {
                headers: {
                    Authorization: "Bearer " + (await getToken()),
                },
            },
        );
        const assessments = await getAssessmentsByEmployee.json();
        return assessments.data;
    } catch (error) {
        console.error(error);
    }
};
