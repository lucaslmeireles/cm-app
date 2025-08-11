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
import { CarrersService } from './carrer.service';
import { CreateCarrerDto, CreateCarrerStepDto } from './dto/create-carrer.dto';
import { UpdateCarrerDto, UpdateCarrerStepDto } from './dto/update-carrer.dto';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { Auditable } from 'src/audit/audit.decorator';
import { ResourceType } from '@prisma/client';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';

//TODO doc swagger
@UseGuards(JwTGuard, AbilityGuard)
@Controller('carrers')
export class CarrersController {
  constructor(private readonly carrersService: CarrersService) {}
  @CheckAbilities({ action: Action.Create, subject: 'CareerPath' })
  @Auditable(ResourceType.CAREER_PATH)
  @Post('path/')
  createPath(@Body() createCarrerDto: CreateCarrerDto) {
    return this.carrersService.createPath(createCarrerDto);
  }
  @CheckAbilities({ action: Action.Read, subject: 'CareerPath' })
  @Get('path/')
  findAll(@GetUser() user: ReqUser) {
    return this.carrersService.findAll(user);
  }
  @CheckAbilities({ action: Action.Read, subject: 'CareerPath' })
  @Get('path/:id')
  findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.carrersService.findOne(id, user);
  }
  @CheckAbilities({ action: Action.Update, subject: 'CareerPath' })
  @Auditable(ResourceType.CAREER_PATH)
  @Patch('path/:id')
  updatePath(
    @Param('id') id: string,
    @Body() updateCarrerDto: UpdateCarrerDto,
    @GetUser() user: ReqUser,
  ) {
    return this.carrersService.updateCarrerPath(id, updateCarrerDto, user);
  }
  @CheckAbilities({ action: Action.Delete, subject: 'CareerPath' })
  @Auditable(ResourceType.CAREER_PATH)
  @Delete('path/:id')
  removePath(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.carrersService.deleteCarrerPath(id, user);
  }
  @CheckAbilities({ action: Action.Create, subject: 'CareerStep' })
  @Auditable(ResourceType.CAREER_STEP)
  @Post('step/')
  createStep(@Body() createCarrerStepDto: CreateCarrerStepDto) {
    return this.carrersService.createPathStep(createCarrerStepDto);
  }
  @CheckAbilities({ action: Action.Update, subject: 'CareerStep' })
  @Auditable(ResourceType.CAREER_STEP)
  @Patch('step/:id')
  update(
    @Param('id') id: string,
    @Body() updateCarrerStepDto: UpdateCarrerStepDto,
    @GetUser() user: ReqUser,
  ) {
    return this.carrersService.updatePathStep(id, updateCarrerStepDto, user);
  }
  @CheckAbilities({ action: Action.Delete, subject: 'CareerStep' })
  @Auditable(ResourceType.CAREER_STEP)
  @Delete('step/:id')
  remove(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.carrersService.deletePathStep(id, user);
  }
}
