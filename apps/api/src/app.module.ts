import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config/dist';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { OrgModule } from './org/org.module';
import { MetricsModule } from './metric/metric.module';
import { GradeModule } from './grade/grade.module';
import { EvaluationModule } from './assessment/evaluation.module';
import { DepartmentsModule } from './department/department.module';
import { JobsModule } from './job/job.module';
import { FormationsModule } from './education/education.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PositionsModule } from './position/position.module';
import { CarrersModule } from './carrer/carrer.module';
import { AuditModule } from './audit/audit.module';
import { AuditInterceptor } from './audit/audit.interceptor';
import { EncryptionModule } from './encryption/encryption.module';
import { AbsenceModule } from './absence/absence.module';

@Module({
  imports: [
    EmployeeModule,
    UserModule,
    DbModule,
    EmployeeModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    EncryptionModule,
    AbilityModule,
    EvaluationModule,
    OrgModule,
    MetricsModule,
    GradeModule,
    DepartmentsModule,
    JobsModule,

    FormationsModule,
    AbsenceModule,
    PositionsModule,
    CarrersModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
