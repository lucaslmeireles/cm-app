"use client";
import { Button } from "@/repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AssessmentItem } from "../molecules/AssessmentItem";


export const AssessmentsCard = ({ employee }: { employee: Employee }) => {
  const t = useTranslations("Employee.View")
  return (
    <Card>
      <CardHeader>
        <div className=" flex flex-row gap-4 px-3 space-x-2 align-middle items-center justify-between">
          <p className="font-medium text-lg"> {t("assessment")}</p>
          <div className=" space-x-2">
            <Button variant="default" className="w-fit">
              <Link
                href={"/assessment/" + employee.id}
                className="flex flex-row align-middle items-center"
              >
                {t("add_assessments")}
                <PlusCircle className="ml-2" />
              </Link>
            </Button>
            <Button variant="default" className="w-fit">
              <Link
                href={"/assessment/disc/" + employee.id}
                className="flex flex-row align-middle items-center"
              >
                DISC
                <PlusCircle className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 ml-5">
        {employee?.assessments?.length ?? 0 > 0 ? (
          employee.assessments.map((assessment) => (
            <AssessmentItem key={assessment.id} assessment={assessment} large />
          ))
        ) : (
          <p>{t("no_assessments")}</p>
        )}
      </CardContent>
    </Card>
  );
}
