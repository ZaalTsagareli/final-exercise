import {
  HidesEntity,
  CountryEntity,
  DoctorTypesEntity,
  PatientEntity,
  DoctorEntity,
} from 'libs/database/entities';
import { BaseRepository } from './abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class HideRepository extends BaseRepository<HidesEntity> {
  private readonly hidesRepo: Repository<HidesEntity>;
  public constructor(
    @InjectRepository(HidesEntity)
    hidesRepo: Repository<HidesEntity>,
  ) {
    super(hidesRepo);
    this.hidesRepo = hidesRepo;
  }

  public async findOneById(id: number): Promise<HidesEntity> {
    return await this.hidesRepo.findOne({
      where: { id: id },
    });
  }

  public async findOneByPatient(patient: PatientEntity): Promise<HidesEntity> {
    return await this.hidesRepo.findOne({
      where: { patient: patient },
    });
  }
  public create(patient: PatientEntity, doctor: DoctorEntity): HidesEntity {
    return this.hidesRepo.create({ patient, doctor });
  }
}
