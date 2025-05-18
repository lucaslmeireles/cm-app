import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent} from "@/repo/ui/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import useSWR from "swr";
import { fetchDiscByDep } from "@/fetch/assessment/disc/fetchDiscByDep";

export const DiscChartDep = ({ dep }: { dep?: string }) => {
  const {
        data: chartData,
        isLoading,
        error } = useSWR({name: "disc", args: dep}, fetchDiscByDep)
    
    const chartConfig = {
      employee_name: {
        label: "Nome",
        color: "#f73808",
      },
    } satisfies ChartConfig;

    console.log(chartData)
    return (
      <>
        <div className="flex flex-col gap-2">
        <Card>
          <CardHeader>     
             <h2 className="text-xl font-bold">DISC do departamento</h2>
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