"use client";

import { Button } from "@/repo/ui/components/ui/button";
import { Input } from "@/repo/ui/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/repo/ui/components/ui/sheet";

import {
    Form,
    FormControl,
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Metric } from "@/types/metric.type";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Department } from "@/types/department.type";
import {
    departmentSchema,
    updateDepartmentSchema,
} from "@/schema/department.schema";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { postNewDepartment } from "@/fetch/department/postNewDepartment";
import Link from "next/link";
import { updateDepartment } from "@/fetch/department/udpateDepartment";
import { Pencil } from "lucide-react";
import { Job } from "@/types/job.type";
import { fetchJobs } from "@/fetch/job/fetchJobs";
import { fetchManagers } from "@/fetch/managers/fetchManagers";
import { useTranslations } from "next-intl";

export function EditDepartment({ department }: { department: Department }) {
    const t = useTranslations("Department");
    const { toast } = useToast();
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [managers, setManagers] = useState<Manager[]>([]);
    const form = useForm<z.infer<typeof departmentSchema>>({
        resolver: zodResolver(departmentSchema),
    });

    useEffect(() => {
        const getData = async () => {
            const metrics = await fetchMetrics();
            setMetrics(metrics);
            const jobs = await fetchJobs();
            setJobs(jobs);
            form.reset({
                metric_id: [...metrics.map((metric) => metric.id)],
                job_id: [...jobs.map((job) => job.id)],
            });
        };
        getData();
    }, []);
    const onSubmit = async (values: z.infer<typeof updateDepartmentSchema>) => {
        values.id = department.id;
        const data = await updateDepartment(values);
        console.log(data);
        if (data.statusCode !== 201) {
            toast({
                title: "Something went wrong",
                description: data.message,
                variant: "destructive",
            });
            return false;
        }
        toast({
            title: "Department updated",
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <Pencil height={18} />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{t("title_edit")}</SheetTitle>
                    <SheetDescription>{t("description_edit")}</SheetDescription>
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("name")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="name"
                                                {...field}
                                                defaultValue={department.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="metric_id"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">
                                                {t("metric")}
                                            </FormLabel>
                                        </div>
                                        {metrics.length > 0 ? (
                                            metrics.map((metric) => (
                                                <FormField
                                                    key={metric.id}
                                                    control={form.control}
                                                    name="metric_id"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                defaultValue={[]}
                                                                key={metric.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            metric.id,
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            const updatedValue =
                                                                                field.value ||
                                                                                [];
                                                                            if (
                                                                                checked
                                                                            ) {
                                                                                field.onChange(
                                                                                    [
                                                                                        ...updatedValue,
                                                                                        metric.id,
                                                                                    ],
                                                                                );
                                                                            } else {
                                                                                field.onChange(
                                                                                    updatedValue.filter(
                                                                                        (
                                                                                            value,
                                                                                        ) =>
                                                                                            value !==
                                                                                            metric.id,
                                                                                    ),
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {
                                                                        metric.name
                                                                    }{" "}
                                                                    <small>
                                                                        {
                                                                            metric.type
                                                                        }
                                                                    </small>
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <Link href={"/metrics"}>
                                                No metrics found create some
                                                first
                                            </Link>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="job_id"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">
                                                {t("jobs")}
                                            </FormLabel>
                                        </div>
                                        {jobs.length > 0 ? (
                                            jobs.map((job) => (
                                                <FormField
                                                    key={job.id}
                                                    control={form.control}
                                                    name="job_id"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                defaultValue={[]}
                                                                key={job.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            job.id,
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            const updatedValue =
                                                                                field.value ||
                                                                                [];
                                                                            if (
                                                                                checked
                                                                            ) {
                                                                                field.onChange(
                                                                                    [
                                                                                        ...updatedValue,
                                                                                        job.id,
                                                                                    ],
                                                                                );
                                                                            } else {
                                                                                field.onChange(
                                                                                    updatedValue.filter(
                                                                                        (
                                                                                            value,
                                                                                        ) =>
                                                                                            value !==
                                                                                            job.id,
                                                                                    ),
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {job.name}{" "}
                                                                    <small>
                                                                        {
                                                                            job.type
                                                                        }
                                                                    </small>
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <Link href={"/jobs"}>
                                                No jobs found create some first
                                            </Link>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
