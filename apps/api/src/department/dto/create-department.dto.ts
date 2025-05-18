import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  course_id: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  manager_id: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  employee_id: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  job_id: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  metric_id: string[];
}
