import { useState } from "react";
import { Card } from "@/repo/ui/components/ui/card";
import { CollapsibleHeader } from "../molecules/CollapsibleHeader";
import { MetricItem } from "../molecules/MetricItem";
import { Text } from "../atoms/Text";

interface Assessment {
  id: string;
  createdAt: string;
  manager?: {
    employee: {
      name: string;
    };
  };
  metrics: Array<{
    score: number;
    metric: {
      name: string;
      type: string;
    };
  }>;
}

interface AssessmentCardProps {
  assessment: Assessment;
  view?: boolean;
}

export const AssessmentCard = ({
  assessment,
  view = false,
}: AssessmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = `Avaliação por ${assessment.manager.employee.name}`;
  const subtitle = new Date(assessment.createdAt).toLocaleDateString("pt-BR");

  return (
    <Card className={`${view ? "w-2/6" : "w-full"} my-4`}>
      <CollapsibleHeader
        title={title}
        subtitle={subtitle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="p-4 space-y-3">
          {assessment.metrics.length > 0 ? (
            assessment.metrics.map((metric, index) => (
              <MetricItem
                key={index}
                name={metric.metric.name}
                type={metric.metric.type}
                score={metric.score}
              />
            ))
          ) : (
            <Text variant="caption" color="muted">
              Nenhuma métrica encontrada
            </Text>
          )}
        </div>
      )}
    </Card>
  );
};
