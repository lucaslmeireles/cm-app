import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Assessment } from "@/types/assesement.type";
import { fetchAssessments } from "@/fetch/assessment/fetchAssessments";
import { AssessmentCard } from "@/components/assessment/assessmentCard";
import { getTranslations } from "next-intl/server";
import { DeleteAssessment } from "@/components/assessment/deleteAssessment";

export default async function ViewAllAssessments() {
  const t = await getTranslations("Assessment")
  const assessments: Assessment[] = await fetchAssessments();
  return (
    <Card className="border-none	shadow-none	">
      <CardHeader>
        <CardTitle className="flex flex-row gap-2  justify-between place-items-center">
          <p>{t("title")}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assessments.length > 0 && assessments.map((assessment) => {
          return (
            <>
              <div className="flex">
                <p className="text-black  text-lg font-semibold">
                  {assessment.employee.name}
                </p>
                <DeleteAssessment assesement={assessment} />
              </div>
              <AssessmentCard assessment={assessment} view key={assessment.id} />
            </>
          );
        })}
      </CardContent>
    </Card>
  );
}
