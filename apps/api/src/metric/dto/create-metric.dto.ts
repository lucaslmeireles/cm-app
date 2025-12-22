import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  name: string;

  @IsEnum(['HardSkill', 'SoftSkill'])
  type: 'HardSkill' | 'SoftSkill';

  @IsNumber()
  weight: number;
}
