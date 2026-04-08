import { Module } from '@nestjs/common';
import { PositionsService } from './position.service';
import { PositionsController } from './position.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService],
    imports: [AbilityModule],
})
export class PositionsModule {}
