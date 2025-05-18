import { Module } from '@nestjs/common';
import { JobsService } from './job.service';
import { JobsController } from './job.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [AbilityModule],
})
export class JobsModule {}
