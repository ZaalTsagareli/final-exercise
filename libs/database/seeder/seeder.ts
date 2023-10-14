import { CountryEntity, DoctorTypesEntity } from '../entities';
import { countries, doctorTypesList } from '@app/common/data';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryRepository, DoctorTypeRepository } from 'libs/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class Seeder implements OnModuleInit {
  constructor(
    private readonly countryRepo: CountryRepository,
    private readonly doctorTypeRepo: DoctorTypeRepository,
  ) {}

  public async onModuleInit() {
    await this.countryRepo.saveMany(countries);
    await this.doctorTypeRepo.saveMany(doctorTypesList);
  }
}
