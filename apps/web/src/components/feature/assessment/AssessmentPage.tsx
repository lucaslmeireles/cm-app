import { Button } from "@/repo/ui/components/ui/button";
import { PlusCircle, Filter, Download } from "lucide-react";
import { DashboardTemplate } from "../../templates/DashboardTemplate";
import { AssessmentsCard } from "../../ui/organisms/AssessmentsContainer";
import { Card, CardHeader, CardContent } from "@/repo/ui/components/ui/card";
import { Text } from "../../ui/atoms/Text";
import { Badge } from "../../ui/atoms/Badge";
import { Employee } from "@/types/employee.type";

interface AssessmentPageProps {
  employee: Employee;
  stats: {
    totalAssessments: number;
    avgScore: number;
    lastAssessment: string;
  };
}

/**
 * Exemplo de página completa usando o template
 * Esta é uma página específica (Page level) que combina template + organisms
 */
export const AssessmentPage = ({ employee, stats }: AssessmentPageProps) => {
  // Actions do header
  const headerActions = (
    <>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button size="sm">
        <PlusCircle className="mr-2 h-4 w-4" />
        Nova Avaliação
      </Button>
    </>
  );

  // Sidebar com estatísticas
  const sidebar = (
    <div className="space-y-4">
      {/* Card de estatísticas */}
      <Card>
        <CardHeader>
          <Text variant="h4">Estatísticas</Text>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Text variant="caption" color="secondary">
              Total de Avaliações
            </Text>
            <Badge variant="default">{stats.totalAssessments}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <Text variant="caption" color="secondary">
              Pontuação Média
            </Text>
            <Badge variant="success">{stats.avgScore}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <Text variant="caption" color="secondary">
              Última Avaliação
            </Text>
            <Text variant="caption">{stats.lastAssessment}</Text>
          </div>
        </CardContent>
      </Card>

      {/* Card de informações do funcionário */}
      <Card>
        <CardHeader>
          <Text variant="h4">Funcionário</Text>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Text variant="body" weight="medium">
              {employee.name}
            </Text>
            <Text variant="caption" color="secondary">
              {employee.job?.name}
            </Text>
            {employee.department?.[0] && (
              <Badge variant="secondary" size="sm">
                {employee.department[0].name}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardTemplate
      title={`Avaliações - ${employee.name}`}
      subtitle="Gerencie e visualize todas as avaliações do funcionário"
      actions={headerActions}
      sidebar={sidebar}
    >
      {/* Conteúdo principal */}
      <AssessmentsCard employee={employee} />

      {/* Outros organisms poderiam ir aqui */}
      {/* <AssessmentCharts employee={employee} /> */}
      {/* <AssessmentHistory employee={employee} /> */}
    </DashboardTemplate>
  );
};
