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
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}
    @CheckAbilities({ action: Action.Create, subject: 'Grade' })
    @Post('')
    create(@Body() createGradeDto: CreateGradeDto) {
        return this.gradeService.create(createGradeDto);
    }
    @CheckAbilities({ action: Action.Read, subject: 'Grade' })
    @Get()
    findAll(@GetUser() user: ReqUser) {
        return this.gradeService.findAll(user);
    }
    @CheckAbilities({ action: Action.Read, subject: 'Grade' })
    @Get('employee/:id')
    findAllGradesByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.gradeService.findAllGradesByEmployee(user, id);
    }
    
    @CheckAbilities({ action: Action.Read, subject: 'Grade' })
    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.gradeService.findOne(id, user);
    }
    @CheckAbilities({ action: Action.Update, subject: 'Grade' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateGradeDto: UpdateGradeDto,
        @GetUser() user: ReqUser,
    ) {
        return this.gradeService.updateGrade(id, updateGradeDto, user);
    }
    @CheckAbilities({ action: Action.Delete, subject: 'Grade' })
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: ReqUser) {
        return this.gradeService.removeGrade(id, user);
    }
}
