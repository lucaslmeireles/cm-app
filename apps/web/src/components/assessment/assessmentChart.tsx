"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Employee } from "@/types/employee.type";
import { Progress } from "@/repo/ui/components/ui/progress";
import useSWR from "swr";
import { fetchAssessmentsByEmployee } from "@/fetch/assessment/fetchAssessmentsByEmployee";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function transformAssessments(assessments) {
    const result = [];

    assessments.forEach(assessment => {
        assessment.metrics.forEach(metric => {
            // Verificar se o nome da métrica já existe no resultado
            let existingMetric = result.find(item => item.name === metric.metric.name);
            
            // Se não existir, criar um novo objeto para essa métrica
            if (!existingMetric) {
                existingMetric = {
                    name: metric.metric.name,
                    [assessment.createdAt]: metric.score // Adiciona a pontuação com a data como chave
                };
                result.push(existingMetric);
            } else {
                // Se já existir, apenas adicionar a nova pontuação
                existingMetric[assessment.createdAt] = metric.score;
            }
        });
    });

    return result;
}

export const AssessmentChart = ({ employee }: { employee?: Employee }) => {
  const {
    data: chartData,
    isLoading,
    error,
  } = useSWR({ url: '/api/assessments/chart', args: employee?.id }, fetchAssessmentsByEmployee);

  const chartConfig = {
    name: {
      label: "Nome",
      color: "#f73808",
    },
  } satisfies ChartConfig;

  return isLoading ? (
    <>Carregando...</>
  ) : (
    <>
      <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>     
           <h2 className="text-xl font-bold"> Histórico de avaliações de {employee.name}</h2>
        </CardHeader>
        <CardContent className="pb-0">
          {chartData && chartData.length > 0 ? (
            <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[700] min-h-[500px] w-full"
            >
              <RadarChart data={transformAssessments(chartData)}>
              <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="text-wrap w-fit" />}
                />
                <PolarAngleAxis dataKey="name" />
                <PolarGrid />
                {chartData.map(assessment => {
                    return (<Radar
                    key={assessment.id}
                    dataKey={assessment.createdAt}
                    name={format(assessment.createdAt, "PP", { locale: ptBR })}
                    fill={"#" + Math.floor(Math.random()*16777215).toString(16)}
                    fillOpacity={0.6}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />)
                }) }
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
