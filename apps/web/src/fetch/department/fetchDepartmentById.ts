"use server";
import { getToken } from "@/helpers/getToken";
import { z} from 'zod'

const depId = z.string().uuid({message: "Department ID must be an UUID"})
export const fetchDepartmentById = async (id: z.infer<typeof depId>) => {
  try {
    const safeData = depId.safeParse(id)
    if(!safeData.success) throw new Error(safeData.error.toString())
    const getDepartments = await fetch(
      process.env.API_BASE_URL + "departments/" + safeData.data  ,
      {
        headers: {
          Authorization: "Bearer " + (await getToken()),
        },
      }
    );
    const departments = await getDepartments.json();
    return departments;
  } catch (error) {
    console.error(error);
  }
};
