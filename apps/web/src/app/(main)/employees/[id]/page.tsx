"use client";

import { AssessmentsCard } from "@/components/assessment/assessmentCard";
import { DeleteEmployee } from "@/components/employee/deleteEmployee";
import { EditEmployee } from "@/components/employee/editEmployee";
import { EmployeeChart } from "@/components/employee/employeeChart";
import { FormationCard } from "@/components/formation/formationCard";
import { MyManagerCard } from "@/components/manager/my_managerCard";
import { fetchEmployeeById } from "@/fetch/employee/fetchmployeeById";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription,
} from "@/repo/ui/components/ui/card";
import type { Employee } from "@/types/employee.type";
import {
    Mail,
    Phone,
    Calendar,
    FileText,
    MoreHorizontal,
    ChevronRight,
    Briefcase,
    GraduationCap,
    AlertCircle,
    MapPin,
    User,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

import { Button } from "@/repo/ui/components/ui/button";
import Link from "next/link";
import AbsenceCard from "@/components/absence/absenceCard";
import EmployeeProfileLoading from "@/components/loaders/employeePage";
import ErrorMessage from "@/components/errorPage";
import { Badge } from "@/repo/ui/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/repo/ui/components/ui/dropdown-menu";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/repo/ui/components/ui/carousel";
import { isAuthorized } from "@/helpers/isAuthorized";
import { useEffect, useState } from "react";

export default function ViewEmployee() {
    const params = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        data: employee,
        error,
        isLoading,
        mutate,
    } = useSWR<Employee, Error>(params.id, fetchEmployeeById);
    useEffect(() => {
        const fetchData = async () => {
            const isAdmin = await isAuthorized(2);
            setIsAdmin(isAdmin);
        };
        fetchData();
    });
    if (isLoading) return <EmployeeProfileLoading />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!employee) return <ErrorMessage message="Employee not found" />;

    //TODO Dentro do link voce ter o nivel de acesso, caso seja para todos ou para RH e Gestor
    const links = [
        {
            href: "/absences",
            title: "Gerenciar faltas",
            icon: <Calendar className="h-4 w-4" />,
            description: "Visualizar e gerenciar ausências e faltas",
            color: "bg-blue-50",
            iconColor: "text-blue-500",
            action: "Registrar falta",
        },
        {
            href: "/assessments",
            title: "Gerenciar avaliações",
            icon: <FileText className="h-4 w-4" />,
            description: "Acompanhar e criar avaliações de desempenho",
            color: "bg-green-50",
            iconColor: "text-green-500",
            action: "Nova avaliação",
        },
        {
            href: "/career_path",
            title: "Gerenciar carreira",
            icon: <GraduationCap className="h-4 w-4" />,
            description: "Planejar e visualizar trajetória profissional",
            color: "bg-purple-50",
            iconColor: "text-purple-500",
            action: "Plano de carreira",
        },
        {
            href: "/postion",
            title: "Gerenciar cargo",
            icon: <Briefcase className="h-4 w-4" />,
            description: "Atualizar informações de cargo e função",
            color: "bg-amber-50",
            iconColor: "text-amber-500",
            action: "Atualizar cargo",
        },
        {
            href: "/formation",
            title: "Gerenciar formação",
            icon: <GraduationCap className="h-4 w-4" />,
            description: "Adicionar e atualizar formação acadêmica",
            color: "bg-indigo-50",
            iconColor: "text-indigo-500",
            action: "Adicionar formação",
        },
        {
            href: "/supervisor",
            title: "Gerenciar supervisor",
            icon: <User className="h-4 w-4" />,
            description: "Atribuir ou alterar supervisor responsável",
            color: "bg-rose-50",
            iconColor: "text-rose-500",
            action: "Alterar supervisor",
        },
    ];

    return (
        <main className="space-y-4 mx-5 mt-3">
            {/* Header Card with Extended Employee Info */}
            <Card className="border-[1px] shadow-sm bg-white">
                <CardHeader className="pb-2">
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex flex-row gap-4 place-items-start">
                            <div className="relative">
                                <Image
                                    src={
                                        employee.profile_pic ||
                                        "/placeholder.svg?height=90&width=90" ||
                                        "/placeholder.svg"
                                    }
                                    width={90}
                                    height={90}
                                    className="rounded-full border-2 border-gray-100"
                                    alt={`${employee.name}'s profile picture`}
                                />
                                <Badge className="absolute -bottom-1 -right-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                    Ativo
                                </Badge>
                            </div>
                            <div className="flex flex-col">
                                <CardTitle className="text-xl">
                                    {employee.name}
                                </CardTitle>
                                <p className="font-normal text-base text-gray-600">
                                    {employee.department
                                        ?.map((dep) => dep.name)
                                        .join(", ")}
                                </p>
                                <div className="flex flex-col gap-1 mt-1">
                                    {/* TODO INFO CONFIDENCIAL */}
                                    {isAdmin && (
                                        <>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Mail className="h-3.5 w-3.5" />
                                                <span>
                                                    {employee.email ||
                                                        "email@example.com"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Phone className="h-3.5 w-3.5" />
                                                <span>
                                                    {employee.phone ||
                                                        "(00) 00000-0000"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <MapPin className="h-3.5 w-3.5" />
                                                <span>
                                                    {employee.address ||
                                                        "Endereço não informado"}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <EditEmployee employee={employee} />
                            <DeleteEmployee employee={employee} />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>Exportar dados</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Mail className="mr-2 h-4 w-4" />
                                        <span>Enviar e-mail</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <AlertCircle className="mr-2 h-4 w-4" />
                                        <span>Reportar problema</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
                        <div className="space-y-1">
                            <h4 className="text-xs font-medium text-gray-500">
                                Informações Pessoais
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Departamento
                                    </p>
                                    <p className="text-sm font-medium">
                                        {employee?.department
                                            ?.map((dep) => dep.name)
                                            .join(",") || "N/A"}
                                    </p>
                                </div>
                                <div></div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Data de admissão
                                    </p>
                                    <p className="text-sm font-medium">
                                        {employee.entry_date
                                            ? new Date(
                                                  employee.entry_date,
                                              ).toLocaleDateString()
                                            : "00/00/0000"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Cargo
                                    </p>
                                    <p className="text-sm font-medium"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Cards Grid */}
            <div className="relative">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        Ações Rápidas
                    </h3>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {links.map((link) => (
                            <CarouselItem
                                key={link.href}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <Card className="border-[1px] h-full">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start">
                                            <div
                                                className={`p-2 rounded-md ${link.color} ${link.iconColor} mr-3`}
                                            >
                                                {link.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-sm font-medium">
                                                    {link.title}
                                                </CardTitle>
                                                <CardDescription className="text-xs mt-1">
                                                    {link.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between pt-0 align-bottom">
                                        <Link
                                            href={`${params.id}${link.href}`}
                                            className="text-xs text-primary flex items-center"
                                        >
                                            <Button variant="outline" size="sm">
                                                {link.action}
                                            </Button>
                                        </Link>
                                        <p className="text-xs text-primary flex items-center">
                                            Ver mais
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </p>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-2">
                        <CarouselPrevious className="relative inset-0 translate-y-0 bg-white" />
                        <CarouselNext className="relative inset-0 translate-y-0 bg-white" />
                    </div>
                </Carousel>
            </div>
        </main>
    );
}
