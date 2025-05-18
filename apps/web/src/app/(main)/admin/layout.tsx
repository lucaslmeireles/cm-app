
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Dashboard - Admin",
  description: "Veja as informações da sua organização",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

        {children}

    </>
  );
}