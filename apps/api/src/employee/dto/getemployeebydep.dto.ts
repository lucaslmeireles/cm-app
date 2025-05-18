import { IsArray, IsString } from 'class-validator';

export class GetEmployeeByDep {
    @IsArray()
    @IsString({ each: true })
    department_id: string[];
}
