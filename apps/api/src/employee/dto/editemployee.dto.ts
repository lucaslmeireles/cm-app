import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployee } from './createemployee.dto';

export class EditEmployee extends PartialType(CreateEmployee) {}
