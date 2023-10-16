import { countries, doctorTypesList } from '@app/common/data';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CountryRepository, DoctorTypeRepository } from 'libs/repositories-lib';

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
