//TODO Revisar esse componente


"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/repo/ui/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/repo/ui/components/ui/alert-dialog";
import { Button } from "@/repo/ui/components/ui/button";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import {
    MoreHorizontal,
    Check,
    X,
    Calendar,
    Eye,
    Edit,
    Trash,
} from "lucide-react";

type AbsenceStatus =
    | "Pendente"
    | "Aprovada"
    | "Rejeitada"
    | "Planejada"
    | "Cancelada";

interface Absence {
    id: string;
    type: string;
    start_date: string;
    end_date: string;
    status: AbsenceStatus;
    approvedBy?: string;
}

interface AbsenceContextMenuProps {
    absence: Absence;
    onStatusChange?: (
        absence: Absence,
        absenceId: number,
        newStatus: AbsenceStatus,
    ) => void;
    onEdit?: (absenceId: number) => void;
    onDelete?: (absenceId: number) => void;
}

export function AbsenceContextMenu({
    absence,
    onStatusChange,
    onEdit,
    onDelete,
}: AbsenceContextMenuProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [actionType, setActionType] = useState<{
        action: AbsenceStatus;
        title: string;
        description: string;
    }>({
        action: "Aprovado",
        title: "",
        description: "",
    });
    const { toast } = useToast();

    const handleStatusChange = (status: AbsenceStatus) => {
        let title = "";
        let description = "";

        switch (status) {
            case "Aprovada":
                title = "Aprovar ausência";
                description =
                    "Tem certeza que deseja aprovar esta ausência? Esta ação não pode ser desfeita.";
                break;
            case "Rejeitada":
                title = "Rejeitar ausência";
                description =
                    "Tem certeza que deseja rejeitar esta ausência? Esta ação não pode ser desfeita.";
                break;
            case "Cancelada":
                title = "Cancelar ausência";
                description =
                    "Tem certeza que deseja cancelar esta ausência? Esta ação não pode ser desfeita.";
                break;
            case "Planejada":
                title = "Marcar como planejada";
                description =
                    "Tem certeza que deseja marcar esta ausência como planejada?";
                break;
        }

        setActionType({ action: status, title, description });
        setIsAlertOpen(true);
    };

    const confirmStatusChange = () => {
        onStatusChange(absence, absence.id, actionType.action);

        toast({
            title: "Status atualizado",
            description: `A ausência foi marcada como "${actionType.action}"`,
        });

        setIsAlertOpen(false);
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(absence.id);
        }
    };

    const handleDelete = () => {
        setActionType({
            action: "Cancelada",
            title: "Excluir ausência",
            description:
                "Tem certeza que deseja excluir esta ausência? Esta ação não pode ser desfeita.",
        });
        setIsAlertOpen(true);
    };

    const confirmDelete = () => {
        if (onDelete) {
            onDelete(absence.id);

            toast({
                title: "Ausência excluída",
                description: "A ausência foi excluída com sucesso",
            });
        }
        setIsAlertOpen(false);
    };

    // Determine which status options to show based on current status
    const showApprove =
        absence.status === "Pendente" || absence.status === "Planejada";
    const showReject =
        absence.status === "Pendente" || absence.status === "Planejada";
    const showCancel =
        absence.status !== "Cancelada" && absence.status !== "Rejeitada";
    const showPlan = absence.status === "Pendente";

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() =>
                            window.alert("Visualizar detalhes da ausência")
                        }
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar detalhes</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {/* Status change options */}
                    <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
                    {showApprove && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("Aprovada")}
                        >
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span>Aprovar</span>
                        </DropdownMenuItem>
                    )}
                    {showReject && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("Rejeitada")}
                        >
                            <X className="mr-2 h-4 w-4 text-red-500" />
                            <span>Rejeitar</span>
                        </DropdownMenuItem>
                    )}
                    {showPlan && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("Planejada")}
                        >
                            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Marcar como planejada</span>
                        </DropdownMenuItem>
                    )}
                    {showCancel && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("Cancelada")}
                        >
                            <X className="mr-2 h-4 w-4 text-amber-500" />
                            <span>Cancelar</span>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    {onEdit && (
                        <DropdownMenuItem onClick={handleEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                        </DropdownMenuItem>
                    )}
                    {onDelete && (
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="text-red-600"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{actionType.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {actionType.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={
                                actionType.title === "Excluir ausência"
                                    ? confirmDelete
                                    : confirmStatusChange
                            }
                            className={
                                actionType.action === "Aprovada"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : actionType.action === "Rejeitada" ||
                                        actionType.action === "Cancelada" ||
                                        actionType.title === "Excluir ausência"
                                      ? "bg-red-600 hover:bg-red-700"
                                      : ""
                            }
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
