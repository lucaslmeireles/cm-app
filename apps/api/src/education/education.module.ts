import { Module } from '@nestjs/common';
import { EducationsService } from './education.service';
import { EducationsController } from './education.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [EducationsController],
  providers: [EducationsService],
  imports: [AbilityModule],
})
export class EducationsModule {}
