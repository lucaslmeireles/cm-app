import { Button } from "@/repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AssessmentCard } from "./AssessmentCard";
import { Text } from "../atoms/Text";
import { Employee } from "@/types/employee.type";

interface AssessmentsCardProps {
  employee: Employee;
}

export const AssessmentsCard = ({ employee }: AssessmentsCardProps) => {
  const t = useTranslations("Employee.View");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row gap-4 px-3 space-x-2 items-center justify-between">
          <Text variant="h4" weight="medium">
            {t("assessment")}
          </Text>
          <div className="space-x-2">
            <Button variant="default" className="w-fit">
              <Link
                href={"/assessment/" + employee.id}
                className="flex flex-row items-center"
              >
                {t("add_assessments")}
                <PlusCircle className="ml-2" size={16} />
              </Link>
            </Button>
            <Button variant="default" className="w-fit">
              <Link
                href={"/assessment/disc/" + employee.id}
                className="flex flex-row items-center"
              >
                DISC
                <PlusCircle className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 space-y-4">
        {employee?.assessments?.length > 0 ? (
          employee.assessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))
        ) : (
          <div className="text-center py-8">
            <Text variant="body" color="muted">
              {t("no_assessments")}
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
