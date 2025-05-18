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
import { JobsService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ReqUser } from 'src/types/requser.type';
import { Action } from 'src/ability/ability.factory';
import { JwTGuard } from 'src/auth/guards/jwt.guard';
import { AbilityGuard } from 'src/ability/abilities.guard';

@UseGuards(JwTGuard, AbilityGuard)
@Controller('job')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @CheckAbilities({ action: Action.Create, subject: 'Job' })
  @Post('')
  create(@Body() createJobDto: CreateJobDto, @GetUser() user: ReqUser) {
    return this.jobsService.createJob(user, createJobDto);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Job' })
  @Get('')
  getAllJobs(@GetUser() user: ReqUser) {
    return this.jobsService.getAllJobs(user);
  }

  @CheckAbilities({ action: Action.Read, subject: 'Job' })
  @Get(':id')
  getJobById(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.jobsService.getJobById(user, id);
  }
  
  @CheckAbilities({ action: Action.Update, subject: 'Job' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @GetUser() user: ReqUser,
  ) {
    return this.jobsService.updateJob(user, updateJobDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: ReqUser) {
    return this.jobsService.deleteJobById(user, id);
  }
}
