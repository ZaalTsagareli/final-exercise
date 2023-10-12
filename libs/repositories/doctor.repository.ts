import { DoctorEntity } from 'libs/entities';
import { BaseRepository } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from '@app/doctor-lib/dtos';

export class DoctorRepository extends BaseRepository<DoctorEntity> {
  private readonly doctorEntity: Repository<DoctorEntity>;
  public constructor(
    @InjectRepository(DoctorEntity) doctorRepo: Repository<DoctorEntity>,
  ) {
    super(doctorRepo);
    this.doctorEntity = doctorRepo;
  }

  public create(data: CreateDoctorDto): DoctorEntity {
    return this.doctorEntity.create(data);
  }

  public async findOneByEmail(email: string): Promise<DoctorEntity> {
    return await this.doctorEntity.findOneBy({ email: email });
  }
  public async findOneById(id: number): Promise<DoctorEntity> {
    try {
      return await this.doctorEntity.findOne({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }
}
