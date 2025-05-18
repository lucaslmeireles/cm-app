"use client";

import { useEffect, useState } from "react";
import { Button } from "@/repo/ui/components/ui/button";
import { Calendar } from "@/repo/ui/components/ui/calendar";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/repo/ui/components/ui/select";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, CalendarIcon } from "lucide-react";
import { cn } from "@/repo/ui/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/repo/ui/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { absenceSchemaForm } from "@/schema/absence.schema";
import { postNewAbsence } from "@/fetch/absence/postNewAbsence";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { getUser } from "@/helpers/getUser";
import { mutate } from "swr";
import { Textarea } from "@/repo/ui/components/ui/textarea";

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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo de ausência" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {absenceTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data de Início</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
                                                                {
                                                                    locale: ptBR,
                                                                },
                                                            )
                                                        ) : (
                                                            <span>
                                                                Selecione uma
                                                                data
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data de Término</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
                                                                {
                                                                    locale: ptBR,
                                                                },
                                                            )
                                                        ) : (
                                                            <span>
                                                                Selecione uma
                                                                data
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={
                                                        field.value || undefined
                                                    }
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                    disabled={(date) => {
                                                        const startDate =
                                                            form.getValues(
                                                                "start_date",
                                                            );
                                                        return startDate
                                                            ? date < startDate
                                                            : false;
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Opcional para ausências de um dia
                                        </FormDescription>
                                        <FormMessage />
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Pendente">
                                                Pendente
                                            </SelectItem>
                                            <SelectItem value="Aprovada">
                                                Aprovado
                                            </SelectItem>
                                            <SelectItem value="Rejeitada">
                                                Rejeitado
                                            </SelectItem>
                                            <SelectItem value="Planejada">
                                                Planejada
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">
                                                            Clique para enviar
                                                        </span>{" "}
                                                        ou arraste e solte
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PDF, PNG, JPG (MAX.
                                                        10MB)
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const files =
                                                            e.target.files;
                                                        if (files) {
                                                            field.onChange(
                                                                files,
                                                            );
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
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
