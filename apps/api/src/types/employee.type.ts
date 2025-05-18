import { Absence, CareerPath, Formation } from '@prisma/client';

export type EmployeeSanitized = {
    name: string;
    current_position: {
        name: string;
    };
    department: {
        name: string;
    }[];
    entry_date: Date;
    profile_pic?: string;
};

export interface EmployeeSanitizedId extends EmployeeSanitized {
    score: number;
    entry_date: Date;
    formations: Formation[];
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
    }[];

    current_position: {
        name: string;
    };
    manager: {
        name: string;
    };
};
