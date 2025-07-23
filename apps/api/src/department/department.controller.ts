import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ReqUser } from 'src/types/requser.type';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ResourceType } from '@prisma/client';
import { Auditable } from 'src/audit/audit.decorator';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('department')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Department' })
  @Auditable(ResourceType.DEPARTMENT)
  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @GetUser() user: ReqUser,
  ) {
    return this.departmentsService.createDepartment(user, createDepartmentDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Department' })
  @Get()
  findAll(@GetUser() user: ReqUser) {
    return this.departmentsService.findAllDepartments(user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Department' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.departmentsService.findOneDepartment(id, user);
  }

  @CheckAbilities({ action: Action.Update, subject: 'Department' })
  @Auditable(ResourceType.DEPARTMENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @GetUser() user: ReqUser,
  ) {
    return this.departmentsService.updateDepartment(
      id,
      user,
      updateDepartmentDto,
    );
  }

  @CheckAbilities({ action: Action.Delete, subject: 'Department' })
  @Auditable(ResourceType.DEPARTMENT)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.departmentsService.removeDepartment(id, user);
  }
}
