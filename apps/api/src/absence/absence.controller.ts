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
import { AbsencesService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { ReqUser } from 'src/types/requser.type';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('absence')
export class AbsencesController {
    constructor(private readonly absencesService: AbsencesService) {}

    @Auditable(ResourceType.ABSENCE)
    @Post()
    create(@Body() createAbsenceDto: CreateAbsenceDto) {
        return this.absencesService.create(createAbsenceDto);
    }

    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.absencesService.findAll(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absencesService.findOne(id, user);
    }

    //TODO Refactor
    @Get(':id/chart/employee/month')
    chartByEmployeeMonth(@Param('id') id: string) {
        return this.absencesService.chartByEmployeeMonth(id);
    }

    //TODO Refactor
    @Get(':id/chart/employee/year')
    chartByEmployeeYear(@Param('id') id: string) {
        return this.absencesService.chartByEmployeeYear(id);
    }

    @Get(':id/chart/department/month')
    chartByDepartmentMonth(@Param('id') id: string) {
        return this.absencesService.chartByDepartmentMonth(id);
    }

    @Get(':id/chart/department/year')
    chartByDepartmentYear(@Param('id') id: string) {
        return this.absencesService.chartByDepartmentYear(id);
    }

    @Get('employee/:employee_id')
    findAllByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absencesService.findAllByEmployee(id, user);
    }

    @Patch(':id')
    @Auditable(ResourceType.ABSENCE)
    update(
        @Param('id') id: string,
        @Body() updateAbsenceDto: UpdateAbsenceDto,
        @GetUser() user: ReqUser,
    ) {
        return this.absencesService.update(id, updateAbsenceDto, user);
    }

    @Delete(':id')
    @Auditable(ResourceType.ABSENCE)
    remove(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absencesService.remove(id, user);
    }
}
