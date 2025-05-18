import { Employee } from "./employee.type";
import { Job } from "./job.type";
import { Manager } from "./manager.type";

export type Department = {
  id: string;
  name: string;
  tenant_id: number;
  _count?: {
    courses: number;
    managers: number;
    employees: number;
    jobs: number;
    metrics: number;
    roles_id: number;
  };
  employees?: Employee[]
  managers?: Manager[]
  jobs: Job[],
  average_score?: number
};
