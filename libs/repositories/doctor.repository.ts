import { DoctorEntity } from 'libs/entities';
import { BaseRepository } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class doctorRepository extends BaseRepository<DoctorEntity> {
  private readonly doctorEntity: Repository<DoctorEntity>;
  public constructor(
    @InjectRepository(DoctorEntity) doctorRepo: Repository<DoctorEntity>,
  ) {
    super(doctorRepo);
    this.doctorEntity = doctorRepo;
  }
}
