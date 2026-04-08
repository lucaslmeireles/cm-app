import { AbsenceType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAbsenceDto {
  @IsString()
  employee_id: string;

  @IsString()
  approver_id: string;

  @IsEnum(AbsenceType)
  type: AbsenceType;

  @IsDateString()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  justification?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  status: string;
}
