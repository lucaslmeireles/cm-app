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
import { metricSchema } from "@/schema/metric.schema";
import { postNewMetric } from "@/fetch/metric/postNewMetric";
import { useState } from "react";
import { Metric } from "@/types/metric.type";
import { revalidatePath } from "next/cache";

export function AddMetric() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const form = useForm<z.infer<typeof metricSchema>>({
    resolver: zodResolver(metricSchema),
  });
  const [allowedToSend, setAllowedToSend] = useState(true);

  const onSubmit = async (values: z.infer<typeof metricSchema>) => {
    const data = await postNewMetric(values);
    console.log(data);
    if (data.statusCode !== 201) {
      toast({
        title: "Something went wrong",
        description: data.message,
        variant: "destructive",
      });
      setMetrics([...metrics, values]);
      form.reset({name: "", weight: "", type: "SoftSkill"});
    }
    toast({
      title: "Metric created",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Add new metric</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add new metric</SheetTitle>
          <SheetDescription>Fill the fields bellow</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of the job" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HardSkill">HardSkill</SelectItem>
                        <SelectItem value="SoftSkill">SoftSkill</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <p className="text-lg font-medium">Your metrics</p>
        <div className="grid grid-cols-2 grid-rows-3 p-3 gap-3">
          {metrics.length > 0 ? (
            metrics.map((metric) => {
              return (
                <div
                  key={metric.name}
                  className="border w-fit p-3 rounded shadow-sm shadow-slate-400"
                >
                  <p className="font-medium">{metric.name}</p>
                  <p className="text-sm font-semibold">{metric.weight}</p>
                  <p className="text-sm text-slate-700">{metric.type}</p>
                </div>
              );
            })
          ) : (
            <p>No metrics yet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
//TODO Alterar esse design das metricas feitas
