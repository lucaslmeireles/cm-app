"use client";
import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Badge } from "@/repo/ui/components/ui/badge";
import { Button } from "@/repo/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Metric } from "@/types/metric.type";
import { Brain, ChevronRight, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { EditMetric } from "./editMetrics";
import { DeleteMetric } from "./deleteMetric";
import ErrorMessage from "../errorPage";
import { useTranslations } from "next-intl";

export default function MetricsAdmin() {
    const t = useTranslations("Metrics");
    const {
        data: metrics,
        isLoading,
        error,
        mutate,
    } = useSWR<Metric[], Error>("api/metrics", fetchMetrics);
    //todo metrics loader
    if (isLoading) return <p>Carregando</p>;
    if (error) return <ErrorMessage message={error.message} />;
    if (!metrics) return <ErrorMessage message="Metrics not found" />;

    return (
        !isLoading && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {metrics.map((metric) => (
                        <Card
                            key={metric.id}
                            className={`overflow-hidden transition-all hover:shadow-lg`}
                        >
                            <div
                                className={`h-2 bg-gradient-to-r ${
                                    metric.type === "SoftSkill"
                                        ? "from-purple-100 to-pink-100"
                                        : "from-blue-100 to-cyan-100"
                                }`}
                            />
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {metric.name}
                                    <Badge
                                        variant={
                                            metric.type === "SoftSkill"
                                                ? "secondary"
                                                : "default"
                                        }
                                    >
                                        {metric.type}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between">
                                <div className="flex items-center">
                                    {metric.type === "SoftSkill" ? (
                                        <Brain className="h-5 w-5 text-purple-500 mr-2" />
                                    ) : (
                                        <Wrench className="h-5 w-5 text-blue-500 mr-2" />
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                        {metric.type === "SoftSkill"
                                            ? t("inter_skill")
                                            : t("tech_skill")}
                                    </span>
                                </div>
                                <div>
                                    <EditMetric
                                        metric={metric}
                                        mutate={mutate}
                                    />
                                    <DeleteMetric
                                        metric={metric}
                                        mutate={mutate}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    );
}

//TODO Colocar um botao de add aqui
