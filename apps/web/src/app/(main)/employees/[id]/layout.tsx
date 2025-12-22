import { fetchEmployeeById } from "@/fetch/employee/fetchmployeeById";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const employee = await fetchEmployeeById(id);

  if (!employee) return {title: "404"}
  return {
    title: employee.name,
  };
}

export default function EmployeeIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
