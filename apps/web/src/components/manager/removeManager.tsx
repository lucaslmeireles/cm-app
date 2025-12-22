"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/repo/ui/components/ui/dialog"
import { Trash } from "lucide-react"
import { Employee } from "@/types/employee.type"
import { Manager } from "@/types/manager.type"
import { postRemoveEmployee } from "@/fetch/managers/removeEmployee"
import { LoadingButton } from "@/repo/ui/components/ui/loading-button"
import { useState } from "react"




export const RemoveManagerEmployee= ({manager, employee, mutate}: {manager: Manager, employee: Employee, mutate: any}) => {
    const [open, setOpen]  = useState(false)
    const [status, setStatus] = useState("idle");
    const onSubmit = async () => {
        try {
            setStatus("loading")
            const res = await postRemoveEmployee({
                employee_id: employee.id,
                user_id: [manager.manager_id]
            })
            setStatus("success")
            mutate(employee.id)
            setOpen(!open)
        } catch (e) {
            setStatus("error")
            console.error(e)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger><Trash/></DialogTrigger>
        <DialogContent className="py-5 h-8/12">
            <DialogHeader>
            <DialogTitle>Remover {manager.manager.employee.name}</DialogTitle>
            </DialogHeader>
            <LoadingButton onClick={() => onSubmit()} status={status} className="w-full bg-red-600 hover:bg-red-700">Remover supervisor</LoadingButton>
        </DialogContent>
        </Dialog>
    )
}