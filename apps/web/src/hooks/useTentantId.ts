"use server";

import { auth } from "@/auth";

export const getTentantId = async () => {
  const session = await auth();
  if (!session) return null;
  return session.user.tenant_id;
};
