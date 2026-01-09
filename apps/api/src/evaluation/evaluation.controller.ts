import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
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
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Evaluation' })
  @Auditable(ResourceType.EVALUATION)
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    console.log(createEvaluationDto);
    return this.evaluationService.create(createEvaluationDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Evaluation' })
  @Get()
  findAll(@GetUser() user_id: ReqUser) {
    return this.evaluationService.findAll(user_id);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Evaluation' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.evaluationService.findOne(id, user_id);
  }

  //TODO NAO DEIXAR ATUALIZAR NOTA?
  /*@Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(id, updateEvaluationDto);
  }*/

  @CheckAbilities({ action: Action.Delete, subject: 'Evaluation' })
  @Auditable(ResourceType.EVALUATION)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.evaluationService.remove(id, user_id);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Evaluation' })
  @Get(':id/employee')
  findAllForOneEmployee(@Param('id') id: string, @GetUser() user_id: ReqUser) {
    return this.evaluationService.findAllForOneEmployee(id, user_id);
  }

  @CheckAbilities({ action: Action.Create, subject: 'DISC' })
  @Post('disc/create')
  createDisc(@Body() dto: CreateDiscDto, @GetUser() user: ReqUser) {
    return this.evaluationService.createDisc(dto, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'DISC' })
  @Get('disc/:id')
  findOneDISC(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.evaluationService.findOneDISC(id, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'DISC' })
  @Get('disc/dep/:id')
  findDISCByDepartment(@Param('id') id: string, @GetUser() user: ReqUser) {
    console.log(user);
    return this.evaluationService.findDISCByDepartment(id, user);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'DISC' })
  @Delete('disc/:id')
  removeDISC(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.evaluationService.removeDISC(id, user);
  }
}
