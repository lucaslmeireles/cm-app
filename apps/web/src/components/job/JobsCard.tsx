import { fetchJobs } from "@/fetch/job/fetchJobs";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const CardForJob = ({
  name,
  employees,
  count,
  type = "white",
  large = true,
  id,
}) => {
  const t = useTranslations("Dashboard.jobs");
  const text = employees.length > 0 ? employees[0].name : t("no_employee");
  const andMore =
    employees.length > 1
      ? t("n_employee", { count: employees.length - 1 })
      : "";
  return (
    <Card
      className={`border flex ${large ? "w-full" : "w-5/12"} flex-col gap-4`}
      key={id}
    >
      <Link href={`/job/${id}`}>
        <div className="m-2 flex flex-row gap-4">
          <div className={`${large ? "" : "p-3"}`}>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm">
              {text} {andMore}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export async function JobsCard() {
  const data = await fetchJobs();
  const t = await getTranslations("Dashboard.jobs");

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle className="flex space-x-2">
          <BriefcaseBusiness className="mr-2" /> {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data.length > 0 ? (
          data.slice(0, 3).map((job) => {
            return (
              <CardForJob
                key={job.id}
                name={job.name}
                employees={job.employees}
                count={job._count}
                id={job.id}
              />
            );
          })
        ) : (
          <p>{t("any_jobs")}</p>
        )}
        <Button size="sm" className="mt-2 w-4/12">
          <Link href={"/job"}>{t("see_more")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
