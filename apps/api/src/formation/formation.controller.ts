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
import { FormationsService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';

//TODO colocar auditable

@UseGuards(JwTGuard, AbilityGuard)
@Controller('formation')
export class FormationsController {
    constructor(private readonly formationsService: FormationsService) {}

    @CheckAbilities({ action: Action.Create, subject: 'Formation' })
    @Post()
    create(@Body() createFormationDto: CreateFormationDto) {
        return this.formationsService.create(createFormationDto);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Formation' })
    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.formationsService.findAll(user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Formation' })
    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.formationsService.findOne(id, user);
    }

    @CheckAbilities({ action: Action.Read, subject: 'Formation' })
    @Get(':id/employee')
    findALlByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.formationsService.findAllByEmployee(id, user);
    }

    @CheckAbilities({ action: Action.Update, subject: 'Formation' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateFormationDto: UpdateFormationDto,
        @GetUser() user: ReqUser,
    ) {
        return this.formationsService.update(id, updateFormationDto, user);
    }

    @CheckAbilities({ action: Action.Delete, subject: 'Formation' })
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.formationsService.remove(id, user);
    }
}
