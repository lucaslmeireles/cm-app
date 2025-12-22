import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscDto {

    @IsNumber()
    D: number;

    @IsNumber()
    I: number;

    @IsNumber()
    S: number;

    @IsNumber()
    C: number;

    @IsString()
    employee_id: string;
}
