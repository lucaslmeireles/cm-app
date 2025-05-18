export class CreatePositionDto {
    name: string;
    job_id: string;
    department_id: string;
    level: number;
    requirements: string;
    is_active: boolean;
    max_slots: number;
    employees?: { id: string }[];
}
