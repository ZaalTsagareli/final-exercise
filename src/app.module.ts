import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from 'libs/database';
import { ConsultationsModule } from './consultations/consultations.module';
import { PatientModule } from './patient/patient.module';
import { OffersModule } from './offers/offers.module';
import { CountryEntity, DoctorTypesEntity } from 'libs/database/entities';
import { Seeder } from 'libs/database/seeder/seeder';
import { CountryRepository, DoctorTypeRepository } from 'libs/repositories';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DoctorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CountryEntity, DoctorTypesEntity]),
    ConsultationsModule,
    PatientModule,
    OffersModule,
  ],
  controllers: [],
  providers: [Seeder, CountryRepository, DoctorTypeRepository],
})
export class AppModule {}
