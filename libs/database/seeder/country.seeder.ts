import { CountryEntity } from '../entities';
import { countries } from '@app/common/data';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountrySeeder implements OnModuleInit {
  private readonly countryRepo: Repository<CountryEntity>;

  constructor(
    @InjectRepository(CountryEntity) countryRepo: Repository<CountryEntity>,
  ) {
    this.countryRepo = countryRepo;
  }

  public async onModuleInit() {
    await this.countryRepo.save(countries);
  }
}
