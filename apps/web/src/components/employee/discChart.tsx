import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Employee } from "@/types/employee.type";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


export const DiscChart = ({ employee }: { employee?: Employee }) => {
  const chartData = [];

    for (let key in employee?.disc) {
    if (key !== "id" && key !== "employee_id" && key !== "employee" && key !== "lastUpdatedAt") {
        chartData.push({ name: key, score: employee?.disc[key] });
    }
    }
  const chartConfig = {
    employee_name: {
      label: "Nome",
      color: "#f73808",
    },
  } satisfies ChartConfig;
  return (
    <>
      <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>     
           <h2 className="text-xl font-bold">DISC de {employee.name}</h2>
        </CardHeader>
        <CardContent className="pb-0">
          {chartData && chartData.length > 0 ? (
            <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[700] min-h-[500px] w-full"
            >
              <RadarChart data={chartData}>
              <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="text-wrap w-fit" />}
                />
                <PolarAngleAxis dataKey="name" />
                <PolarGrid />
                <Radar
                  dataKey="score"
                  fill="#e44f0b"
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
            <p className="text-right text-sm my-2">Ultima atualização: <strong>{format(employee?.disc.lastUpdatedAt, "PPP", { locale: ptBR })}</strong></p>
            </>
          ) : (
            <div className="aspect-square max-h-[700px] min-h-[500px]">
              <p className="m-auto text-center align-middle">Não há dados</p>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </>
  );
};
