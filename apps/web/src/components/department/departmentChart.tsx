"use client"
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/repo/ui/components/ui/chart";
import { Department } from "@/types/department.type";
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/repo/ui/components/ui/select";
import { fetchDepartmentChart } from "@/fetch/org/fetchChartDepartment";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { DepartmentChartType } from "@/types/chart.type";
import { Progress } from "@/repo/ui/components/ui/progress";
import { fetchDiscByDep } from "@/fetch/assessment/disc/fetchDiscByDep";
import { DiscChartDep } from "./discChartDep";

export const DepartmentChart = () => {
  const [departments, setDepartments] = useState<Department[]>();
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [departmentId, setDepartmentId] = useState<string>();
  const [chartData, setChartData] = useState<DepartmentChartType[]>();

  useEffect(() => {
    const getData = async () => {
      const departments: Department[] = await fetchDepartments();
      setDepartments(departments);
      
      setLoading(false);
      setChartLoading(false);
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      if (!departmentId) return;
      const chartData = await fetchDepartmentChart(departmentId);
      setChartData(chartData);
      const depChart = await fetchDiscByDep(departmentId)
    }
    getData()
  }, [departmentId])
  
  
  const chartConfig = {
    department_name: {
      label: "Departmento",
      color: "#3b58d8",
    },
  } satisfies ChartConfig

  return loading ? <>Carregando...</> : (
    <>
    <div className="flex flex-col gap-2">
    <Card>
    <CardContent className="pb-0">
    {chartData && chartData.length > 0 ? (
      <>
      <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[700px] min-h-[500px] w-full"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric_name" />
        <PolarGrid />
        <Radar
          dataKey="avg"
          fill="#3b58d8"
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
    {departments?.length > 0 && 
    (<Select onValueChange={(e) => setDepartmentId(e)}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o departmento"></SelectValue>
      </SelectTrigger>
      <SelectContent >
      {departments.map((department) => (
          <SelectItem key={department.id} value={department.id}>
            {department.name}
          </SelectItem>

        ))}
      </SelectContent>
    </Select>)}

    </div>


      {chartData?.length > 0 && <Card>
        <CardHeader>
          <CardTitle>Suas principais metricas</CardTitle>
        </CardHeader>

        <CardContent className=" flex flex-col mt-4">
            <h2 className="text-lg font-semibold">Metricas a melhoras</h2>
            {chartData?.length > 0 && (
              chartData?.slice(0,3).map(metric => {
                return  (
                  <div key={metric.metric_name} className="my-1">
                 <p>{metric.metric_name}</p>
                    <Progress value={metric.avg}/>
                 </div>
                )
              })
            )}

          <h2 className="text-lg font-semibold mt-4">Metricas a manter</h2>
            {chartData?.length > 0 && (
              chartData?.slice(chartData.length - 4,chartData.length -1 ).map(metric => {
                return  (
                  <div key={metric.metric_name} className="my-1">
                  <p>{metric.metric_name}</p>
                  <Progress value={metric.avg}/>
                  </div>
                )
              })
            )}
        </CardContent>
      </Card>}
      <DiscChartDep dep={departmentId}/>
    </>
  );
};
