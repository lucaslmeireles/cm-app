"use client"

import { Employee } from "@/types/employee.type";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/repo/ui/components/ui/chart";
import { useEffect, useState } from "react";
import { fetchAbsenceChartByEmployee } from "@/fetch/absence/fetchAbsenceChartByEmployee";
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
export default function AbsenceChartByEmployee({employee, type}: {employee: Employee, type: "month" | "year"}) {
    const [chartData, setChartData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAbsenceChartByEmployee(employee.id, type)
                setChartData(data.data)
                setIsLoading(false)
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [employee])

    const chartConfig = {
        qtd: {
          label: "Quantidade",
          color: "hsl(var(--chart-1))",
        },
      } satisfies ChartConfig

    return  isLoading ? (
        <div className="h-[400px] flex flex-col justify-end space-y-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-end space-x-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className={`w-full h-${Math.floor(Math.random() * 20 + 10)}`} />
          </div>
        ))}
        <Skeleton className="h-4 w-full mt-4" />
      </div>
    ) : (
        <Card className="min-w-60 w-11/12">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Faltas por {type}
                </CardTitle>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                            top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey={type == "month" ? "mth" : "yr"}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="qtd" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                            </Bar>
                        </BarChart>
                        </ChartContainer>
            </CardContent>
        </Card>
    )
}