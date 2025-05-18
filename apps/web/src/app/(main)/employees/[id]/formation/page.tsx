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
import { BookOpen, ChevronLeft, Filter, Plus, Award } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/repo/ui/components/ui/table";
import { Progress } from "@/repo/ui/components/ui/progress";

export default function FormationPage({ params }: { params: { id: string } }) {
    // Sample data
    const educations = [
        {
            id: 1,
            type: "Graduação",
            institution: "Universidade Federal",
            course: "Administração",
            startDate: "2010-03-01",
            endDate: "2014-12-15",
            status: "Concluído",
        },
        {
            id: 2,
            type: "Pós-Graduação",
            institution: "Universidade Estadual",
            course: "Gestão de Pessoas",
            startDate: "2015-03-01",
            endDate: "2016-12-15",
            status: "Concluído",
        },
        {
            id: 3,
            type: "MBA",
            institution: "Escola de Negócios",
            course: "Gestão Empresarial",
            startDate: "2018-03-01",
            endDate: "2019-12-15",
            status: "Concluído",
        },
        {
            id: 4,
            type: "Mestrado",
            institution: "Universidade Federal",
            course: "Administração",
            startDate: "2020-03-01",
            endDate: "2022-12-15",
            status: "Em andamento",
        },
    ];

    const certifications = [
        {
            id: 1,
            name: "Certificação em Liderança",
            institution: "Instituto de Liderança",
            date: "2018-06-15",
            expiryDate: "2023-06-15",
            status: "Válido",
        },
        {
            id: 2,
            name: "Certificação em Gestão de Projetos",
            institution: "PMI",
            date: "2019-08-10",
            expiryDate: "2022-08-10",
            status: "Expirado",
        },
        {
            id: 3,
            name: "Certificação em RH",
            institution: "Associação de RH",
            date: "2021-03-20",
            expiryDate: "2024-03-20",
            status: "Válido",
        },
    ];

    const courses = [
        {
            id: 1,
            name: "Excel Avançado",
            institution: "Escola de Tecnologia",
            date: "2020-05-10",
            duration: "40h",
            status: "Concluído",
            progress: 100,
        },
        {
            id: 2,
            name: "Liderança e Gestão de Equipes",
            institution: "Instituto de Liderança",
            date: "2021-07-15",
            duration: "30h",
            status: "Concluído",
            progress: 100,
        },
        {
            id: 3,
            name: "Comunicação Eficaz",
            institution: "Escola de Comunicação",
            date: "2022-02-20",
            duration: "20h",
            status: "Em andamento",
            progress: 60,
        },
        {
            id: 4,
            name: "Gestão do Tempo",
            institution: "Plataforma Online",
            date: "2022-09-05",
            duration: "15h",
            status: "Em andamento",
            progress: 30,
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
                        Formação Acadêmica e Profissional
                    </h1>
                </div>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Adicionar Formação
                </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Summary */}
                <div className="space-y-4">
                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Resumo de Formação
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Nível de Escolaridade
                                    </span>
                                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                                        Pós-Graduação
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Certificações
                                    </span>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        3
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Cursos Concluídos
                                    </span>
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        2
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        Cursos em Andamento
                                    </span>
                                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                        2
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[1px]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">
                                Cursos em Andamento
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {courses
                                    .filter(
                                        (course) =>
                                            course.status === "Em andamento",
                                    )
                                    .map((course) => (
                                        <div key={course.id} className="p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-blue-50 text-blue-500 p-2 rounded-md">
                                                    <BookOpen className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        {course.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {course.institution} •{" "}
                                                        {course.duration}
                                                    </p>
                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span>
                                                                Progresso
                                                            </span>
                                                            <span>
                                                                {
                                                                    course.progress
                                                                }
                                                                %
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={
                                                                course.progress
                                                            }
                                                            className="h-1.5"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 pb-3">
                            <Button variant="link" className="text-xs p-0">
                                Ver todos os cursos
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column - Formation List */}
                <div className="lg:col-span-2 space-y-4">
                    <Tabs defaultValue="education" className="w-full">
                        <TabsList className="w-full border-b grid grid-cols-3 rounded-none bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="education"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Educação Formal
                            </TabsTrigger>
                            <TabsTrigger
                                value="certifications"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Certificações
                            </TabsTrigger>
                            <TabsTrigger
                                value="courses"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                            >
                                Cursos e Treinamentos
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="education" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Formação Acadêmica
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
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>
                                                    Instituição
                                                </TableHead>
                                                <TableHead>Curso</TableHead>
                                                <TableHead>Período</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {educations.map((education) => (
                                                <TableRow key={education.id}>
                                                    <TableCell className="font-medium">
                                                        {education.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {education.institution}
                                                    </TableCell>
                                                    <TableCell>
                                                        {education.course}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            education.startDate,
                                                        ).getFullYear()}{" "}
                                                        -{" "}
                                                        {new Date(
                                                            education.endDate,
                                                        ).getFullYear()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={
                                                                education.status ===
                                                                "Concluído"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-blue-100 text-blue-800"
                                                            }
                                                        >
                                                            {education.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Detalhes
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="certifications" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Certificações
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {certifications.map((cert) => (
                                            <Card
                                                key={cert.id}
                                                className="border-[1px]"
                                            >
                                                <CardHeader className="pb-2">
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`p-2 rounded-md ${cert.status === "Válido" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}
                                                        >
                                                            <Award className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-sm font-medium">
                                                                {cert.name}
                                                            </CardTitle>
                                                            <CardDescription className="text-xs">
                                                                {
                                                                    cert.institution
                                                                }
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pb-2">
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div>
                                                            <p className="text-gray-500">
                                                                Data de Emissão
                                                            </p>
                                                            <p className="font-medium">
                                                                {new Date(
                                                                    cert.date,
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">
                                                                Data de
                                                                Expiração
                                                            </p>
                                                            <p className="font-medium">
                                                                {new Date(
                                                                    cert.expiryDate,
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="pt-0 flex justify-between">
                                                    <Badge
                                                        className={
                                                            cert.status ===
                                                            "Válido"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }
                                                    >
                                                        {cert.status}
                                                    </Badge>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="courses" className="pt-4">
                            <Card className="border-[1px]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm font-medium text-gray-700">
                                            Cursos e Treinamentos
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
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>
                                                    Instituição
                                                </TableHead>
                                                <TableHead>Data</TableHead>
                                                <TableHead>Duração</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Progresso</TableHead>
                                                <TableHead className="text-right">
                                                    Ações
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {courses.map((course) => (
                                                <TableRow key={course.id}>
                                                    <TableCell className="font-medium">
                                                        {course.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {course.institution}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            course.date,
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {course.duration}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={
                                                                course.status ===
                                                                "Concluído"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-blue-100 text-blue-800"
                                                            }
                                                        >
                                                            {course.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="w-24">
                                                            <Progress
                                                                value={
                                                                    course.progress
                                                                }
                                                                className="h-1.5"
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Detalhes
                                                        </Button>
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
