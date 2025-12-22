import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PositionsService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';

@Controller('position')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}
    @Auditable(ResourceType.POSITION)
    @CheckAbilities({ action: Action.Create, subject: 'Position' })
    @Post()
    create(@Body() createPositionDto: CreatePositionDto) {
        return this.positionsService.create(createPositionDto);
    }
    @CheckAbilities({ action: Action.Read, subject: 'Position' })
    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.positionsService.findAll(user);
    }
    @CheckAbilities({ action: Action.Read, subject: 'Position' })
    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.positionsService.findOne(id, user);
    }
    @CheckAbilities({ action: Action.Update, subject: 'Position' })
    @Auditable(ResourceType.POSITION)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePositionDto: UpdatePositionDto,
        @GetUser() user: ReqUser,
    ) {
        return this.positionsService.update(id, updatePositionDto, user);
    }
    @CheckAbilities({ action: Action.Delete, subject: 'Position' })
    @Auditable(ResourceType.POSITION)
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.positionsService.remove(id, user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Position' })
    @Get('employee/:employee_id')
    getHistoryFromEmployee(
        @Param('employee_id') id: string,
        @GetUser() user: ReqUser,
    ) {
        return this.positionsService.getHistoryFromEmployee(id, user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Position' })
    @Get('employee/current/:employee_id')
    getCurrentPosition(
        @Param('employee_id') id: string,
        @GetUser() user: ReqUser,
    ) {
        return this.positionsService.getCurrentPosition(id, user);
    }
}
