import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { DepartmentItem } from "../molecules/DepartmentItem";
import { Department } from "@/types/department.type";
import { AddDepartment } from "../department/addDepartment";

interface DepartmentCardProps {
  department: Department[]
}

export const DepartmentCard = ({ department }: ) => {
  const t = await getTranslations("Department");

  if (!department || department.length === 0) {
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
        {
          department.slice(0, 4).map((dep) => {
            return (
              <DepartmentItem key={dep.id} department={dep} t={t} />
            );
          }
          )
        }
        <Button size="sm" className="mt-2 w-4/12">
          <Link href={"/departments"}>{t("see_more")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
