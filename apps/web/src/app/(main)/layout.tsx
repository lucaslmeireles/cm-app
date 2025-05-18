import { Header } from "@/components/Header";
import { Toaster } from "@/repo/ui/components/ui/toaster";
import useRoleStore from "@/store/role.store";
import type { Metadata } from "next";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main>
                <Header />
                {children}
            </main>
            <Toaster />
        </>
    );
}
