"use client";

import { useEffect, useState } from "react";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Badge } from "@/repo/ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/repo/ui/components/ui/tabs";
import {
  ChevronLeft,
  Download,
  Filter,
  Plus,
  Search,
  FileText,
  BarChart,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/repo/ui/components/ui/table";
import { Progress } from "@/repo/ui/components/ui/progress";
import useSWR from "swr";
import { fetchAssessmentsByEmployee } from "@/fetch/assessment/fetchAssessmentsByEmployee";
import { Assessment, MetricsWithGrade } from "@/types/assesement.type";
import { Input } from "@/repo/ui/components/ui/input";

function ScoreBadge({ metric }: { metric: MetricsWithGrade[] }) {
  if (metric === null || metric.length === 0) {
    return <span className="text-gray-500">-</span>;
  }

  const score =
    metric.reduce((acc, grade) => {
      if (grade.score === 0) {
        return acc;
      }
      return acc + grade.score;
    }, 0) / metric.length;
  return (
    <Badge
      className={
        score >= 3
          ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
          : score > 2
            ? "bg-blue-100 text-blue-800 hover:text-blue-100 hover:bg-blue-800"
            : "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
      }
    >
      {score}
    </Badge>
  );
}

export default function AssessmentPage({ params }: { params: { id: string } }) {
  // Sample data
  const {
    data: assessmentsData,
    isLoading,
    error,
  } = useSWR<Assessment[]>(
    { name: `api/assessments/${params.id}`, args: params.id },
    fetchAssessmentsByEmployee,
  );
  return (
    <main className="space-y-4 mx-5 mt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/${params.id}`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Avaliações de Desempenho</h1>
        </div>
        <Link href={`assessments/add?employee=${params.id}`}>
          <Button variant="default" size="sm" className="h-8 gap-2">
            <Plus className="h-4 w-4" />
            Nova Avaliação
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Summary */}
        <div className="space-y-4">
          <Card className="border-[1px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Resumo de Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Média Geral</span>
                    <span className="text-sm font-medium">88.75%</span>
                  </div>
                  <Progress value={88.75} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      Avaliações Realizadas
                    </span>
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      Avaliações Pendentes
                    </span>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      Melhor Avaliação
                    </span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      Pior Avaliação
                    </span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="border-[1px]">
          TODO: Add Competencies
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Competências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competencies.map((comp) => (
                  <div key={comp.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{comp.name}</span>
                      <span className="text-sm font-medium">{comp.score}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={comp.score} className="h-2" />
                      <div
                        className="absolute top-0 h-2 w-0.5 bg-gray-800"
                        style={{
                          left: `${comp.target}%`,
                        }}
                        title={`Meta: ${comp.target}%`}
                      />
                    </div>
                    <div className="flex justify-end mt-0.5">
                      <span className="text-xs text-gray-500">
                        Meta: {comp.target}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Right Column - Assessment List */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full border-b grid grid-cols-3 rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
              >
                Histórico
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
              >
                Pendentes
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
              >
                Tendências
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="pt-4">
              <Card className="border-[1px]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-gray-700">
                      Histórico de Avaliações
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        Filtrar
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Buscar avaliações..."
                        className="pl-8 h-9"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os períodos</SelectItem>
                        <SelectItem value="2024-q1">2024 - Q1</SelectItem>
                        <SelectItem value="2023-q4">2023 - Q4</SelectItem>
                        <SelectItem value="2023-q3">2023 - Q3</SelectItem>
                        <SelectItem value="2023-q2">2023 - Q2</SelectItem>
                        <SelectItem value="2023-q1">2023 - Q1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Período</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Avaliador</TableHead>
                        <TableHead>Pontuação</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessmentsData &&
                        assessmentsData.map((assessment) => (
                          <TableRow key={assessment.id}>
                            <TableCell>
                              Q
                              {(new Date(assessment.period_end).getMonth() +
                                3) /
                                3}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                assessment.created_at,
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{assessment.evaluator.name}</TableCell>
                            <TableCell>
                              <ScoreBadge metric={assessment.metrics} />
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  assessment.status === "Concluído"
                                    ? "bg-green-100 text-green-800 hover:text-green-100 hover:bg-green-800"
                                    : "bg-amber-100 text-amber-800 hover:text-amber-100 hover:bg-amber-800"
                                }
                              >
                                {assessment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="pt-4">
              <Card className="border-[1px]">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Avaliações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessmentsData &&
                      assessmentsData
                        .filter((assessment) => assessment.status === "DRAFT")
                        .map((assessment) => {
                          const limitDate = new Date(assessment.created_at);
                          limitDate.setDate(limitDate.getDate() + 30);
                          return (
                            <Card key={assessment.id} className="border-[1px]">
                              <CardHeader className="pb-2">
                                <div className="flex items-start gap-3">
                                  <div className="bg-amber-50 text-amber-500 p-2 rounded-md">
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <CardDescription className="text-xs">
                                      {new Date(
                                        assessment.period_start,
                                      ).toLocaleDateString()}{" "}
                                    </CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-500">Data Limite</p>
                                    <p className="font-medium">
                                      {limitDate.toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Avaliador</p>
                                    <p className="font-medium">
                                      {assessment.evaluator.name}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-0 flex justify-between">
                                <Badge className="bg-amber-100 text-amber-800">
                                  Pendente
                                </Badge>
                                <Button size="sm">Iniciar Avaliação</Button>
                              </CardFooter>
                            </Card>
                          );
                        })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="pt-4">
              <Card className="border-[1px]">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Tendências de Desempenho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Gráfico de tendências seria exibido aqui
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
