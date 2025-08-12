import { useState, useEffect, useCallback } from "react";
import { fetchAssessments } from "@/fetch/assessment/fetchAssessments";
import { fetchAssessmentsByEmployee } from "@/fetch/assessment/fetchAssessmentsByEmployee";
// import { postNewAssessment } from '@/fetch/assessment/postNewAssessment';
// import { deleteAssessment } from '@/fetch/assessment/deleteAssesment';

interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Hook personalizado para simular React Query
function useAsyncData<T>(
  queryFn: () => Promise<T>,
  deps: any[] = [],
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro desconhecido"));
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

// Hook para buscar todas as avaliações
export const useAssessments = () => {
  return useAsyncData(() => fetchAssessments(), []);
};

// Hook para buscar avaliações por funcionário
export const useAssessmentsByEmployee = (employeeId: string) => {
  return useAsyncData(
    () => fetchAssessmentsByEmployee({ name: "employee", args: employeeId }),
    [employeeId],
  );
};

// Hook para criar nova avaliação
export const useCreateAssessment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createAssessment = async (assessmentData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      // const result = await postNewAssessment(assessmentData);
      // Aqui você implementaria a criação
      console.log("Criando avaliação:", assessmentData);
      // return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Erro ao criar avaliação");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate: createAssessment,
    isLoading,
    error,
  };
};

// Hook para deletar avaliação
export const useDeleteAssessment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteAssessment = async (assessmentId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // const result = await deleteAssessment(assessmentId);
      console.log("Deletando avaliação:", assessmentId);
      // return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Erro ao deletar avaliação");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate: deleteAssessment,
    isLoading,
    error,
  };
};

// Hook para estatísticas de avaliações
export const useAssessmentStats = (employeeId?: string) => {
  return useAsyncData(async () => {
    const assessments = employeeId
      ? await fetchAssessmentsByEmployee({ name: "employee", args: employeeId })
      : await fetchAssessments();

    if (!assessments || assessments.length === 0) {
      return {
        totalAssessments: 0,
        avgScore: 0,
        lastAssessment: null,
      };
    }

    const totalAssessments = assessments.length;
    const avgScore =
      assessments.reduce((acc: number, assessment: any) => {
        const avgMetricScore =
          assessment.metrics.reduce(
            (sum: number, metric: any) => sum + metric.score,
            0,
          ) / assessment.metrics.length;
        return acc + avgMetricScore;
      }, 0) / totalAssessments;

    const lastAssessment = assessments.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0]?.createdAt;

    return {
      totalAssessments,
      avgScore: Math.round(avgScore),
      lastAssessment: lastAssessment
        ? new Date(lastAssessment).toLocaleDateString("pt-BR")
        : null,
    };
  }, [employeeId]);
};
