import { Module } from '@nestjs/common';
import { CountryRepository } from './repositories/country.repository';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorTypeRepository } from './repositories/doctor-type.repository';
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
import { PatientRepository } from './repositories/patient.repository';
import { ConsultationsRepository } from './repositories/consultations.repository';
import { HideRepository } from './repositories/hide.repository';

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
