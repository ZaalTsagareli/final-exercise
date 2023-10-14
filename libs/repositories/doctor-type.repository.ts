import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from './abstract.repository';
import { HelperService } from '@app/common/utils/helper.service';
import { DoctorTypesEntity } from 'libs/database/entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DoctorTypeRepository extends BaseRepository<DoctorTypesEntity> {
  private readonly doctorTypeRepo: Repository<DoctorTypesEntity>;
  public constructor(
    @InjectRepository(DoctorTypesEntity)
    doctorRepo: Repository<DoctorTypesEntity>,
  ) {
    super(doctorRepo);
    this.doctorTypeRepo = doctorRepo;
  }

  public async saveMany(
    item: DoctorTypesEntity[],
  ): Promise<DoctorTypesEntity[]> {
    return await this.doctorTypeRepo.save(item);
  }
  public async findOneById(id: number): Promise<DoctorTypesEntity> {
    return await this.doctorTypeRepo.findOne({ where: { id: id } });
  }
}
