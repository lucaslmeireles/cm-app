import { Module } from '@nestjs/common';
import { MetricsService } from './metric.service';
import { MetricsController } from './metric.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  imports: [AbilityModule],
})
export class MetricsModule {}
