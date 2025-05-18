"use client";

import { Button } from "@/repo/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
    ChevronLeft,
    Filter,
    Plus,
    Search,
    Briefcase,
    Clock,
    DollarSign,
    BarChart,
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
import { Progress } from "@/repo/ui/components/ui/progress";

export default function PositionPage({ params }: { params: { id: string } }) {
    // Sample data
    const currentPosition = {
        id: 1,
        title: "Analista de RH Sr",
        department: "Recursos Humanos",
        level: 3,
        startDate: "2022-01-01",
        salary: "R$ 7.500,00",
        responsibilities: [
            "Gerenciar processos de recrutamento e seleção",
            "Conduzir avaliações de desempenho",
            "Desenvolver políticas de RH",
            "Dar suporte a gestores em questões de pessoal",
        ],
    };

    const positionHistory = [
        {
            id: 2,
            title: "Analista de RH Pl",
            department: "Recursos Humanos",
            level: 2,
            startDate: "2019-07-01",
            endDate: "2021-12-31",
            salary: "R$ 5.800,00",
        },
        {
            id: 3,
            title: "Analista de RH Jr",
            department: "Recursos Humanos",
            level: 1,
            startDate: "2018-03-01",
            endDate: "2019-06-30",
            salary: "R$ 4.200,00",
        },
    ];

    const availablePositions = [
        {
            id: 4,
            title: "Coordenador de RH",
            department: "Recursos Humanos",
            level: 4,
            requirements: "Mínimo de 3 anos como Analista Sr",
            salary: "R$ 9.800,00",
        },
        {
            id: 5,
            title: "Especialista de Treinamento",
            department: "Recursos Humanos",
            level: 3,
            requirements: "Experiência em T&D",
            salary: "R$ 7.800,00",
        },
        {
            id: 6,
            title: "Analista de Remuneração Sr",
            department: "Recursos Humanos",
            level: 3,
            requirements: "Experiência em cargos e salários",
            salary: "R$ 7.600,00",
        },
    ];

    return (
        <main className="space-y-4 mx-5 mt-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href={`/${params.id}`}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold">
                        Gerenciamento de Cargo
                    </h1>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Solicitar Mudança
                </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Current Position */}
                <div className="space-y-4">
                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Cargo Atual
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 text-blue-500 p-2 rounded-md">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            {currentPosition.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {currentPosition.department} • Nível{" "}
                                            {currentPosition.level}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Data de Início
                                        </span>
                                        <span className="text-sm font-medium">
                                            {new Date(
                                                currentPosition.startDate,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Tempo no Cargo
                                        </span>
                                        <span className="text-sm font-medium">
                                            2 anos
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Salário
                                        </span>
                                        <span className="text-sm font-medium">
                                            {currentPosition.salary}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Status
                                        </span>
                                        <Badge className="mt-1 w-fit bg-green-100 text-green-800">
                                            Ativo
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Responsabilidades
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 list-disc pl-5">
                                {currentPosition.responsibilities.map(
                                    (resp, index) => (
                                        <li key={index} className="text-sm">
                                            {resp}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Histórico de Cargos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {positionHistory.map((position) => (
                                    <div key={position.id} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-gray-100 p-2 rounded-md">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {position.title}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {position.department} •
                                                    Nível {position.level}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        position.startDate,
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        position.endDate,
                                                    ).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Salário: {position.salary}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Position Management */}
                <div className="lg:col-span-2 space-y-4">
                    <Tabs defaultValue="opportunities" className="w-full">
                        <TabsList className="w-full border-b grid grid-cols-3 rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="opportunities"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Oportunidades
                            </TabsTrigger>
                            <TabsTrigger
                                value="salary"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Remuneração
                            </TabsTrigger>
                            <TabsTrigger
                                value="requests"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Solicitações
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="opportunities" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Oportunidades Disponíveis
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
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Buscar cargos..."
                                                className="pl-8 h-9"
                                            />
                                        </div>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[180px] h-9">
                                                <SelectValue placeholder="Departamento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    Todos os departamentos
                                                </SelectItem>
                                                <SelectItem value="hr">
                                                    Recursos Humanos
                                                </SelectItem>
                                                <SelectItem value="finance">
                                                    Financeiro
                                                </SelectItem>
                                                <SelectItem value="it">
                                                    Tecnologia da Informação
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {availablePositions.map((position) => (
                                            <Card
                                                key={position.id}
                                                className="border-[1px]"
                                            >
                                                <CardHeader className="pb-2">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-blue-50 text-blue-500 p-2 rounded-md">
                                                            <Briefcase className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-sm font-medium">
                                                                {position.title}
                                                            </CardTitle>
                                                            <CardDescription className="text-xs">
                                                                {
                                                                    position.department
                                                                }{" "}
                                                                • Nível{" "}
                                                                {position.level}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pb-2">
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div>
                                                            <p className="text-gray-500">
                                                                Requisitos
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    position.requirements
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">
                                                                Faixa Salarial
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    position.salary
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="pt-0 flex justify-end">
                                                    <Button size="sm">
                                                        Candidatar-se
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="salary" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Informações de Remuneração
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">
                                                Histórico Salarial
                                            </h3>
                                            <div className="h-[200px] flex items-center justify-center">
                                                <div className="text-center">
                                                    <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                                    <p className="text-sm text-gray-500">
                                                        Gráfico de histórico
                                                        salarial seria exibido
                                                        aqui
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium mb-2">
                                                Comparativo de Mercado
                                            </h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm">
                                                            Seu Salário
                                                        </span>
                                                        <span className="text-sm font-medium">
                                                            R$ 7.500,00
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={75}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm">
                                                            Média do Mercado
                                                        </span>
                                                        <span className="text-sm font-medium">
                                                            R$ 7.800,00
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={78}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm">
                                                            Topo do Mercado
                                                        </span>
                                                        <span className="text-sm font-medium">
                                                            R$ 10.000,00
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={100}
                                                        className="h-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium mb-2">
                                                Benefícios
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-green-50 p-1.5 rounded-md">
                                                        <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">
                                                            Vale Refeição
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            R$ 40,00/dia
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-green-50 p-1.5 rounded-md">
                                                        <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">
                                                            Vale Transporte
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            R$ 220,00/mês
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-green-50 p-1.5 rounded-md">
                                                        <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">
                                                            Plano de Saúde
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Cobertura nacional
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-green-50 p-1.5 rounded-md">
                                                        <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">
                                                            Plano Odontológico
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Cobertura básica
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="requests" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Solicitações de Mudança
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                                        <h3 className="text-sm font-medium text-gray-700 mb-1">
                                            Nenhuma solicitação em andamento
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
                                            Você não possui solicitações de
                                            mudança de cargo em andamento.
                                            Clique no botão abaixo para iniciar
                                            uma nova solicitação.
                                        </p>
                                        <Button className="gap-1">
                                            <Plus className="h-4 w-4" />
                                            Nova Solicitação
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}
