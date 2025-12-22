import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsencesController } from './absence.controller';
import { AbilityModule } from 'src/ability/ability.module';
import { AbsenceAnalyticsService } from './absence-analytics.service';

@Module({
    controllers: [AbsencesController],
    providers: [AbsenceService, AbsenceAnalyticsService],
    imports: [AbilityModule],
})
export class AbsenceModule {}
