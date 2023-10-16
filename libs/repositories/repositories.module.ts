import { Module } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { DoctorRepository } from './doctor.repository';
import { DoctorTypeRepository } from './doctor-type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConsultationsEntity,
  CountryEntity,
  DoctorEntity,
  DoctorTypesEntity,
  HidesEntity,
  PatientEntity,
} from 'libs/database/entities';
import { HelperService } from '@app/common/utils/helper.service';
import { PatientRepository } from './patient.repository';
import { ConsultationsRepository } from './consultations.repository';
import { HideRepository } from './hide.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryEntity,
      DoctorEntity,
      DoctorTypesEntity,
      PatientEntity,
      ConsultationsEntity,
      HidesEntity,
    ]),
  ],
  providers: [
    CountryRepository,
    DoctorRepository,
    DoctorTypeRepository,
    HelperService,
    PatientRepository,
    ConsultationsRepository,
    HideRepository,
  ],
  exports: [
    CountryRepository,
    DoctorRepository,
    DoctorTypeRepository,
    ConsultationsRepository,
    PatientRepository,
    HideRepository,
  ],
})
export class RepositoriesModule {}
