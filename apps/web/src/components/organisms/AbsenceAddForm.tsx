"use client";

import { useEffect, useState } from "react";
import { Button } from "@/repo/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/repo/ui/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/repo/ui/components/ui/form";

import { useToast } from "@/repo/ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus } from "lucide-react";

import { absenceSchemaForm } from "@/schema/absence.schema";
import { postNewAbsence } from "@/fetch/absence/postNewAbsence";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { getUser } from "@/helpers/getUser";
import { mutate } from "swr";
import { Textarea } from "@/repo/ui/components/ui/textarea";
import { DropZoneInput } from "../molecules/DropZoneInput";
import { SelectInput } from "../molecules/SelectInput";
import { DateInput } from "../molecules/DateInput";

const absenceTypes = [
    { label: "Férias", value: "VACATION" },
    { label: "Afastamento Médico", value: "SICK_LEAVE" },
    { label: "Licença Não Remunerada", value: "UNPAID_LEAVE" },
    { label: "Outros", value: "OTHER" },
];

export function AddAbsenceForm({ employeeId }: { employeeId: string }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("idle");
    const form = useForm<z.infer<typeof absenceSchemaForm>>({
        resolver: zodResolver(absenceSchemaForm),
    });

    useEffect(() => {
        setStatus("idle");
    }, [open]);
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof absenceSchemaForm>) => {
        const user = await getUser();
        console.log(user);
        if (!user && user?.employee_id) {
            toast({
                title: "Erro",
                description: "Usuário não encontrado",
                variant: "destructive",
            });
            return;
        }
        const data = {
            ...values,
            employee_id: employeeId,
            approver_id: user?.employee_id, //TODO APENAS TESTE PEGAR O USER AQUi
        };
        console.log(data);
        setStatus("loading");
        try {
            const res = await postNewAbsence(data);
            console.log(res);
            toast({
                title: "Falta criada",
                description: (
                    <>
                        <p>{format(res.data.date, "PPP", { locale: ptBR })}</p>
                    </>
                ),
            });
            setStatus("success");
            mutate(`api/absence/${employeeId}`);
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: e.message,
                variant: "destructive",
            });
            setStatus("error");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Nova Ausência
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Registrar Nova Ausência</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes da ausência do colaborador. Clique
                        em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Ausência</FormLabel>
                                    <SelectInput
                                        field={field}
                                        selectTitle="Selecione o tipo de ausência"
                                        selectList={absenceTypes}
                                    />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <DateInput field={field} span="Selecione a data de inicio" name="Data de inicio" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <DateInput field={field} span="Selecione a data de termino" name="Data de termino" optional validationFn={(date) => {
                                            const startDate =
                                                form.getValues(
                                                    "start_date",
                                                );
                                            return startDate
                                                ? date < startDate
                                                : false;
                                        }} />
                                        <FormDescription>
                                            Opcional para ausências de um dia
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="justification"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Justificativa</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descreva o motivo da ausência"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <SelectInput field={field} selectTitle="Selecione o status" selectList={[
                                        { value: "Pendente", label: "Pendente" },
                                        { value: "Aprovada", label: "Aprovada" },
                                        { value: "Rejeitada", label: "Rejeitada" },
                                        { value: "Planejada", label: "Planejada" },
                                        { value: "Cancelada", label: "Cancelada" },
                                    ]} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="documents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Anexos (opcional)</FormLabel>
                                    <FormControl>
                                        <DropZoneInput field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <LoadingButton status={status} type="submit">
                                Salvar
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
