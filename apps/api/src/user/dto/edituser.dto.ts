import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class EditUser {
    @IsEmail()
    @IsOptional()
    email: string;
    @IsString()
    @IsOptional()
    password: string;
    @IsUUID()
    @IsOptional()
    role: string;
    @IsNumber()
    @IsOptional()
    tenant_id: number;
    @IsUUID()
    @IsOptional()
    employee_id: string;
    @IsUUID()
    id: string;
}
