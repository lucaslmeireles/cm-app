"use client";
import { fetchEmployeesByDepartment } from "@/fetch/org/fetchEmployeesByDepartment";
import { getRandomColorRGB } from "@/helpers/randomColor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";
import { get } from "http";
import { Pie, PieChart } from "recharts";
import useSWR from "swr";

export function EmployeeCountChart() {
  const {
    data: chartData,
    isLoading,
    error,
  } = useSWR("org/chart/employees", fetchEmployeesByDepartment);

  const data = chartData.map((item) => {
    return {
      ...item,
      fill: getRandomColorRGB(),
    };
  });
  const chartConfig = {
    count: {
      label: "Count",
    },
  } satisfies ChartConfig;

  if (isLoading) return <div>Loading...</div>;
  if (chartData) console.log(chartData);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="count" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
