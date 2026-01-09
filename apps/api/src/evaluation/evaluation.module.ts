import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService],
  imports: [AbilityModule],
})
export class EvaluationModule {}
