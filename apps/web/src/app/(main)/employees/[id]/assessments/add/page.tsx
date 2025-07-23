"use client";
import { useEffect, useState } from "react";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/repo/ui/components/ui/form";
import { Input } from "@/repo/ui/components/ui/input";
import { Textarea } from "@/repo/ui/components/ui/textarea";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { cn } from "@/repo/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/repo/ui/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/repo/ui/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/repo/ui/components/ui/card";
import Link from "next/link";
import { assessmentSchemaForm } from "@/schema/assessment.schema";
import * as z from "zod";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Metric } from "@/types/metric.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/repo/ui/components/ui/select";
import { useSearchParams } from "next/navigation";
import { postNewAssessment } from "@/fetch/assessment/postNewAssessment";
import { getUser } from "@/helpers/getUser";

export default function AddAssessmentForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<Metric[]>();
  const [isLoading, setIsLoading] = useState(true);
  const employee_id = useSearchParams().get("employee");
  const form = useForm<z.infer<typeof assessmentSchemaForm>>({
    resolver: zodResolver(assessmentSchemaForm),
    defaultValues: {
      period_start: new Date(),
      period_end: new Date(),
      status: "DRAFT",
      metrics: [],
      comments: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMetrics();
      console.log(res);
      if (!res) return;
      setMetrics(res);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  async function onSubmit(data: z.infer<typeof assessmentSchemaForm>) {
    const user = await getUser();
    try {
      if (!employee_id || !user?.id) {
        toast({
          title: "Erro ao criar avaliação",
          description: "Colaborador não encontrado",
          variant: "destructive",
        });
        return;
      }
      if (!data.metrics) {
        toast({
          title: "Erro ao criar avaliação",
          description: "Métricas não encontradas",
          variant: "destructive",
        });
        return;
      }
      const res = await postNewAssessment({
        employee_id,
        evaluator_id: user.id,
        status: data.status || "DRAFT",
        period_start: data.period_start || new Date(),
        period_end: data.period_end || new Date(),
        metrics: data.metrics.map(
          (metric: { metric_id: string; score: number }) => ({
            metric_id: metric.metric_id,
            employee_id,
            score: metric.score,
          }),
        ),
        comments: data.comments,
      });

      toast({
        title: "Avaliação criada com sucesso",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao criar avaliação",
        description: error.error.message,
        variant: "destructive",
      });
    }
    setOpen(false);
    form.reset();
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Link href={`/employees/${employee_id}`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Avaliações de Desempenho</h1>
        </div>
        <CardDescription>
          Configure os detalhes da avaliação de desempenho. Clique em salvar
          quando terminar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="period_start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data inicio da avaliação</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period_end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data fim da avaliação</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Comentários</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comente sobre o desempenho do colaborador"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Rascunho</SelectItem>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="COMPLETED">Completado</SelectItem>
                        <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Metricas</h3>
              <div className="space-y-6 max-w-3xl self-center">
                {!isLoading &&
                  metrics &&
                  metrics.map((metric) => (
                    <FormField
                      key={metric.id}
                      control={form.control}
                      defaultValue={[]}
                      name={"metrics"}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel>{metric.name}</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value)
                                  : 0;
                                const metrics = [...(field.value || [])];
                                const metricIndex = metrics.findIndex(
                                  (m) => m.metric_id === metric.id,
                                );
                                if (metricIndex >= 0) {
                                  metrics[metricIndex].score = value;
                                } else {
                                  metrics.push({
                                    metric_id: metric.id,
                                    score: value,
                                    employee_id: employee_id,
                                  });
                                }

                                field.onChange(metrics);
                              }}
                              value={
                                field.value?.find(
                                  (m) => m.metric_id === metric.id,
                                )?.score || ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
