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
    Briefcase,
    TrendingUp,
    Target,
    Award,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/repo/ui/components/ui/progress";

export default function CareerPathPage({ params }: { params: { id: string } }) {
    // Sample data
    const careerPath = [
        {
            id: 1,
            position: "Analista de RH Jr",
            level: 1,
            startDate: "2018-03-01",
            endDate: "2019-06-30",
            department: "Recursos Humanos",
            status: "Concluído",
        },
        {
            id: 2,
            position: "Analista de RH Pl",
            level: 2,
            startDate: "2019-07-01",
            endDate: "2021-12-31",
            department: "Recursos Humanos",
            status: "Concluído",
        },
        {
            id: 3,
            position: "Analista de RH Sr",
            level: 3,
            startDate: "2022-01-01",
            endDate: null,
            department: "Recursos Humanos",
            status: "Atual",
        },
        {
            id: 4,
            position: "Coordenador de RH",
            level: 4,
            startDate: null,
            endDate: null,
            department: "Recursos Humanos",
            status: "Próximo",
        },
        {
            id: 5,
            position: "Gerente de RH",
            level: 5,
            startDate: null,
            endDate: null,
            department: "Recursos Humanos",
            status: "Futuro",
        },
    ];

    const skills = [
        {
            id: 1,
            name: "Gestão de Pessoas",
            category: "Soft Skill",
            level: 80,
            target: 90,
            required: true,
        },
        {
            id: 2,
            name: "Recrutamento e Seleção",
            category: "Hard Skill",
            level: 85,
            target: 85,
            required: true,
        },
        {
            id: 3,
            name: "Legislação Trabalhista",
            category: "Hard Skill",
            level: 75,
            target: 80,
            required: true,
        },
        {
            id: 4,
            name: "Sistemas de RH",
            category: "Hard Skill",
            level: 90,
            target: 80,
            required: true,
        },
        {
            id: 5,
            name: "Liderança",
            category: "Soft Skill",
            level: 70,
            target: 85,
            required: true,
        },
    ];

    const goals = [
        {
            id: 1,
            name: "Concluir curso de Gestão de Pessoas",
            deadline: "2024-06-30",
            progress: 60,
            status: "Em andamento",
        },
        {
            id: 2,
            name: "Certificação em Legislação Trabalhista",
            deadline: "2024-08-15",
            progress: 30,
            status: "Em andamento",
        },
        {
            id: 3,
            name: "Participar de projeto estratégico",
            deadline: "2024-12-31",
            progress: 0,
            status: "Não iniciado",
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
                    <h1 className="text-xl font-semibold">Plano de Carreira</h1>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Novo Objetivo
                </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Summary */}
                <div className="space-y-4">
                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Posição Atual
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
                                            Analista de RH Sr
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Recursos Humanos • Nível 3
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Data de Início
                                        </span>
                                        <span className="text-sm font-medium">
                                            01/01/2022
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">
                                            Tempo na Posição
                                        </span>
                                        <span className="text-sm font-medium">
                                            2 anos
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">
                                            Progresso para próximo nível
                                        </span>
                                        <span className="text-xs font-medium">
                                            75%
                                        </span>
                                    </div>
                                    <Progress value={75} className="h-1.5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Próxima Posição
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-50 text-purple-500 p-2 rounded-md">
                                        <Target className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Coordenador de RH
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Recursos Humanos • Nível 4
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Requisitos para promoção
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">
                                                Tempo mínimo na posição
                                            </span>
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                Completo
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">
                                                Habilidades técnicas
                                            </span>
                                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                                75%
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">
                                                Certificações
                                            </span>
                                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                                Pendente
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-1"
                            >
                                <TrendingUp className="h-3.5 w-3.5" />
                                Ver Plano de Desenvolvimento
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column - Career Path Details */}
                <div className="lg:col-span-2 space-y-4">
                    <Tabs defaultValue="path" className="w-full">
                        <TabsList className="w-full border-b grid grid-cols-3 rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="path"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Trajetória
                            </TabsTrigger>
                            <TabsTrigger
                                value="skills"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Habilidades
                            </TabsTrigger>
                            <TabsTrigger
                                value="goals"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Objetivos
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="path" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">
                                        Trajetória de Carreira
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative pl-6 border-l border-gray-200">
                                        {careerPath.map((position, index) => (
                                            <div
                                                key={position.id}
                                                className={`mb-6 ${index === careerPath.length - 1 ? "mb-0" : ""}`}
                                            >
                                                <div className="absolute -left-1.5">
                                                    <div
                                                        className={`w-3 h-3 rounded-full border-2 ${
                                                            position.status ===
                                                            "Atual"
                                                                ? "bg-blue-500 border-blue-500"
                                                                : position.status ===
                                                                    "Concluído"
                                                                  ? "bg-green-500 border-green-500"
                                                                  : "bg-white border-gray-300"
                                                        }`}
                                                    ></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-medium">
                                                            {position.position}
                                                        </h3>
                                                        <Badge
                                                            className={
                                                                position.status ===
                                                                "Atual"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : position.status ===
                                                                        "Concluído"
                                                                      ? "bg-green-100 text-green-800"
                                                                      : "bg-gray-100 text-gray-800"
                                                            }
                                                        >
                                                            {position.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {position.department} •
                                                        Nível {position.level}
                                                    </p>
                                                    {position.startDate && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(
                                                                position.startDate,
                                                            ).toLocaleDateString()}
                                                            {position.endDate
                                                                ? ` - ${new Date(position.endDate).toLocaleDateString()}`
                                                                : " - Atual"}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="skills" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Habilidades Requeridas
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
                                                <Plus className="h-3.5 w-3.5" />
                                                Adicionar
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {skills.map((skill) => (
                                            <div key={skill.id}>
                                                <div className="flex justify-between mb-1">
                                                    <div>
                                                        <span className="text-sm font-medium">
                                                            {skill.name}
                                                        </span>
                                                        <Badge className="ml-2 bg-gray-100 text-gray-800">
                                                            {skill.category}
                                                        </Badge>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <Progress
                                                        value={skill.level}
                                                        className="h-2"
                                                    />
                                                    <div
                                                        className="absolute top-0 h-2 w-0.5 bg-gray-800"
                                                        style={{
                                                            left: `${skill.target}%`,
                                                        }}
                                                        title={`Meta: ${skill.target}%`}
                                                    />
                                                </div>
                                                <div className="flex justify-end mt-0.5">
                                                    <span className="text-xs text-gray-500">
                                                        Meta: {skill.target}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="goals" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Objetivos de Desenvolvimento
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
                                                <Plus className="h-3.5 w-3.5" />
                                                Adicionar
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {goals.map((goal) => (
                                            <Card
                                                key={goal.id}
                                                className="border-[1px]"
                                            >
                                                <CardHeader className="pb-2">
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`p-2 rounded-md ${
                                                                goal.status ===
                                                                "Em andamento"
                                                                    ? "bg-blue-50 text-blue-500"
                                                                    : "bg-gray-50 text-gray-500"
                                                            }`}
                                                        >
                                                            <Award className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-sm font-medium">
                                                                {goal.name}
                                                            </CardTitle>
                                                            <CardDescription className="text-xs">
                                                                Prazo:{" "}
                                                                {new Date(
                                                                    goal.deadline,
                                                                ).toLocaleDateString()}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pb-2">
                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span>
                                                                Progresso
                                                            </span>
                                                            <span>
                                                                {goal.progress}%
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={
                                                                goal.progress
                                                            }
                                                            className="h-1.5"
                                                        />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="pt-0 flex justify-between">
                                                    <Badge
                                                        className={
                                                            goal.status ===
                                                            "Em andamento"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }
                                                    >
                                                        {goal.status}
                                                    </Badge>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="gap-1"
                                                    >
                                                        Atualizar
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
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
