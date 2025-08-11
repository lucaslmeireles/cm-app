import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployee } from './create-employee.dto';

export class EditEmployee extends PartialType(CreateEmployee) {}
