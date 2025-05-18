import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const checkConfig = async () => {
  const user = await auth();
  console.log(user);
  if (!user) {
    redirect("/auth/login");
  }
  const configs = await fetch(process.env.API_BASE_URL + "user/status", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const data = await configs.json();
  console.log(data);
  if (data.isActive && !data.isOrgConifured) {
    redirect("/setup/organization");
  }
  if (!data.isActive && data.isOrgConifured) {
    redirect("/setup/user/" + user.user.tokenInvite);
  }

  if (user.user?.role === "TI") {
    redirect("/admin");
  }

  return null;
};
