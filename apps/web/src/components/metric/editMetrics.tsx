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
import {  updateMetricSchema } from "@/schema/metric.schema";
import { Metric } from "@/types/metric.type";
import { Edit, Pencil } from "lucide-react";
import { updateMetricById } from "@/fetch/metric/updateMetriccById";


export function EditMetric({metric, mutate}: {metric: Metric, mutate: any}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateMetricSchema>>({
    resolver: zodResolver(updateMetricSchema),
  });

  const onSubmit = async (values: z.infer<typeof updateMetricSchema>) => {
    const data = await updateMetricById(values, metric.id);
    if (data.statusCode !== 201) {
      toast({
        title: "Something went wrong",
        description: data.message,
        variant: "destructive",
      });
      form.reset({name: "", weight: 0, type: undefined});
    }
    toast({
      title: "Metric updated",
      description: <p>{data.name}</p>
    });
    mutate()
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon"><Pencil/></Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Edit metric</SheetTitle>
          <SheetDescription>Edit the fields bellow</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                defaultValue={metric.name}
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
                defaultValue={metric.weight}
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
                defaultValue={metric.type}
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
              <Button type="submit">Editar</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
//TODO Alterar esse design das metricas feitas
