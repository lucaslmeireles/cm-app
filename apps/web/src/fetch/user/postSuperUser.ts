
import { getToken } from "@/helpers/getToken";
import { z } from "zod";
import { UserSchema } from "@/schema/user.schema";
import { setupSchema } from "@/schema/setup.schema";

export const postNewSuperUser = async (
  newUser: z.infer<typeof setupSchema>
) => {
  const safeData = setupSchema.safeParse(newUser);
  if (!safeData.success) return safeData.error.errors;
  const formData = new FormData();
  for (const name in safeData.data) {
    console.log(name, safeData.data[name]);
    formData.append(name, safeData.data[name]);
  }
  console.log(formData);
  try {
    const newUser = await fetch(
      process.env.API_BASE_URL + "admin/create/user",
      {
        method: "POST",
        body: formData,
      }
    );
    const user = await newUser.json();
    console.log(user);
    if (newUser.status === 400) throw new Error(user.message);
    if (newUser.status === 401) throw new Error(user.message);
    return user;
  } catch (error) {
    let err;
    if (error.message.split("") == "password") {
      err = new Error("Password not strong enougth");
    }
    if (error.message.split("") == "email") {
      err = new Error("Email already exists");
    }
    throw err;
  }
};
