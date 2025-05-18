import { fetchEmployeeById } from "@/fetch/employee/fetchmployeeById";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const t = await getTranslations("Assessment")
  
  const id = params.id;

  // fetch data
  const employee = await fetchEmployeeById(id);

  return {
    title: t("page_title", {name: employee.name}),
  };
}

export default function EmployeeIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
