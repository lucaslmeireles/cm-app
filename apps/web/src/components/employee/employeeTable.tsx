"use client";
import { fetchEmployees } from "@/fetch/employee/fetchEmployees";
import { DataTable } from "@/repo/ui/components/ui/data-table";
import { columnsDataTableEmployee } from "../columns/employee-list.def";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { isAuthorized } from "@/helpers/isAuthorized";
import useRoleStore from "@/store/role.store";
export function EmployeesTable() {
    const {
        data: employees,
        isLoading,
        error,
    } = useSWR("/api/employees", fetchEmployees);
    console.log("Employees:", employees);
    const t = useTranslations("Employee.Main.table");
    const [isAdmin, setIsAdmin] = useState(false);

    console.log("isAdmin:", isAdmin);
    const columns = useMemo(
        () => columnsDataTableEmployee(t, isAdmin),
        [t, isAdmin],
    );
    return (
        !isLoading && (
            <div className="z-0 w-screen relative">
                <div className="w-full">
                    <DataTable
                        data={employees}
                        columns={columns}
                        filterItem="name"
                        t={t}
                    />
                </div>
            </div>
        )
    );
}
