import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";

interface MetricItemProps {
  name: string;
  type?: string;
  score: number;
}

export const MetricItem = ({ name, type, score }: MetricItemProps) => {
  const getScoreVariant = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg bg-slate-50 dark:bg-slate-900">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Text variant="body" weight="medium">
            {name}
          </Text>
          {type && <Text variant="caption" color="secondary">
            {type}
          </Text>}
        </div>
        <Badge variant={getScoreVariant(score)} size="sm">
          {score}
        </Badge>
      </div>
    </div>
  );
};
