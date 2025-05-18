import { CareerStatus } from '@prisma/client';
import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateCarrerDto {
    @IsString()
    employee_id: string;
    @IsDateString()
    start_date: Date;
    @IsDateString()
    target_date: Date;
    @IsString()
    description: string;
    @IsEnum(CareerStatus)
    status: CareerStatus;
}

export class CreateCarrerStepDto {
    @IsString()
    carrer_path_id: string;
    @IsString()
    position_id: string;
    @IsNumber()
    order_number: number;
    @IsBoolean()
    achieved: boolean;
    @IsDateString()
    achieved_date: Date;
    @IsString()
    requirements: string;
}
