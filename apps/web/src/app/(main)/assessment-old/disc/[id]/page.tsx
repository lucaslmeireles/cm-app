"use client";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Metric } from "@/types/metric.type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    flexRender,
    getFilteredRowModel,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/repo/ui/components/ui/table";

import { postNewAssessment } from "@/fetch/assessment/postNewAssessment";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { EmployeeCard } from "@/components/employee/employeeCard";

import { ColumnDef } from "@tanstack/react-table";
import { InputGrade } from "@/components/grade/inputGrade";
import { useTranslations } from "next-intl";
import GradeCard from "@/components/assessment/gradeCard";
import { postNewDisc } from "@/fetch/assessment/disc/postNewDisc";

const validateScores = (value) => {
    console.log(value);
    const isValid = value.every((data) => {
        const score = Number(data.score);
        const isValidScore = !isNaN(score) && score >= 0 && score <= 5;
        console.log(isValidScore, score, data.score);
        if (!isValidScore) {
            throw new Error("Score must be a number between 0 and 5");
        }
        return isValidScore;
    });

    console.log("All scores valid:", isValid);
    return isValid;
};

export default function DiscEmployee() {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const t = useTranslations("Assessment");
    const [data, setData] = useState([
        { name: "D" },
        { name: "I" },
        { name: "S" },
        { name: "C" },
    ]);

    async function onSubmit(id, value) {
        setStatus("loading");
        try {
            //TODO VERIFICAR SE AS GRADES ESTAO NO RANGE ATE 100
            validateScores(value);
            const transformedObject = {
                employee_id: id,
            };

            for (let key in value) {
                if (!value[key].name) continue; // Ignora o employee_id
                transformedObject[value[key].name] = value[key].score;
            }
            console.log(transformedObject);
            const data = await postNewDisc(transformedObject);
            console.log(data);
            setStatus("success");
            toast({
                title: "Disc sent!",
                variant: "default",
                duration: 1000,
            });
            router.push("/employees");
        } catch (error) {
            setStatus("error");
            toast({
                title: error.message,
                variant: "destructive",
            });
            setStatus("idle");
        }
    }

    const columnsDataTableMetric: ColumnDef = [
        {
            accessorKey: "name",
            header: t("metric"),
        },
        {
            accessorKey: "score",
            header: t("score"),
            cell: InputGrade,
        },
    ];

    const table = useReactTable({
        data,
        columns: columnsDataTableMetric,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        meta: {
            updateData: (rowId, columnId, value) =>
                setData((prev) =>
                    prev.map((row, index) =>
                        index === rowId
                            ? {
                                  ...prev[rowId],
                                  [columnId]: Number(value),
                              }
                            : row,
                    ),
                ),
        },
    });

    return (
        <div className="m-8">
            <div className="pb-5">
                <h2 className="text-xl font-semibold">{t("new_assessment")}</h2>
                <p>{t("new_assessment_description")}</p>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="w-full flex h-fit flex-row justify-around">
                        <div className="rounded-md border w-8/12">
                            <Table>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => {
                                                        return (
                                                            <TableHead
                                                                key={header.id}
                                                            >
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                          header
                                                                              .column
                                                                              .columnDef
                                                                              .header,
                                                                          header.getContext(),
                                                                      )}
                                                            </TableHead>
                                                        );
                                                    },
                                                )}
                                            </TableRow>
                                        ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            <div className="flex items-center justify-end space-x-2 py-4 mx-4">
                                <LoadingButton
                                    status={status}
                                    onClick={() => onSubmit(id, data)}
                                >
                                    {t("new_assessment_button")}
                                </LoadingButton>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <EmployeeCard id={id} />
                            <GradeCard />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
