import { calculateColor } from "@/helpers/calculateColor";
import { Employee } from "@/types/employee.type";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/repo/ui/components/ui/dropdown-menu";

import { EllipsisVertical } from "lucide-react";
import { calculateTendency } from "@/helpers/calculateTendency";
import Link from "next/link";

export const columnsDataTableEmployee = (
    t: (key: string) => string,
    isAdmin: boolean,
): ColumnDef<Employee>[] => [
    {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => {
            return (
                <Link href={`employees/${encodeURIComponent(row.original.id)}`}>
                    {row.original.name}
                </Link>
            );
        },
    },
    {
        accessorKey: "register",
        header: t("register"),
    },
    {
        accessorKey: "department.name",
        header: t("department"),
        cell: ({ row }) => {
            return row.original.department.map((dep) => (
                <div key={dep.name}>
                    <h4>{dep.name}</h4>
                </div>
            ));
        },
    },
    {
        accessorKey: "current_postion",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={`employees/${encodeURIComponent(row.original.id)}`}
                            >
                                {t("view")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                {t("create")}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Link
                                            href={`assessment/${encodeURIComponent(row.original.id)}`}
                                        >
                                            {t("assessment")}
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={`assessment/disc/${encodeURIComponent(row.original.id)}`}
                                        >
                                            DISC
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={`absences/${encodeURIComponent(row.original.id)}`}
                                        >
                                            Falta
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        Courses - Desativado
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        {isAdmin && (
                            <DropdownMenuItem>
                                <Link
                                    href={`admin/promote/${encodeURIComponent(row.original.id)}`}
                                >
                                    {t("promote")}
                                </Link>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
