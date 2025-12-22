"use client";
import { fetchAbsenceByEmployeeId } from "@/fetch/absence/getAbsenceByEmployeeId";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Absence } from "@/types/absence.type";
import {
    ColumnDef,
    flexRender,
    getFilteredRowModel,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/repo/ui/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/repo/ui/components/ui/table";
import { DataTable } from "@/repo/ui/components/ui/data-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pen, Pencil, PenOffIcon, PenSquare } from "lucide-react";
import { EditAbsence } from "@/components/absence/editAbsence";
import { DeleteAbsence } from "@/components/absence/deleteAbsence";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export const columnsDataTableAbsence = (
    t: (key: string) => string,
    mutate: any,
): ColumnDef<Absence>[] => [
    {
        accessorKey: "date",
        header: t("date"),
        cell: ({ row }) => format(row.original.date, "PPP", { locale: ptBR }),
    },
    {
        accessorKey: "justification",
        header: t("justification"),
        cell: ({ row }) =>
            row.original.justification
                ? row.original.justification
                : "Sem justificativa",
    },
    {
        accessorKey: "user.manager.employee.name",
        header: t("created_by"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div>
                    <EditAbsence absence={row.original} mutate={mutate} />
                    <DeleteAbsence absence={row.original} mutate={mutate} />
                </div>
            );
        },
    },
];

export default function AbsenceEmployee() {
    const { id } = useParams();
    const t = useTranslations("Absence.main");
    const {
        data: absences,
        isLoading,
        error,
        mutate,
    } = useSWR(
        { name: `api/absence/${id}`, args: id },
        fetchAbsenceByEmployeeId,
    );

    if (!isLoading) {
        console.log(absences);
    }

    const columns = useMemo(
        () => columnsDataTableAbsence(t, mutate),
        [t, mutate],
    );

    return isLoading ? (
        <p> carregando </p>
    ) : (
        <div className="m-4">
            <CardTitle>{t("title")}</CardTitle>
            <div className="w-full">
                <DataTable
                    data={absences.data.absences}
                    columns={columns}
                    filterItem="date"
                    t={t}
                />
            </div>
        </div>
    );
}
