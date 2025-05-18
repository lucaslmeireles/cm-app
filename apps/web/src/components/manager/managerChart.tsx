"use client"
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/repo/ui/components/ui/chart";
import { Department } from "@/types/department.type";
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/repo/ui/components/ui/select";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { DepartmentChartType } from "@/types/chart.type";
import { fetchEmployeeChart } from "@/fetch/org/fetchChartEmployee";
import { Employee } from "@/types/employee.type";
import { fetchEmployees } from "@/fetch/employee/fetchEmployees";
import { fetchManagers } from "@/fetch/managers/fetchManagers";
import { Manager } from "@/types/manager.type";
import { fetchManagerChart } from "@/fetch/org/fetchChartManager";

export const ManagerChart = ({employee} : {employee?:string}) => {
  const [managers, setManagers] = useState<Manager[]>();
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string>();
  const [chartData, setChartData] = useState<DepartmentChartType[]>();

  useEffect(() => {
    const getData = async () => {
      if (!employee) {
        const managers: Manager[] = await fetchManagers();
        setManagers(managers);
      } else {
        setEmployeeId(employee);
      }
      setLoading(false);
      setChartLoading(false);
    }
    getData()
  },[employee])

  useEffect(() => {
    const getData = async () => {
      if (!employeeId) return;
      const chartData = await fetchManagerChart(employeeId);
      setChartData(chartData);
    }
    getData()
  }, [employeeId])
  
  
  const chartConfig = {
    employee_name: {
      label: "Nome",
      color: "#3b58d8",
    },
  } satisfies ChartConfig

  return loading ? <>Carregando...</> : (
    <>
    <Card>
    <CardContent className="pb-0">
    {chartData && chartData.length > 0 ? (
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
    ) : (
      <div className="aspect-square max-h-[700px] min-h-[500px]">
        <p className="m-auto text-center align-middle">Não há dados</p>
      </div>
    )}
      </CardContent>
    </Card>
    {!employee && <Select onValueChange={(e) => setEmployeeId(e)}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o funcionário"></SelectValue>
      </SelectTrigger>
      <SelectContent >
      {!employee && managers.map((managers) => (
          <SelectItem key={managers.user_id} value={managers.user_id}>
            {managers.employee.name}
          </SelectItem>

        ))}
      </SelectContent>
    </Select>}
    </>
  );
};
