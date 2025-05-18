import {
    IsArray,
    IsDateString,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEmployee {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    register: string;

    @IsNumber()
    @IsOptional()
    score: number;

    @IsDateString({ strict: true })
    birthday: Date;

    @IsDateString({ strict: true })
    entry_date: Date;

    @IsString()
    @IsOptional()
    profile_pic: string;

    @IsArray()
    @IsString({ each: true })
    departments: string[];

    @IsString()
    @IsOptional()
    manager_id: string;

    @IsNumber()
    @IsOptional()
    tenant_id: number;

    @IsString()
    @IsOptional()
    position: string;
}
