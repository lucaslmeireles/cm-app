"use client"
import { deleteFormation } from "@/fetch/formation/deleteFormation"
import { Button } from "@/repo/ui/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/repo/ui/components/ui/dialog"
import { LoadingButton } from "@/repo/ui/components/ui/loading-button"
import { useToast } from "@/repo/ui/components/ui/use-toast"
import { FormationType } from "@/types/formation.type"
import { Trash } from "lucide-react"
import { useState } from "react"

export const DeleteFormation = ({formation, mutate}: {formation: FormationType, mutate: any}) => {
    const [statusDelete, setStatusDelete] = useState("idle")
    const { toast } = useToast();
    const onDelete = async (id) => {
        try {
            const res = await deleteFormation(id)
            setStatusDelete("success")
            setStatusDelete("idle")
            mutate(formation.employee_id)
        } catch (e) {
        toast({
            title: "Something went wrong",
            description: e.message,
            variant: "destructive",
        });
        setStatusDelete("error")
        setStatusDelete("loading")
        }
    }
    return (
        <Dialog>
            <DialogTrigger><Trash/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Você tem certeza que quer apagar?</DialogTitle>
                <DialogDescription>
                    Essa ação não pode ser desfeita
                </DialogDescription>
                </DialogHeader>
                    <div className="flex flex-row">
                        <LoadingButton status={statusDelete} onClick={() => onDelete(formation.id)} className="bg-red-500 hover:bg-red-600">Apagar</LoadingButton>
                        <Button variant="ghost">Voltar</Button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}