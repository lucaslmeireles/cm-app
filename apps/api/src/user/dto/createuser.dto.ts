import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateUser {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsUUID()
    role: string;
    @IsNumber()
    tenant_id: number;
    @IsUUID()
    @IsOptional()
    employee_id: string;
}
