import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  redirect("/dashboard");
  return <p>Redirecting...</p>;
};

export default Page;