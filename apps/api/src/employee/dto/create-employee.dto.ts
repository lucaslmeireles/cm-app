import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployee {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
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
