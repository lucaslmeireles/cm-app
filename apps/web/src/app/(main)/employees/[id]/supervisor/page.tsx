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
    Download,
    Filter,
    Search,
    User,
    Users,
    History,
    ArrowUpDown,
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
import Image from "next/image";

export default function SupervisorPage({ params }: { params: { id: string } }) {
    // Sample data
    const currentSupervisor = {
        id: 1,
        name: "João Silva",
        position: "Gerente de Departamento",
        department: "Recursos Humanos",
        email: "joao.silva@empresa.com",
        phone: "(11) 98765-4321",
        since: "2022-06-15",
    };

    const supervisorHistory = [
        {
            id: 2,
            name: "Maria Oliveira",
            position: "Gerente de Departamento",
            department: "Recursos Humanos",
            startDate: "2020-03-10",
            endDate: "2022-06-14",
        },
        {
            id: 3,
            name: "Carlos Santos",
            position: "Supervisor de RH",
            department: "Recursos Humanos",
            startDate: "2018-01-20",
            endDate: "2020-03-09",
        },
    ];

    const potentialSupervisors = [
        {
            id: 4,
            name: "Ana Souza",
            position: "Gerente de Departamento",
            department: "Recursos Humanos",
            email: "ana.souza@empresa.com",
        },
        {
            id: 5,
            name: "Roberto Almeida",
            position: "Gerente Sênior",
            department: "Recursos Humanos",
            email: "roberto.almeida@empresa.com",
        },
        {
            id: 6,
            name: "Fernanda Lima",
            position: "Coordenadora de RH",
            department: "Recursos Humanos",
            email: "fernanda.lima@empresa.com",
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
                        Gerenciamento de Supervisor
                    </h1>
                </div>
                <Button className="gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    Alterar Supervisor
                </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Current Supervisor */}
                <div className="space-y-4">
                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Supervisor Atual
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center text-center mb-4">
                                <div className="relative mb-3">
                                    <Image
                                        src="/placeholder.svg?height=80&width=80"
                                        width={80}
                                        height={80}
                                        className="rounded-full border-2 border-gray-100"
                                        alt={`${currentSupervisor.name}'s profile picture`}
                                    />
                                    <Badge className="absolute -bottom-1 -right-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                        Ativo
                                    </Badge>
                                </div>
                                <h3 className="font-medium text-base">
                                    {currentSupervisor.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {currentSupervisor.position}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {currentSupervisor.department}
                                </p>
                            </div>

                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-100 p-1.5 rounded-md">
                                        <User className="h-3.5 w-3.5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Email
                                        </p>
                                        <p className="text-sm">
                                            {currentSupervisor.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-100 p-1.5 rounded-md">
                                        <User className="h-3.5 w-3.5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Telefone
                                        </p>
                                        <p className="text-sm">
                                            {currentSupervisor.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-100 p-1.5 rounded-md">
                                        <User className="h-3.5 w-3.5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Supervisor desde
                                        </p>
                                        <p className="text-sm">
                                            {new Date(
                                                currentSupervisor.since,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                            >
                                <User className="h-3.5 w-3.5" />
                                Ver Perfil Completo
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Histórico de Supervisores
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {supervisorHistory.map((supervisor) => (
                                    <div key={supervisor.id} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-gray-100 p-2 rounded-md">
                                                <History className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {supervisor.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {supervisor.position}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        supervisor.startDate,
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        supervisor.endDate,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Supervisor Management */}
                <div className="lg:col-span-2 space-y-4">
                    <Tabs defaultValue="change" className="w-full">
                        <TabsList className="w-full border-b grid grid-cols-2 rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="change"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Alterar Supervisor
                            </TabsTrigger>
                            <TabsTrigger
                                value="team"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Equipe do Supervisor
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="change" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Selecionar Novo Supervisor
                                        </CardTitle>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Buscar supervisores..."
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
                                        {potentialSupervisors.map(
                                            (supervisor) => (
                                                <Card
                                                    key={supervisor.id}
                                                    className="border-[1px]"
                                                >
                                                    <CardHeader className="pb-2">
                                                        <div className="flex items-start gap-3">
                                                            <div className="relative">
                                                                <Image
                                                                    src="/placeholder.svg?height=50&width=50"
                                                                    width={50}
                                                                    height={50}
                                                                    className="rounded-full border-2 border-gray-100"
                                                                    alt={`${supervisor.name}'s profile picture`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <CardTitle className="text-sm font-medium">
                                                                    {
                                                                        supervisor.name
                                                                    }
                                                                </CardTitle>
                                                                <CardDescription className="text-xs">
                                                                    {
                                                                        supervisor.position
                                                                    }{" "}
                                                                    •{" "}
                                                                    {
                                                                        supervisor.department
                                                                    }
                                                                </CardDescription>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {
                                                                        supervisor.email
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardFooter className="pt-0 flex justify-end">
                                                        <Button size="sm">
                                                            Selecionar como
                                                            Supervisor
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="team" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Equipe do Supervisor
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
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">
                                                Lista de membros da equipe seria
                                                exibida aqui
                                            </p>
                                        </div>
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
