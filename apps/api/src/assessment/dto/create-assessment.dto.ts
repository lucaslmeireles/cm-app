import { AssessmentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

export class GradeDto {
    @IsUUID()
    metric_id: string;

    @IsInt()
    @Min(0)
    @Max(10)
    score: number;
}

export class CreateAssessmentDto {
    grade: [
        {
            score: number;
            employee_id: string;
            metric_id: string;
        },
    ];
    @IsString()
    employee_id: string;

    @IsString()
    evaluator_id: string;

    @IsEnum(AssessmentStatus)
    status: AssessmentStatus;

    @IsDateString()
    period_start: string;

    @IsDateString()
    period_end: string;

    @IsString()
    @IsOptional()
    comments?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => GradeDto)
    metrics: GradeDto[];
}
