"use client";

import { addEmployeeForm } from "@/schema/employee.schema";
import { Button } from "@/repo/ui/components/ui/button";
import { Input } from "@/repo/ui/components/ui/input";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/repo/ui/components/ui/sheet";

import { cn } from "@/repo/ui/lib/utils";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/repo/ui/components/ui/popover";

import { Check, ChevronsUpDown, Circle } from "lucide-react";

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

import { PhoneInput } from "@/repo/ui/components/ui/phone-input";

import { useToast } from "@/repo/ui/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postNewEmployee } from "@/fetch/employee/postNewEmployee";
import { useEffect, useState } from "react";
import { fetchJobs } from "@/fetch/job/fetchJobs";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { Department } from "@/types/department.type";
import { Job } from "@/types/job.type";
import { BirthdayControl } from "./birthdayControl";
import { EntryControl } from "./entryControl";
import { AddFormation } from "../formation/addFormation";
import { Employee } from "@/types/employee.type";
import { useTranslations } from "next-intl";
import { mutate } from "swr";
import { DepartmentForm } from "../department/departmentsForm";
import { isAuthorized } from "@/helpers/isAuthorized";

export function AddEmployee() {
    const t = useTranslations("Employee.Add");
    const { toast } = useToast();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [deps, setDeps] = useState<Department[]>([]);
    const [status, setStatus] = useState("idle");
    const [page, setPage] = useState(1);
    const [employee, setEmployee] = useState<Employee>();
    const [isAdmin, setIsAdmin] = useState(false);
    // Verificar autorização de forma segura usando useEffect
    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const authorized = await isAuthorized(2);
                setIsAdmin(authorized);
            } catch (error) {
                console.error("Error checking authorization:", error);
                setIsAdmin(false);
            }
        };

        checkAuthorization();
    }, []);
    const form = useForm<z.infer<typeof addEmployeeForm>>({
        resolver: zodResolver(addEmployeeForm),
    });

    const onSubmit = async (values: z.infer<typeof addEmployeeForm>) => {
        const { image, ...dataSafe } = values;
        setStatus("loading");
        try {
            const res = await postNewEmployee(dataSafe);
            toast({
                title: "Employee created",
            });
            setStatus("success");
            form.reset();
            setPage(2);
            setEmployee(res.data);
            mutate("/api/employees");
            setStatus("idle");
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
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default" disabled={!isAdmin}>
                    {t("title")}
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{t("title")}</SheetTitle>
                    <SheetDescription>{t("description")}</SheetDescription>
                </SheetHeader>
                {
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("name")}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("email")}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* TODO Adicionar verficiação de matricula */}
                                <FormField
                                    control={form.control}
                                    name="register"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("register")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("phone")}</FormLabel>
                                            <FormControl>
                                                <PhoneInput {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DepartmentForm form={form} t={t} />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("address")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birthday"
                                    render={({ field }) => {
                                        return (
                                            <BirthdayControl field={field} />
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="entry_date"
                                    render={({ field }) => {
                                        return <EntryControl field={field} />;
                                    }}
                                />
                                {/* Current Position*/}

                                <LoadingButton status={status}>
                                    {t("btn_add")}
                                </LoadingButton>
                            </form>
                        </Form>
                    </div>
                }
            </SheetContent>
        </Sheet>
    );
}
