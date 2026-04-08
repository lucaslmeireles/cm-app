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
import { EducationsService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/ability.factory';

//TODO colocar auditable

@UseGuards(JwTGuard, AbilityGuard)
@Controller('education')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Education' })
  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationsService.create(createEducationDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Education' })
  @Get()
  findAll(@GetUser() user: ReqUser) {
    return this.educationsService.findAll(user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Education' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.educationsService.findOne(id, user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Education' })
  @Get(':id/employee')
  findALlByEmployee(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.educationsService.findAllByEmployee(id, user);
  }

  @CheckAbilities({ action: Action.Update, subject: 'Education' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
    @GetUser() user: ReqUser,
  ) {
    return this.educationsService.update(id, updateEducationDto, user);
  }

  @CheckAbilities({ action: Action.Delete, subject: 'Education' })
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.educationsService.remove(id, user);
  }
}
