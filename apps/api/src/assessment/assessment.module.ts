import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService],
  imports: [AbilityModule],
})
export class AssessmentModule {}
