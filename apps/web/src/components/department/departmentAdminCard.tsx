import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { calculateTendency } from "@/helpers/calculateTendency";
import { getRandomColor } from "@/helpers/randomColor";
import { Badge } from "@/repo/ui/components/ui/badge";
import { Button } from "@/repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/repo/ui/components/ui/card";
import { Skeleton } from "@/repo/ui/components/ui/skeleton";
import { Department } from "@/types/department.type";
import { BarChart, Briefcase, ChevronRight, ClipboardCheck, Target, TrendingUp, Users } from "lucide-react";
import useSWR from "swr";
import Link from "next/link"

export default function DepartmentsAdmin() {
    const {
        data: departments,
        isLoading,
        error
    } = useSWR("departments", fetchDepartments)

    return isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300" />
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>)  : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className={`overflow-hidden transition-all hover:shadow-lg`}>
            <div className={`h-2 bg-gradient-to-r ${getRandomColor()}`} />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">{dept._count?.employes} Funcionários</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">{dept._count?.jobs} Cargos</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Tendência: {calculateTendency(dept.average_score)}</span>
                </div>
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Média: {dept.average_score}</span>
                </div>
              </div>
              
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href={`/departments/${dept.id}`}>
                  Ver detalhes do departamento
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }