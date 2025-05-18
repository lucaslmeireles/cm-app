import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Department } from "@/types/department.type";
import { Plus, UsersRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AddDepartment } from "./addDepartment";

export const DepartmentCard = async ({}) => {
  const t = await getTranslations("Department");
  const department: Department[] = await fetchDepartments();

  if (!department) {
    return (
      <Card className="min-w-56 w-72 max-w-96">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p>{t("no_data")}</p>
          <AddDepartment />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {department.length > 0 ? (
          department.slice(0, 4).map((dep) => {
            return (
              <Card className="border" key={dep.id}>
                <div className="m-2 flex flex-row space-x-3 justify-between">
                  <h3 className="font-medium mx-3">{dep.name} </h3>
                  {dep._count && (
                    <div className="flex flex-row space-x-1">
                      <p>
                        {dep._count.employees
                          ? dep._count.employees
                          : t("no_employees")}
                      </p>
                      <UsersRound />
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <p>{t("no_data")}</p>
        )}
        <Button size="sm" className="mt-2 w-4/12">
          <Link href={"/departments"}>{t("see_more")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
