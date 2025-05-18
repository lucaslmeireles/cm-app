"use client";
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/repo/ui/components/ui/form";

import { absenceSchemaForm } from "@/schema/absence.schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleFadingPlus, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { AbsenceControl } from "@/components/absence/absenceControl";
import { Input } from "@/repo/ui/components/ui/input";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { patchAbsenceById } from "@/fetch/absence/patchAbsenceById";
import { Absence } from "@/types/absence.type";

export const EditAbsence = ({
    absence,
    mutate,
}: {
    absence: Absence;
    mutate: any;
}) => {
    const [status, setStatus] = useState("idle");
    const form = useForm<z.infer<typeof absenceSchemaForm>>({
        resolver: zodResolver(absenceSchemaForm),
    });
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof absenceSchemaForm>) => {
        console.log(values);
        const data = {
            ...values,
            employee_id: absence.employeeId,
        };
        setStatus("loading");
        try {
            const res = await patchAbsenceById(data, absence.id);
            console.log(res);
            toast({
                title: "Falta atualizada",
                description: (
                    <>
                        {/* <p>{format(res.data.date, "PPP", {locale: ptBR})}</p> */}
                    </>
                ),
            });
            setStatus("success");
            mutate();
            form.reset();
            setStatus("idle");
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: e.message,
                variant: "destructive",
            });
            setStatus("error");
            setStatus("loading");
        }
    };

    return (
        <Form {...form}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <Pencil />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar falta</DialogTitle>
                        <DialogDescription>Editar essa falta</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="date"
                            defaultValue={new Date(absence.date)}
                            render={({ field }) => {
                                return <AbsenceControl field={field} />;
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="justification"
                            defaultValue={absence.justification}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Justificativa</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="justificativa"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <DialogFooter>
                        <LoadingButton
                            status={status}
                            type="submit"
                            onClick={() => onSubmit(form.getValues())}
                        >
                            Enviar
                        </LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Form>
    );
};
