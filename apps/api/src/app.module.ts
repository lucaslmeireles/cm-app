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
import { EvaluationModule } from './evaluation/evaluation.module';
import { DepartmentsModule } from './department/department.module';
import { EducationsModule } from './education/education.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PositionsModule } from './position/position.module';
import { CarrersModule } from './carrer/carrer.module';
import { AuditModule } from './audit/audit.module';
import { AuditInterceptor } from './audit/audit.interceptor';
import { EncryptionModule } from './encryption/encryption.module';
import { AbsenceModule } from './absence/absence.module';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    EmployeeModule,
    UserModule,
    DbModule,
    EmployeeModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 3600,
    }),
    AuthModule,
    EncryptionModule,
    AbilityModule,
    EvaluationModule,
    OrgModule,
    MetricsModule,
    GradeModule,
    DepartmentsModule,
    EducationsModule,
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
