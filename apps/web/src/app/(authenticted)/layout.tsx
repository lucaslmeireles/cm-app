import { Sidebar } from "@/components/organisms/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="w-full">{children}</main>
      </body>
    </html>
  )
}