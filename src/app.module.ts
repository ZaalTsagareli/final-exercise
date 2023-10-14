import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from 'libs/database';
import { ConsultationsModule } from './consultations/consultations.module';
import { PatientModule } from './patient/patient.module';
import { OffersModule } from './offers/offers.module';
import { CountrySeeder } from 'libs/database/seeder/country.seeder';
import { CountryEntity } from 'libs/database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DoctorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CountryEntity]),
    ConsultationsModule,
    PatientModule,
    OffersModule,
  ],
  controllers: [],
  providers: [CountrySeeder],
})
export class AppModule {}
