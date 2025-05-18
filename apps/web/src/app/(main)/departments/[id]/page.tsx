"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import {
    ArrowRight,
    Briefcase,
    Mail,
    Phone,
    User,
    Users,
    UserCheck,
} from "lucide-react";
import { fetchDepartmentById } from "@/fetch/department/fetchDepartmentById";
import { Department } from "@/types/department.type";
import { Badge } from "@/repo/ui/components/ui/badge";
import { Button } from "@/repo/ui/components/ui/button";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
import { EditDepartment } from "@/components/department/editDepartment";
import { DeleteDepartment } from "@/components/department/deleteDepartment";
import { DiscChartDep } from "@/components/department/discChartDep";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import AbsenceChartByDepartment from "@/components/absence/absenceDepartmentChart";
import Link from "next/link";
import { Employee } from "@/types/employee.type";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/errorPage";

export default function DepartmentView() {
    const { id } = useParams();
    const {
        data: department,
        error,
        isLoading,
    } = useSWR<Department, Error>(id, fetchDepartmentById);
    console.log(department);
    if (isLoading) return <DepartmentSkeleton />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!department) return <ErrorMessage message="Department not found" />;
    return (
        <div className="container mx-auto py-6 space-y-6">
            <Card className="border-none shadow-none">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg text-slate-300">Departamento</p>
                        <CardTitle className="text-3xl font-bold">
                            {department.name}
                        </CardTitle>
                    </div>
                    <div className="flex space-x-2">
                        <p>TIRAR</p>
                        <EditDepartment department={department} />
                        <DeleteDepartment department={department} />
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmployeeSection employees={department.employees} />
                <div className="space-y-6">
                    <DepartmentInfo department={department} />
                    <DiscChartDep dep={department.id} />
                </div>
            </div>

            <AbsenceSection department={department} />
        </div>
    );
}

function EmployeeSection({ employees }: { employees: Employee[] }) {
    const t = useTranslations("Employee.Main");
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {t("title")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {employees.length > 0 &&
                    employees
                        .slice(0, 4)
                        .map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                            />
                        ))}
                <Link href={"/employees"}>
                    <Button variant="outline" className="w-full mt-4">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {t("see_more")}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

function EmployeeCard({ employee }: { employee: Employee }) {
    const t = useTranslations("Employee.View");
    return (
        <Card>
            <Link href={`/employees/${employee.id}`}>
                <CardContent className="flex items-center space-x-4 py-4">
                    <div className="flex-shrink-0">
                        <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-row justify-between">
                            <h3 className="text-lg font-medium">
                                {employee.name}
                            </h3>
                            {employee.manager ? (
                                <Badge>{t("manager")}</Badge>
                            ) : null}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Phone className="mr-1 h-4 w-4" />
                                {employee.phone}
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-1 h-4 w-4" />
                                {employee.email}
                            </div>
                            <div className="flex items-center">
                                <User className="mr-1 h-4 w-4" />
                                {employee.identifiant}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}

function DepartmentInfo({ department }: { department: Department }) {
    const t = useTranslations("Department");
    const infoItems = [
        {
            icon: Users,
            label: t("employees"),
            value: department._count.employes,
        },
        { icon: Briefcase, label: t("job"), value: department._count.jobs },
        {
            icon: UserCheck,
            label: t("managers"),
            value: department._count.managers,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {t("info")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {infoItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.label}:</span>
                        <Badge variant="secondary">{item.value}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function AbsenceSection({ department }: { department: Department }) {
    const t = useTranslations("Absence");
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {t("title")}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AbsenceChartByDepartment
                    department={department}
                    type="month"
                />
                <AbsenceChartByDepartment department={department} type="year" />
            </CardContent>
        </Card>
    );
}

function DepartmentSkeleton() {
    return (
        <div className="container mx-auto py-6 space-y-6">
            <Skeleton className="h-12 w-2/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[400px]" />
                <div className="space-y-6">
                    <Skeleton className="h-[200px]" />
                    <Skeleton className="h-[200px]" />
                </div>
            </div>
            <Skeleton className="h-[300px]" />
        </div>
    );
}
