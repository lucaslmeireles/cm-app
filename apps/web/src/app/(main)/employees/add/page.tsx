"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";

import { addEmployeeForm } from "@/schema/employee.schema";
import { Input } from "@/repo/ui/components/ui/input";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import {
    Form,
    FormControl,
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
import { Department } from "@/types/department.type";
import { Job } from "@/types/job.type";
import { Employee } from "@/types/employee.type";
import { mutate } from "swr";
import { isAuthorized } from "@/helpers/isAuthorized";
import { AddEmployee } from "@/components/employee/addEmployee";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { DepartmentForm } from "@/components/department/departmentsForm";
import { BirthdayControl } from "@/components/employee/birthdayControl";
import { EntryControl } from "@/components/employee/entryControl";
import { AddFormation } from "@/components/formation/addFormation";
import { AddPosition } from "@/components/position/addPosition";

export default function Employees() {
    const t = useTranslations("Employee.Add");
    const { toast } = useToast();
    const [status, setStatus] = useState("idle");
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
            setEmployee(res.data);
            mutate("/api/employees");
            form.reset;
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
        <>
            <Card className="border-none mx-5 shadow-none	">
                <CardHeader className="flex flex-row justify-between">
                    <div>
                        <CardTitle>{t("title")}</CardTitle>
                        <CardDescription>{t("description")}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {!employee && (
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
                                                <FormLabel>
                                                    {t("name")}
                                                </FormLabel>
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
                                                <FormLabel>
                                                    {t("email")}
                                                </FormLabel>
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
                                                <FormLabel>
                                                    {t("phone")}
                                                </FormLabel>
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
                                                <BirthdayControl
                                                    field={field}
                                                />
                                            );
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="entry_date"
                                        render={({ field }) => {
                                            return (
                                                <EntryControl field={field} />
                                            );
                                        }}
                                    />
                                    {/* Current Position*/}
                                    <LoadingButton status={status}>
                                        {t("btn_add")}
                                    </LoadingButton>
                                </form>
                            </Form>
                        </div>
                    )}
                    {employee && (
                        <>
                            <AddFormation employee={employee} />
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
