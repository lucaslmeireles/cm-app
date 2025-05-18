import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [GradeController],
  providers: [GradeService],
  imports : [AbilityModule]
})
export class GradeModule {}
