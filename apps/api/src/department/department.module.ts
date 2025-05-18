import { Module } from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { DepartmentsController } from './department.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [AbilityModule],
})
export class DepartmentsModule {}
