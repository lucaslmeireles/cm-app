"use client";
import { fetchRecentHires } from "@/fetch/employee/fetchRecentHires";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import useSWR from "swr";
import ErrorMessage from "../errorPage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function RecentHires() {
  const {
    data: recentHires,
    isLoading,
    error,
  } = useSWR<Employee, Error>("employee/recent/hire", fetchRecentHires);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message="not found" />;
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Contratações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentHires?.data.map((hire, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{hire.name}</p>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(hire.entry_date), "P", { locale: ptBR })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
