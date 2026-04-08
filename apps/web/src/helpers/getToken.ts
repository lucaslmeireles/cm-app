"use server";

import { auth } from "@/auth";
import { refreshToken } from "@/fetch/auth/fetchRefreshToken";

export const getToken = async () => {
  const session = await auth();
  if (!session) return null;
  return session["accessToken"];
};
