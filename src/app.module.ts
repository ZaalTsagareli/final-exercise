import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from 'libs/database';
import { ConsultationsModule } from './consultations/consultations.module';
import { PatientModule } from './patient/patient.module';
import { Seeder } from 'libs/database/seeder/seeder';
import { RepositoriesModule } from 'libs/repositories-lib';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    RepositoriesModule,
    ConsultationsModule,
    PatientModule,
    DoctorModule,
  ],
  controllers: [],
  providers: [Seeder],
})
export class AppModule {}
