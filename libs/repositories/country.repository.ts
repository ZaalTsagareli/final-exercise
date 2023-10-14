import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from './abstract.repository';
import { CountryEntity } from 'libs/database/entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryRepository extends BaseRepository<CountryEntity> {
  private readonly countryRepo: Repository<CountryEntity>;
  public constructor(
    @InjectRepository(CountryEntity)
    doctorRepo: Repository<CountryEntity>,
  ) {
    super(doctorRepo);
    this.countryRepo = doctorRepo;
  }

  public async saveMany(items: CountryEntity[]): Promise<CountryEntity[]> {
    return await this.countryRepo.save(items);
  }
  public async findOneById(id: number): Promise<CountryEntity> {
    return await this.countryRepo.findOne({ where: { id: id } });
  }
}
