import { fetchAbsenceByEmployeeId } from "@/fetch/absence/getAbsenceByEmployeeId";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/repo/ui/components/ui/tooltip";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/repo/ui/components/ui/carousel";
import { Employee } from "@/types/employee.type";
import useSWR from "swr";
import AbsenceChartByEmployee from "./absenceEmployeeChart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeftFromLine, ArrowRightCircle, Calendar } from "lucide-react";
import { AddAbsence } from "./addAbsence";
import Link from "next/link";

export default function AbsenceCard({ employee }: { employee: Employee }) {
    const {
        data: absences,
        isLoading,
        error,
        mutate,
    } = useSWR(
        { name: `api/absence/${employee.id}`, args: employee.id },
        fetchAbsenceByEmployeeId,
    );

    return isLoading ? (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-[250px]" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-[300px]" />
                </CardDescription>
            </CardHeader>
        </Card>
    ) : (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <p className="font-medium text-lg">Faltas</p>
                <AddAbsence employee_id={employee.id} mutate={mutate} />
            </CardHeader>
            {absences.data && (
                <CardContent>
                    <p className="text-lg">Quantidade de faltas</p>
                    <div className="flex flex-row space-x-6 align-bottom w-4/5 pb-4">
                        <p className="text-2xl">{absences.data.count}</p>
                        <p>
                            {absences.data.justifi._count}{" "}
                            <small>Justificadas</small>
                        </p>
                        <p>
                            {absences.data.no_justifi._count}{" "}
                            <small>Não justificadas</small>
                        </p>
                    </div>
                    <p>Gráficos</p>
                    <Carousel className=" m-auto w-10/12 my-3">
                        <CarouselContent>
                            <CarouselItem>
                                <AbsenceChartByEmployee
                                    employee={employee}
                                    type="month"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <AbsenceChartByEmployee
                                    employee={employee}
                                    type="year"
                                />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <h2>Ultimas faltas</h2>
                    <div className="grid grid-cols-6 w-full gap-3 my-3">
                        {absences.data &&
                            absences.data.absences
                                .slice(0, 4)
                                .map((absence) => {
                                    return (
                                        <Card
                                            key={absence.id}
                                            className="w-full"
                                        >
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <CardContent className="py-2">
                                                        <div>
                                                            <TooltipTrigger className="flex flex-row justify-between">
                                                                <div className="flex flex-col w-3/4">
                                                                    <p>
                                                                        {format(
                                                                            absence.date,
                                                                            "PPP",
                                                                            {
                                                                                locale: ptBR,
                                                                            },
                                                                        )}
                                                                    </p>
                                                                    <p className="text-sm text-wrap overflow-clip h-5 text-zinc-700">
                                                                        {absence.justification
                                                                            ? absence.justification
                                                                            : "Sem justificativa"}
                                                                    </p>
                                                                </div>
                                                                <Calendar className="h-6 w-6" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-sm h-5 text-zinc-700">
                                                                    {absence.justification
                                                                        ? absence.justification
                                                                        : "Sem justificativa"}
                                                                </p>
                                                            </TooltipContent>
                                                        </div>
                                                    </CardContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Card>
                                    );
                                })}
                        <Link
                            href={`/absences/${employee.id}`}
                            className="w-full"
                        >
                            <Card>
                                <CardContent className="py-2">
                                    <div className="flex flex-row justify-between">
                                        <p>Veja Mais</p>
                                        <ArrowRightCircle />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
