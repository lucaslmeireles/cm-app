import { Absence, CareerPath, Education } from '@prisma/client';

export type EmployeeSanitized = {
  name: string;
  position: {
    name: string;
  };
  department: {
    name: string;
  };
  entry_date: Date;
  profile_pic?: string;
};

export interface EmployeeSanitizedId extends EmployeeSanitized {
  score: number;
  entry_date: Date;
  educations: Education[];
  career_paths: CareerPath[];
  approved_absences: Absence[];
}

export interface EmployeeSanitizedManager extends EmployeeSanitized {
  entry_date: Date;
  email: string;
}

export type EmployeeSanitizedDepartment = {
  name: string;
  register: string;
  department: {
    name: string;
  };

  position: {
    name: string;
  };
  manager: {
    name: string;
  };
};
