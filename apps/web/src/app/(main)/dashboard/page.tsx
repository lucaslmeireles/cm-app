import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Pagina principal",
};

export default async function Home() {
  const t = await getTranslations("Dashboard");
  const session = await auth();
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>{t("welcome", { user: session?.user?.name })}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
