"use server";

import { auth } from "@/auth";


export const getUser = async () => {
  const session = await auth();
  if (!session) return null;
  return session["user"];
};
