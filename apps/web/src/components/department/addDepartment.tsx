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

import { useToast } from "@/repo/ui/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Metric } from "@/types/metric.type";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Department } from "@/types/department.type";
import { departmentSchema } from "@/schema/department.schema";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { postNewDepartment } from "@/fetch/department/postNewDepartment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

export function AddDepartment() {
  const t = useTranslations("Department");
  const { toast } = useToast();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof departmentSchema>>({
    resolver: zodResolver(departmentSchema),
  });
  const [deps, setDeps] = useState<Department[]>([]);

  useEffect(() => {
    const getData = async () => {
      const metrics = await fetchMetrics();
      setMetrics(metrics);
    };
    getData();
  }, [open]);
  const onSubmit = async (values: z.infer<typeof departmentSchema>) => {
    const data = await postNewDepartment(values);
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
      title: t("success"),
      description: (
        <>
          <p>{data.data.name}</p>
        </>
      ),
    });
    form.reset();
    router.refresh();
    setDeps([...deps, values as Department]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="mt-2 w-4/12"
          variant="expandIcon"
          Icon={Plus}
          iconPlacement="right"
        >
          Criar
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{t("title_add")}</SheetTitle>
          <SheetDescription>{t("description_add")}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
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
                      <FormLabel className="text-base">{t("metric")}</FormLabel>
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
                                    checked={field.value?.includes(metric.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = field.value || [];
                                      if (checked) {
                                        field.onChange([
                                          ...updatedValue,
                                          metric.id,
                                        ]);
                                      } else {
                                        field.onChange(
                                          updatedValue.filter(
                                            (value) => value !== metric.id,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {metric.name} <small>{metric.type}</small>
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))
                    ) : (
                      <Link href={"/metrics"}>
                        No metrics found create some first
                      </Link>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{t("btn_add")}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
