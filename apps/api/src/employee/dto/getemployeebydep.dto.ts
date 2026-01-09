import { IsString } from 'class-validator';

export class GetEmployeeByDep {
  @IsString()
  department_id: string;
}
