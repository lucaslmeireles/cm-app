import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployee, EditEmployee } from './dto';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { ReqUser } from 'src/types/requser.type';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { GetEmployeeByDep } from './dto/getemployeebydep.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/multer-config';
import { Request } from 'express';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('employee')
export class EmployeeController {
    constructor(private EmployeeService: EmployeeService) {}

   
    @CheckAbilities({ action: Action.Read, subject: 'Employee' })
    @Get('')
    getAll(@GetUser() user: ReqUser) {
        return this.EmployeeService.getAllemployees(user);
    }

   
    @Post('department')
    @CheckAbilities({ action: Action.Read, subject: 'Employee' })
    getEmployeeByDepartment(
        @Body() dto: GetEmployeeByDep,
        @GetUser() user: ReqUser,
    ) {
        console.log(dto);
        return this.EmployeeService.getEmployeeByDepartment(dto, user);
    }


    @Get('recent-hires')
    getRecentHires(@GetUser() user: ReqUser) {
        return this.EmployeeService.recentHires(user);
    }

    
    @Get('manager')
    @CheckAbilities({ action: Action.Read, subject: 'Employee' })
    getEmployeeByManager(@GetUser() user: ReqUser) {
        return this.EmployeeService.getEmployeeByManager(user);
    }

    @UseInterceptors(FileInterceptor('profile', multerConfig))
    @Post(':id/image')
    attachImage(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request,
        @Param('id') id: string,
    ) {
        return this.EmployeeService.attachImage(file, req, id);
    }


    @Post('')
    @Auditable(ResourceType.EMPLOYEE)
    @CheckAbilities({ action: Action.Create, subject: 'Employee' })
    createEmployee(@Body() dto: CreateEmployee, @GetUser() user: ReqUser) {
        return this.EmployeeService.createEmployee(dto, user);
    }
    
    @Get(':id')
    @CheckAbilities({ action: Action.Read, subject: 'Employee' })
    getEmployeeById(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.EmployeeService.getEmployeeById(id, user);
    }


    @Patch(':id')
    @CheckAbilities({ action: Action.Update, subject: 'Employee' })
    @Auditable(ResourceType.EMPLOYEE)
    editEmployeeById(
        @Param('id') id: string,
        @Body() dto: EditEmployee,
        @GetUser() user: ReqUser,
    ) {
        return this.EmployeeService.editEmployeeById(id, user, dto);
    }

    @Delete(':id')
    @Auditable(ResourceType.EMPLOYEE)
    @CheckAbilities({ action: Action.Delete, subject: 'Employee' })
    deleteEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.EmployeeService.deleteEmployee(id, user);
    }
}
