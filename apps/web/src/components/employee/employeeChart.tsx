"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/repo/ui/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/repo/ui/components/ui/select";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { DepartmentChartType } from "@/types/chart.type";
import { fetchEmployeeChart } from "@/fetch/org/fetchChartEmployee";
import { Employee } from "@/types/employee.type";
import { fetchEmployees } from "@/fetch/employee/fetchEmployees";
import { Progress } from "@/repo/ui/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/repo/ui/components/ui/popover";
import { Button } from "@/repo/ui/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/repo/ui/components/ui/command";
import { cn } from "@/repo/ui/lib/utils";
import RadarChartLoader from "../loaders/radarChartLoader";

export const EmployeeChart = ({ employee }: { employee?: Employee }) => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [chartData, setChartData] = useState<DepartmentChartType[]>();

  useEffect(() => {
    const getData = async () => {
      if (!employee) {
        const employees: Employee[] = await fetchEmployees();
        setEmployees(employees);
      } else {
        setValue(employee.id);
      }
      setLoading(false);
      setChartLoading(false);
    };
    getData();
  }, [employee]);

  useEffect(() => {
    const getData = async () => {
      if (!value) return;
      const chartData = await fetchEmployeeChart(value);
      setChartData(chartData);
    };
    getData();
  }, [value]);

  const chartConfig = {
    employee_name: {
      label: "Nome",
      color: "#3b58d8",
    },
  } satisfies ChartConfig;
  console.log(chartData);
  return loading ? (
    <RadarChartLoader/>
  ) : (
    <>
      <div className="flex flex-col gap-2">
      {!employee && (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? employees.find((employee) => employee.id === value)?.name
              : "Select employee..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Search employee..." />
            <CommandList>
              <CommandEmpty>No employee found.</CommandEmpty>
              <CommandGroup>
                {employees.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    value={employee.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === employee.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {employee.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        </Popover>
      )}
      <Card>
        <CardHeader>
          {employee && (
            <h2 className="text-xl font-bold">Desempenho de {employee.name}</h2>
          )}
        </CardHeader>
        <CardContent className="pb-0">
          {chartData && chartData.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[700] min-h-[500px] w-full"
            >
              <RadarChart data={chartData}>
              <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="text-wrap w-fit" />}
                />
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

      
      </div>

      {!employee && chartData && chartData?.length > 0 && <Card>
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
    </>
  );
};
