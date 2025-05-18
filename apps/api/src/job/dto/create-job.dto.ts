import { IsArray, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  name: string;
  @IsString()
  type: 'WhiteCollar' | 'BlueCollar';
  @IsArray()
  @IsString({ each: true })
  metric_id: string[];
  @IsArray()
  @IsString({ each: true })
  department_id: string[];
}
