import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [OrgController],
  providers: [OrgService],
  imports: [AbilityModule],
})
export class OrgModule {}
