import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrgService } from './org.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
//TODO Revisar esse controller
@UseGuards(JwTGuard, AbilityGuard)
@Controller('org')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}

    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.orgService.findAll(user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Organization' })
    @Get('info')
    async getInfo(@GetUser() user: ReqUser) {
        return await this.orgService.listInfo(user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Organization' })
    @Get('rank')
    async getRank(@GetUser() user: ReqUser) {
        return await this.orgService.getRankedEmployee(user);
    }

    @Get('chart')
    async getAllChart() {
        return await this.orgService.getAllChart();
    }

    @Get('chart/employee/:id')
    async getEmployeeChart(@Param('id') id: string) {
        return await this.orgService.getEmployeeChart(id);
    }

    @Get('chart/department/:id')
    async getDepartmentChart(@Param('id') id: string) {
        return await this.orgService.getDepartmentChart(id);
    }

    @Get('chart/manager/:id')
    async getManagerChart(@Param('id') id: string) {
        return await this.orgService.getSupervisorChart(id);
    }

    @Get('chart/employees')
    async getEmployeeCountByDepartmentChart() {
        return await this.orgService.getEmployeeCountByDepartment();
    }
}
