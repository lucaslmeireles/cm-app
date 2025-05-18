import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AbilityModule } from 'src/ability/ability.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
    providers: [EmployeeService, EncryptionService],
    controllers: [EmployeeController],
    imports: [AbilityModule],
})
export class EmployeeModule {}
