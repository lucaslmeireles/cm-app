"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/repo/ui/components/ui/chart";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
import { Department } from "@/types/department.type";
import { fetchAbsenceChartByDepartment } from "@/fetch/absence/fetchAbsenceChartByDepartment";
import { useTranslations } from "next-intl";
import { getRandomColorRGB } from "@/helpers/randomColor";
export default function AbsenceChartByDepartment({department, type}: {department: Department, type: "month" | "year"}) {
    const t  = useTranslations("Absence")
    const [chartData, setChartData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [color, setColor] = useState("#000")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAbsenceChartByDepartment(department.id, type)
                setChartData(data.data)
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
        setColor(getRandomColorRGB())
    }, [department, type])

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
                    Faltas por {type == "month" ? t("month") : t("year")} 
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
                            dataKey={"absence_date"}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="total_absences" name={t("name")} fill={color} radius={8}>
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