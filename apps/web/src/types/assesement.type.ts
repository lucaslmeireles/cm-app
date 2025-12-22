import { number, string } from "zod";
import { Employee } from "./employee.type";

export type Assessment = {
  id: string;
  employee_id: string;
  evaluator_id: string;
  status: string;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
  comments?: string;
  metrics: MetricsWithGrade[];
  evaluator: {
    name: string;
    department: string;
  };
};

export type MetricsWithGrade = {
  score: number;
  metric: {
    name: string;
  };
};
