"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";

import { Pie, PieChart } from "recharts";

export default function DashChart() {
  const chartData = [
    { type: "whitecolor", n_employees: 15, fill: "#4c577e" },
    { type: "bluecolor", n_employees: 60, fill: "#243881" },
  ];

  const chartConfig = {
    type: {
      label: "Type of job",
    },
    whitecolor: {
      label: "White Color",
      color: "#4c577e",
    },
    bluecolor: {
      label: "Blue Color",
      color: "#243881",
    },
  } satisfies ChartConfig;
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square min-h-[150px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="n_employees"
            nameKey="type"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
