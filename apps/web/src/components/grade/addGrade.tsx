"use client";
import { gradeSchemaPost } from "@/schema/grade.schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/repo/ui/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/repo/ui/components/ui/select";

import { Input } from "@/repo/ui/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/repo/ui/components/ui/use-toast";
import { Button } from "@/repo/ui/components/ui/button";
import { useEffect, useState } from "react";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Metric } from "@/types/metric.type";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/repo/ui/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { postNewGrade } from "@/fetch/grade/postNewGrade";
import useStore from "@/store/metric.store";
import useGrade from "@/store/grade.store";

export function AddGrade({ employee_id }) {
    const [metric, setMetric] = useState<Metric[]>([]);
    const addMetric = useStore((state) => state.addMetric);
    const addGrade = useGrade((state) => state.addGrade);
    useEffect(() => {
        const getData = async () => {
            const data = await fetchMetrics();
            setMetric(data);
        };
        getData();
    }, []);
    const form = useForm<z.infer<typeof gradeSchemaPost>>({
        resolver: zodResolver(gradeSchemaPost),
    });

    async function onSubmit(data: z.infer<typeof gradeSchemaPost>) {
        try {
            const post = await postNewGrade({
                ...data,
                employee_id,
            });
            if (post) {
                toast({
                    title: "Grade created",
                    type: "foreground",
                });
                form.reset();
                addMetric({
                    score: data.score,
                    metric: metric.find((item) => item.id === data.metric_id),
                });
                addGrade(post.id);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const FormMetric = () => {
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/5 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="metric_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Metric</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a metric to give a grade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {metric.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="score"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Score</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="100"
                                        onValueChange={field.onChange}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add</Button>
                </form>
            </Form>
        );
    };
    return <FormMetric />;
}
