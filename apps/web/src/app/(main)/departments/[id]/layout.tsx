import { fetchDepartmentById } from "@/fetch/department/fetchDepartmentById";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const department = await fetchDepartmentById(id);
  
  if (!department) return {title: "404"}

  return {
    title: department.name,
  };
}

export default function DepartmentIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
