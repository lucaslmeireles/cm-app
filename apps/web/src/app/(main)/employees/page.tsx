import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";

import { EmployeesTable } from "@/components/employee/employeeTable";
import { AddEmployee } from "@/components/employee/addEmployee";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Button } from "@/repo/ui/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Funcionarios",
    description: "Lista de funcionarios",
};

export default function Employees() {
    const t = useTranslations("Employee.Main");
    return (
        <>
            <Card className="border-none shadow-none	">
                <CardHeader className="flex flex-row justify-between">
                    <div>
                        <CardTitle>{t("title")}</CardTitle>
                        <CardDescription>{t("description")}</CardDescription>
                    </div>
                    <Link href="/employees/add" className="w-full">
                        <Button variant="default">{t("add_btn")}</Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row">
                        <EmployeesTable />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
