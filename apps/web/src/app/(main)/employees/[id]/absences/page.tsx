"use client";

import { Button } from "@/repo/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Badge } from "@/repo/ui/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/repo/ui/components/ui/tabs";
import {
    Calendar,
    ChevronLeft,
    Download,
    Filter,
    Plus,
    Search,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/repo/ui/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/repo/ui/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/repo/ui/components/ui/table";
import { AddAbsenceForm } from "@/components/absence/addAbsence";
import useSWR, { mutate } from "swr";
import { fetchAbsenceByEmployeeId } from "@/fetch/absence/getAbsenceByEmployeeId";
import { cn } from "@/repo/ui/lib/utils";
import { AbsenceContextMenu } from "@/components/absence/absenceContextMenu";
import { patchAbsenceById } from "@/fetch/absence/patchAbsenceById";

type Absence = {
    id: string;
    aprover_id: string;
    employee_id: string;
    start_date: string;
    end_date: string;
    status: string;
    type: string;
    approver: {
        id: string;
        name: string;
        profile_pic: string;
    };
};

export default function AbsencePage({ params }: { params: { id: string } }) {
    const {
        data: absences,
        isLoading,
        error,
    }: {
        data: Absence[];
        isLoading: boolean;
        error: any;
    } = useSWR(
        { name: `api/absence/${params.id}`, args: params.id },
        fetchAbsenceByEmployeeId,
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Erro ao carregar dados.</p>
            </div>
        );
    }

    const onStatusChange = async (absence, id, status) => {
        console.log("Status changed", absence, id, status);
        try {
            await patchAbsenceById(
                {
                    ...absence,
                    start_date: new Date(absence.start_date),
                    end_date: new Date(absence.end_date),
                    status: status,
                },
                id,
            );
            mutate(`api/absence/${params.id}`);
        } catch (e) {
            console.error("Error updating absence:", e);
        }
    };

    return (
        <main className="space-y-4 mx-5 mt-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href={`/employees/${params.id}`}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold">
                        Gerenciamento de Ausências
                    </h1>
                </div>
                <AddAbsenceForm employeeId={params.id} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Summary */}
                <div className="space-y-4">
                    {/* TODO SEPARAR EM COMPONENTE */}
                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Resumo de Ausências
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Férias disponíveis
                                    </span>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        20 dias _ TODO
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Férias utilizadas
                                    </span>
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        10 dias
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Faltas justificadas
                                    </span>
                                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                        {absences
                                            .filter(
                                                (absence) =>
                                                    absence.type ===
                                                        "SICK_LEAVE" &&
                                                    absence.status ===
                                                        "Aprovada",
                                            )
                                            .reduce((acc, absence) => {
                                                const startDate = new Date(
                                                    absence.start_date,
                                                );
                                                const endDate = new Date(
                                                    absence.end_date,
                                                );
                                                const diffDays =
                                                    Math.ceil(
                                                        (endDate.getTime() -
                                                            startDate.getTime()) /
                                                            (1000 * 3600 * 24),
                                                    ) + 1;
                                                return acc + diffDays;
                                            }, 0)}{" "}
                                        dias
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Faltas não justificadas
                                    </span>
                                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                        {absences
                                            .filter(
                                                (absence) =>
                                                    (absence.type ===
                                                        "UNPAID_LEAVE" ||
                                                        absence.type ===
                                                            "OTHER") &&
                                                    absence.status ===
                                                        "Aprovada",
                                            )
                                            .reduce((acc, absence) => {
                                                const startDate = new Date(
                                                    absence.start_date,
                                                );
                                                const endDate = new Date(
                                                    absence.end_date,
                                                );
                                                const diffDays =
                                                    Math.ceil(
                                                        (endDate.getTime() -
                                                            startDate.getTime()) /
                                                            (1000 * 3600 * 24),
                                                    ) + 1;
                                                return acc + diffDays;
                                            }, 0)}{" "}
                                        dias
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Absence List */}
                <div className="lg:col-span-2 space-y-4">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="w-full border-b grid grid-cols-4 rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="all"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Todas
                            </TabsTrigger>
                            <TabsTrigger
                                value="approved"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Aprovadas
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Pendentes
                            </TabsTrigger>
                            <TabsTrigger
                                value="planned"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Planejadas
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Histórico de Ausências
                                        </CardTitle>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1"
                                            >
                                                <Filter className="h-3.5 w-3.5" />
                                                Filtrar
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1"
                                            >
                                                <Download className="h-3.5 w-3.5" />
                                                Exportar
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Buscar ausências..."
                                                className="pl-8 h-9"
                                            />
                                        </div>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[180px] h-9">
                                                <SelectValue placeholder="Tipo de ausência" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    Todos os tipos
                                                </SelectItem>
                                                <SelectItem value="vacation">
                                                    Férias
                                                </SelectItem>
                                                <SelectItem value="medical">
                                                    Atestado Médico
                                                </SelectItem>
                                                <SelectItem value="justified">
                                                    Falta Justificada
                                                </SelectItem>
                                                <SelectItem value="unjustified">
                                                    Falta Não Justificada
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* TODO Criar Table Component */}
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>
                                                    Data Início
                                                </TableHead>
                                                <TableHead>Data Fim</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Aprovado por
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {absences.map((absence) => (
                                                <TableRow key={absence.id}>
                                                    <TableCell className="font-medium">
                                                        {absence.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            absence.start_date,
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            absence.end_date,
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={
                                                                absence.status ===
                                                                "Aprovada"
                                                                    ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
                                                                    : absence.status ===
                                                                        "Pendente"
                                                                      ? "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
                                                                      : "bg-blue-100 text-blue-800 hover:text-blue-100 hover:bg-blue-800"
                                                            }
                                                        >
                                                            {absence.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {absence.approver.name}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <AbsenceContextMenu
                                                            absence={absence}
                                                            onStatusChange={
                                                                onStatusChange
                                                            }
                                                        />
                                                        {/* TODO CRIAR UM MENU SUSPENSO COM DELETE E UPDATE */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Other tabs would have similar content */}
                        <TabsContent value="approved" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Ausências Aprovadas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>
                                                    Data Início
                                                </TableHead>
                                                <TableHead>Data Fim</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Aprovado por
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {absences
                                                .filter(
                                                    (absence) =>
                                                        absence.status ===
                                                        "Aprovada",
                                                )
                                                .map((absence) => (
                                                    <TableRow key={absence.id}>
                                                        <TableCell className="font-medium">
                                                            {absence.type}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.start_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.end_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                className={
                                                                    absence.status ===
                                                                    "Aprovada"
                                                                        ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
                                                                        : absence.status ===
                                                                            "Pendente"
                                                                          ? "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
                                                                          : "bg-blue-100 text-blue-800 hover:text-blue-100 hover:bg-blue-800"
                                                                }
                                                            >
                                                                {absence.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                absence.approver
                                                                    .name
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <AbsenceContextMenu
                                                                absence={
                                                                    absence
                                                                }
                                                                onStatusChange={
                                                                    onStatusChange
                                                                }
                                                            />
                                                            {/* TODO CRIAR UM MENU SUSPENSO COM DELETE E UPDATE */}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="pending" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Ausências Pendentes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>
                                                    Data Início
                                                </TableHead>
                                                <TableHead>Data Fim</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Aprovado por
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {absences
                                                .filter(
                                                    (absence) =>
                                                        absence.status ===
                                                        "Pendente",
                                                )
                                                .map((absence) => (
                                                    <TableRow key={absence.id}>
                                                        <TableCell className="font-medium">
                                                            {absence.type}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.start_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.end_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                className={
                                                                    absence.status ===
                                                                    "Aprovada"
                                                                        ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
                                                                        : absence.status ===
                                                                            "Pendente"
                                                                          ? "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
                                                                          : "bg-blue-100 text-blue-800 hover:text-blue-100 hover:bg-blue-800"
                                                                }
                                                            >
                                                                {absence.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                absence.approver
                                                                    .name
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <AbsenceContextMenu
                                                                absence={
                                                                    absence
                                                                }
                                                                onStatusChange={
                                                                    onStatusChange
                                                                }
                                                            />
                                                            {/* TODO CRIAR UM MENU SUSPENSO COM DELETE E UPDATE */}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="planned" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Ausências Planejadas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>
                                                    Data Início
                                                </TableHead>
                                                <TableHead>Data Fim</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Aprovado por
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {absences
                                                .filter(
                                                    (absence) =>
                                                        absence.status ===
                                                        "Planejada",
                                                )
                                                .map((absence) => (
                                                    <TableRow key={absence.id}>
                                                        <TableCell className="font-medium">
                                                            {absence.type}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.start_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                absence.end_date,
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                className={
                                                                    absence.status ===
                                                                    "Aprovada"
                                                                        ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
                                                                        : absence.status ===
                                                                            "Pendente"
                                                                          ? "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
                                                                          : "bg-blue-100 text-blue-800 hover:text-blue-100 hover:bg-blue-800"
                                                                }
                                                            >
                                                                {absence.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                absence.approver
                                                                    .name
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <AbsenceContextMenu
                                                                absence={
                                                                    absence
                                                                }
                                                                onStatusChange={
                                                                    onStatusChange
                                                                }
                                                            />
                                                            {/* TODO CRIAR UM MENU SUSPENSO COM DELETE E UPDATE */}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}
