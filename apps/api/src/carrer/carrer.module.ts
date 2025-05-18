import { Module } from '@nestjs/common';
import { CarrersService } from './carrer.service';
import { CarrersController } from './carrer.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
    controllers: [CarrersController],
    providers: [CarrersService],
    imports: [AbilityModule],
})
export class CarrersModule {}
