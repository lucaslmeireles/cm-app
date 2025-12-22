import { fetchDepOrgInfo } from "@/fetch/department/fetchDepInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { CalendarClock, Clock4, Users2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const DepInfoCard = async () => {
  const { info, employeeData, employeeAge } = await fetchDepOrgInfo();
  const t = await getTranslations("Dashboard.info");
  if (!info) {
    return (
      <Card className="pb-5">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
          <CardContent>
            <div className="mt-3 pb-2 flex flex-col gap-1">
              <p className="flex items-center gap-2 font-medium">
                {t("no_data")}
              </p>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="pb-5">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        <CardContent>
          {info && (
            <div className="mt-3 pb-2 flex flex-col gap-1">
              <p className="flex items-center gap-2 font-medium">
                {t("employee_title")} <Users2 size={18} />
              </p>
              <p>{t("employees", { number: info[0]._count.employees })}</p>
              <p className="flex items-center gap-2 font-medium">
                {t("avg_age_title")} <CalendarClock size={18} />
              </p>
              <p>{t("avg_age", { number: employeeAge[0].avgbirthdayage })}</p>
              <p className="flex items-center gap-2 font-medium">
                {t("avg_time_title")}
                <Clock4 size={18} />
              </p>
              <p>{t("avg_time", { number: employeeAge[0].avgentrydateage })}</p>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
