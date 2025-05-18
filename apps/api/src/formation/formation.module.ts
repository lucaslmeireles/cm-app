import { Module } from '@nestjs/common';
import { FormationsService } from './formation.service';
import { FormationsController } from './formation.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [FormationsController],
  providers: [FormationsService],
  imports: [AbilityModule],
})
export class FormationsModule {}
