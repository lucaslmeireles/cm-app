import { Button } from "@/repo/ui/components/ui/button";
import { Card } from "@/repo/ui/components/ui/card";
import { Assessment } from "@/types/assesement.type";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MetricItem } from "./MetricItem";

interface AssessmentItemProps {
  assessment: Assessment,
  large: boolean
}

export const AssessmentItem = ({ assessment, large }: AssessmentItemProps) => {
  const [see, setSee] = useState(false);
  const t = useTranslations("Employee.View")
  return (
    <Card key={assessment.id} className={`${large ? "w-2/6" : "w-3/12"} my-4`}>
      <div className="flex flex-row p-2">
        <h4 className="text-slate-900 font-medium text-lg">
          {t("created_by", { name: assessment.evaluator.name, date: new Date(assessment.created_at).toLocaleDateString("pt-BR") })}
        </h4>
        <Button onClick={() => setSee(!see)} variant="ghost">
          {see ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {see && (
        <div className="flex-col mt-2 border p-2 rounded gap-3">
          {assessment.metrics.map((metric) => {
            return (
              <MetricItem key={metric.metric.name} name={metric.metric.name} score={metric.score} />
            );
          })}
        </div>
      )}
    </Card>
  );
}