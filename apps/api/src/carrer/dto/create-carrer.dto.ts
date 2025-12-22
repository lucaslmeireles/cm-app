import { CareerStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarrerDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;
  @IsDateString()
  @IsNotEmpty()
  target_date: Date;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsEnum(CareerStatus)
  @IsNotEmpty()
  status: CareerStatus;
}

export class CreateCarrerStepDto {
  @IsString()
  @IsNotEmpty()
  carrer_path_id: string;
  @IsString()
  @IsNotEmpty()
  position_id: string;
  @IsNumber()
  @IsNotEmpty()
  order_number: number;
  @IsBoolean()
  @IsNotEmpty()
  achieved: boolean;
  @IsDateString()
  @IsNotEmpty()
  achieved_date: Date;
  @IsString()
  @IsOptional()
  requirements: string;
}
