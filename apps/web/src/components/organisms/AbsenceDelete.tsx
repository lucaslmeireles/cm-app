"use client";

import { deleteAbsenceById } from "@/fetch/absence/deleteAbsenceById";
import { Absence } from "@/types/absence.type";
import { DeleteItemBase } from "../molecules/DeleteItemBase";


type DeleteAbsenceProps = {
    absence: Absence;
    mutate: () => void;
};

export function DeleteAbsence({ absence, mutate }: DeleteAbsenceProps) {
    return (
        <DeleteItemBase<Absence>
            title="Excluir falta?"
            description={(a) => `Você está prestes a excluir a falta`}
            item={absence}
            onDelete={async (a) => {
                const data = await deleteAbsenceById(a.id);
                if (data.statusCode === 201) {
                    mutate();
                    return { success: true, message: data.name };
                }
                return { success: false, message: data.message };
            }}
        />
    );
}
