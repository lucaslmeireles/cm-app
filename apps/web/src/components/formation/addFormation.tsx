"use client";

import { Input } from "@/repo/ui/components/ui/input";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";

import { cn } from "@/repo/ui/lib/utils";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/repo/ui/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/repo/ui/components/ui/command";

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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formationSchema } from "@/schema/formation.schema";
import { Button } from "@/repo/ui/components/ui/button";
import { Employee } from "@/types/employee.type";
import { CourseType, FormationType } from "@/types/formation.type";
import { postNewFormation } from "@/fetch/formation/addFormation";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export function AddFormation({ employee }: { employee: Employee }) {
    const [status, setStatus] = useState("idle");
    const [formation, setFormation] = useState<FormationType[]>([]);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formationSchema>>({
        resolver: zodResolver(formationSchema),
    });

    async function onSubmit(data: z.infer<typeof formationSchema>) {
        try {
            data.employee_id = employee.id;
            const res = await postNewFormation(data);
            toast({
                title: "Formation created",
                description: (
                    <>
                        <p>{data.name}</p>
                        <small>{data.type}</small>
                    </>
                ),
            });
            setStatus("success");
            form.reset();
            setFormation((prev) =>
                prev.push({ name: data.name, type: data.type }),
            );
            setStatus("idle");
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: e.message,
                variant: "destructive",
            });
            setStatus("error");
        }
    }

    const types = Object.values(CourseType);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="font-semibold">Adicionar Formações</h2>
                <FormField
                    control={form.control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tipo</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? types
                                                      .find(
                                                          (type) =>
                                                              type ===
                                                              field.value,
                                                      )
                                                      ?.toString()
                                                : "Select tpye"}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search type..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No type found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {types.map((type) => (
                                                    <CommandItem
                                                        value={type}
                                                        key={type}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "type",
                                                                type,
                                                            );
                                                        }}
                                                    >
                                                        {type}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                type ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row align-middle items-center gap-3">
                    <LoadingButton type="submit" status={status}>
                        {formation.length > 0
                            ? "Adicionar mais uma"
                            : "Adicionar"}
                    </LoadingButton>
                    <Button disabled={formation.length > 0}>
                        <Link href={"/employees"}>Finalizar</Link>
                    </Button>
                </div>
                <div>
                    {formation.length > 0 &&
                        formation.map((e) => {
                            return (
                                <div key={e.name}>
                                    <p>{e.name}</p>
                                    <p>{e.type}</p>
                                </div>
                            );
                        })}
                </div>
            </form>
        </Form>
    );
}
