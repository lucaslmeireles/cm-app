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
import { MetricsService } from './metric.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { ReqUser } from 'src/types/requser.type';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('metric')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Metric' })
  @Post('')
  create(@Body() createMetricDto: CreateMetricDto, @GetUser() user: ReqUser) {
    return this.metricsService.create(createMetricDto, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Metric' })
  @Get()
  findAll(@GetUser() user: ReqUser) {
    return this.metricsService.findAll(user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Metric' })
  @Get('employee/:id')
  findMetetricByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.metricsService.findMetricsFromEmployee(id, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Metric' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.metricsService.findOne(id, user);
  }

  @CheckAbilities({ action: Action.Update, subject: 'Metric' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMetricDto: UpdateMetricDto,
    @GetUser() user: ReqUser,
  ) {
    return this.metricsService.update(id, updateMetricDto, user);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'Metric' })
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.metricsService.remove(id, user);
  }
}
