import { Button } from "@/repo/ui/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/repo/ui/components/ui/form";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/repo/ui/components/ui/sheet";
import { Input } from "@/repo/ui/components/ui/input";
import { Switch } from "@/repo/ui/components/ui/switch";

import { positionSchemaForm } from "@/schema/postion.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { useState } from "react";
import { DepartmentForm } from "../department/departmentsForm";
import { EmployeeForm } from "../employee/employeeForm";
import { Employee } from "@/types/employee.type";
import { useTranslations } from "next-intl";

export function AddPosition() {
    const t = useTranslations("Employee.Add");
    const form = useForm<z.infer<typeof positionSchemaForm>>({
        resolver: zodResolver(positionSchemaForm),
    });
    const [status, setStatus] = useState("idle");
    const onSubmit = (data: z.infer<typeof positionSchemaForm>) => {};
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Adicionar Cargo</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Adicione o cargo atual</SheetTitle>
                    <SheetDescription>
                        Crie um novo cargo ou adicione o funcionario a um
                        existente
                    </SheetDescription>
                </SheetHeader>
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
                                name="level"
                                defaultValue={0}
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
                                name="is_active"
                                defaultValue={true}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("name")}</FormLabel>
                                        <FormControl>
                                            {/* <Switch defaultChecked /> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="max_slots"
                                defaultValue={0}
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
                            <DepartmentForm form={form} />
                            <EmployeeForm form={form} />
                            {/*JobForm*/}
                            <LoadingButton status={status}>
                                {t("btn_add")}
                            </LoadingButton>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
