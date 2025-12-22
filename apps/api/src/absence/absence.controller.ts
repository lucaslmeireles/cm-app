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
import { Action } from 'src/ability/ability.factory';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { ReqUser } from 'src/types/requser.type';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { AbsenceAnalyticsService } from './absence-analytics.service';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('absence')
export class AbsencesController {
    constructor(private readonly absenceService: AbsenceService, private readonly absenceAnalyticsService: AbsenceAnalyticsService ) {}

    @CheckAbilities({ action: Action.Create, subject: 'Absence' })
    @Auditable(ResourceType.ABSENCE)
    @Post()
    create(@Body() createAbsenceDto: CreateAbsenceDto) {
        return this.absenceService.create(createAbsenceDto);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.absenceService.findAll(user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absenceService.findOne(id, user);
    }

    //TODO Refactor
    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get(':id/chart/employee/month')
    chartByEmployeeMonth(@Param('id') id: string) {
        return this.absenceAnalyticsService.chartByEmployeeMonth(id);
    }

    //TODO Refactor
    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get(':id/chart/employee/year')
    chartByEmployeeYear(@Param('id') id: string) {
        return this.absenceAnalyticsService.chartByEmployeeYear(id);
    }
    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get(':id/chart/department/month')
    chartByDepartmentMonth(@Param('id') id: string) {
        return this.absenceAnalyticsService.chartByDepartmentMonth(id);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get(':id/chart/department/year')
    chartByDepartmentYear(@Param('id') id: string) {
        return this.absenceAnalyticsService.chartByDepartmentYear(id);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Absence' })
    @Get('employee/:employee_id')
    findAllByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absenceService.findAllByEmployee(id, user);
    }

    @CheckAbilities({ action: Action.Update, subject: 'Absence' })
    @Auditable(ResourceType.ABSENCE)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAbsenceDto: UpdateAbsenceDto,
        @GetUser() user: ReqUser,
    ) {
        return this.absenceService.update(id, updateAbsenceDto, user);
    }

    @CheckAbilities({ action: Action.Delete, subject: 'Absence' })
    @Delete(':id')
    @Auditable(ResourceType.ABSENCE)
    remove(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.absenceService.remove(id, user);
    }
}
