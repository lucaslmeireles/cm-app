import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { CreateDiscDto } from './dto/create-disc.dto';
import { Action } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Assessment' })
  @Auditable(ResourceType.ASSESSMENT)
  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Assessment' })
  @Get()
  findAll(@GetUser() user_id: ReqUser) {
    return this.assessmentService.findAll(user_id);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Assessment' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.assessmentService.findOne(id, user_id);
  }

  //TODO NAO DEIXAR ATUALIZAR NOTA?
  /*@Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentService.update(id, updateAssessmentDto);
  }*/

  @CheckAbilities({ action: Action.Delete, subject: 'Assessment' })
  @Auditable(ResourceType.ASSESSMENT)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.assessmentService.remove(id, user_id);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Assessment' })
  @Get(':id/employee')
  findAllForOneEmployee(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.assessmentService.findAllForOneEmployee(id, user_id);
  }

  @CheckAbilities({ action: Action.Create, subject: 'DISC' })
  @Post('disc/create')
  createDisc(@Body() dto: CreateDiscDto, @GetUser() user: ReqUser) {
    return this.assessmentService.createDisc(dto, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'DISC' })
  @Get('disc/:id')
  findOneDISC(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.assessmentService.findOneDISC(id, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'DISC' })
  @Get('disc/dep/:id')
  findDISCByDepartment(@Param('id') id: string, @GetUser() user: ReqUser) {
    console.log(user);
    return this.assessmentService.findDISCByDepartment(id, user);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'DISC' })
  @Delete('disc/:id')
  removeDISC(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.assessmentService.removeDISC(id, user);
  }
}
