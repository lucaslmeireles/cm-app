"use client";
import { Button } from "@/repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export const AssessmentCard = ({ assessment, view = false }) => {
  const [see, setSee] = useState(false);
  const t = useTranslations("Employee.View")
  return (
    <Card key={assessment.id} className={`${view ? "w-2/6" : "w-3/12"} my-4`}>
      <div className="p-2">
        <div className="flex flex-row">
          <h4 className="text-slate-900 font-medium text-lg">
            {t("created_by", {name: assessment.manager.employee.name, date: new Date(assessment.createdAt).toLocaleDateString("pt-BR")})}
          </h4>
          <Button onClick={() => setSee(!see)} variant="ghost">
            {see ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {see && (
          <div className="flex-col mt-2 border p-2 rounded gap-3">
            {assessment.metrics.map((metric) => {
              return (
                <>
                  <p className="text-base font-medium">{metric.metric.name}</p>
                  <p className="text-slate-700 text-sm">{metric.metric.type}</p>
                  <p className="text-lg font-medium">{metric.score}</p>
                </>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

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
        {employee?.assessments?.length > 0 ? (
          employee.assessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))
        ) : (
          <p>{t("no_assessments")}</p>
        )}
      </CardContent>
    </Card>
  );
};
