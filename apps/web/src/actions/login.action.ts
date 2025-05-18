"use server";

import { signIn } from "@/auth";

export const signInCredentials = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: '/dashboard',
  });
  return res
};
