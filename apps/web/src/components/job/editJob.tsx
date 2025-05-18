"use client";

import { Button } from "@/repo/ui/components/ui/button";
import { Input } from "@/repo/ui/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/repo/ui/components/ui/sheet";

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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/repo/ui/components/ui/select";

import { useToast } from "@/repo/ui/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { Department } from "@/types/department.type";
import { Metric } from "@/types/metric.type";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { jobSchemaAdd } from "@/schema/job.schema";
import { postNewJob } from "@/fetch/job/postNewJob";
import Link from "next/link";
import { Edit } from "lucide-react";
import { patchJob } from "@/fetch/job/patchJob";
import { mutate } from "swr";
import { Job } from "@/types/job.type";
export function EditJob({ job }: { job: Job }) {
    const { toast } = useToast();
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [deps, setDeps] = useState<Department[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const metrics = await fetchMetrics();
            setMetrics(metrics);
            const deps = await fetchDepartments();
            setDeps(deps);
        };
        getData();
    }, [open]);

    const form = useForm<z.infer<typeof jobSchemaAdd>>({
        resolver: zodResolver(jobSchemaAdd),
    });

    const onSubmit = async (values: z.infer<typeof jobSchemaAdd>) => {
        console.log("submit", values);
        const data = await patchJob(values, job.id);
        console.log(data);
        if (data.statusCode !== 201) {
            toast({
                title: "Something went wrong",
                description: data.message,
                variant: "destructive",
            });
        }
        mutate(job.id);
        toast({
            title: "Cargo editado",
            description: (
                <>
                    <p>{data.name}</p>
                </>
            ),
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <Edit />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Edit {job.name}</SheetTitle>
                    <SheetDescription>Fill the fields bellow</SheetDescription>
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
                                defaultValue={job.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
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
                                name="type"
                                defaultValue={job.type}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={job.type}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="WhiteCollar">
                                                    WhiteCollar
                                                </SelectItem>
                                                <SelectItem value="BlueCollar">
                                                    BlueCollar
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department_id"
                                defaultValue={
                                    job.department?.map((d) => d.id) || []
                                }
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">
                                                Departments
                                            </FormLabel>
                                        </div>
                                        {deps.length > 0 ? (
                                            deps.map((dep) => (
                                                <FormField
                                                    key={dep.id}
                                                    control={form.control}
                                                    name="department_id"
                                                    defaultValue={
                                                        job.department?.map(
                                                            (d) => d.id,
                                                        ) || []
                                                    }
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={dep.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            dep.id,
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
                                                                                        dep.id,
                                                                                    ],
                                                                                );
                                                                            } else {
                                                                                field.onChange(
                                                                                    updatedValue.filter(
                                                                                        (
                                                                                            value,
                                                                                        ) =>
                                                                                            value !==
                                                                                            dep.id,
                                                                                    ),
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {dep.name}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <Link href={"/departments"}>
                                                No departments found create some
                                                first
                                            </Link>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="metric_id"
                                defaultValue={
                                    job.metrics?.map((m) => m.id) || []
                                }
                                render={(field) => {
                                    const allChecked =
                                        metrics.length > 0 &&
                                        metrics.every((metric) =>
                                            form
                                                .watch("metric_id")
                                                ?.includes(metric.id),
                                        );

                                    return (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">
                                                    Metrics
                                                </FormLabel>
                                            </div>

                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={allChecked}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            const newValue =
                                                                checked
                                                                    ? metrics.map(
                                                                          (
                                                                              metric,
                                                                          ) =>
                                                                              metric.id,
                                                                      ) // Select all
                                                                    : []; // Deselect all
                                                            form.setValue(
                                                                "metric_id",
                                                                newValue,
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Check All
                                                </FormLabel>
                                            </FormItem>

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
                                                                    key={
                                                                        metric.id
                                                                    }
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
                                    );
                                }}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}

//TODO CRIAR AGORA O DEPARTMENTO
