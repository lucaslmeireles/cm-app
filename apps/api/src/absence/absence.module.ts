import { Module } from '@nestjs/common';
import { AbsencesService } from './absence.service';
import { AbsencesController } from './absence.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    controllers: [AbsencesController],
    providers: [AbsencesService],
    imports: [AbilityModule],
})
export class AbsencesModule {}
