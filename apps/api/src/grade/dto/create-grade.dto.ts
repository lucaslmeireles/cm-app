import { IsNumber, IsString } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  employee_id: string;

  @IsString()
  metric_id: string;

  @IsNumber()
  score: number;

  @IsString()
  assement_id: string;
}
