"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";

export function RadarChartDash({chartData, chartConfig}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square min-h-[450px] max-h-[400px]"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="cat" />
        <PolarGrid />
        {Object.keys(chartConfig).map((key) => (
          <Radar
          key={key}
          name={chartConfig[key].label}
          dataKey={key}
          stroke={chartConfig.key.color}
          fill={chartConfig.key.color}
          fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ChartContainer>
  );
}
