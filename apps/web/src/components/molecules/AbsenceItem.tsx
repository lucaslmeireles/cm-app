import { Calendar } from "@/repo/ui/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/repo/ui/components/ui/tooltip";
import { LocalDate } from "../atoms/LocalDate";

type AbsenceItem = {
  id: string;
  date: string;
  justification?: string;
};

export const AbsenceItem = ({ absence }: { absence: AbsenceItem }) => {
  return (
    <Card key={absence.id} className="w-full">
      <TooltipProvider>
        <Tooltip>
          <CardContent className="py-2">
            <div>
              <TooltipTrigger className="flex flex-row justify-between">
                <div className="flex flex-col w-3/4">
                  <p>
                    <LocalDate>{absence.date}</LocalDate>
                  </p>
                </div>
                <Calendar className="h-6 w-6" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm h-5 text-zinc-700">
                  {absence.justification
                    ? absence.justification
                    : "Sem justificativa"}
                </p>
              </TooltipContent>
            </div>
          </CardContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
};
