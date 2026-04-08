import { PartialType } from '@nestjs/swagger';
import { CreateCarrerDto, CreateCarrerStepDto } from './create-carrer.dto';

export class UpdateCarrerDto extends PartialType(CreateCarrerDto) {}

export class UpdateCarrerStepDto extends PartialType(CreateCarrerStepDto) {}
