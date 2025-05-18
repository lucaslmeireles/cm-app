import { fetchMetrics } from "@/fetch/metric/fetchMetrics";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Metric } from "@/types/metric.type";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AddMetric } from "./addMetrics";

export const MetricsCard = async ({}) => {
  const t = await getTranslations("Metrics");
  const metrics: Metric[] = await fetchMetrics();

  if (!metrics) {
    return (
      <Card className="min-w-56 w-72 max-w-96">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p>Sem dados</p>
          <AddMetric />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {metrics.length > 0 ? (
          metrics.slice(0, 4).map((metric) => {
            return (
              <Card className="border" key={metric.id}>
                <div className="m-2 flex justify-between">
                  <div>
                    <h3 className="font-medium">{metric.name}</h3>
                    <p className="text-sm text-slate-600">{metric.type}</p>
                    <p>Weight: {metric.weight}</p>
                  </div>
                  {/* #TODO MUDAR, ACHAR OUTRA FORMA */}
                </div>
              </Card>
            );
          })
        ) : (
          <p>{t("no_metrics")}</p>
        )}
        <Button size="sm" className="mt-2 w-4/12">
          <Link href={"/metrics"}>{t("see_more")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
