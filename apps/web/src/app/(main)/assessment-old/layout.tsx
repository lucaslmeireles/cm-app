import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params


  return {
    title: "Avaliações",
  };
}

export default function EmployeeIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
