import {
  ConsultationsEntity,
  CountryEntity,
  DoctorTypesEntity,
  PatientEntity,
} from 'libs/database/entities';
import { BaseRepository } from './abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsultationDto } from '@app/consultation-lib/dtos/create-consultation.dto';

export class ConsultationsRepository extends BaseRepository<ConsultationsEntity> {
  private readonly consultationsRepo: Repository<ConsultationsEntity>;
  public constructor(
    @InjectRepository(ConsultationsEntity)
    doctorRepo: Repository<ConsultationsEntity>,
  ) {
    super(doctorRepo);
    this.consultationsRepo = doctorRepo;
  }

  public async findOneById(id: number): Promise<ConsultationsEntity> {
    return await this.consultationsRepo.findOne({
      where: { id: id },
      relations: { country: true, doctorType: true },
    });
  }

  public async findOneByPatientId(
    patient: PatientEntity,
  ): Promise<ConsultationsEntity> {
    return await this.consultationsRepo.findOne({
      where: { patient: patient },
    });
  }

  public createDatabaseObject(
    patient: PatientEntity,
    country: CountryEntity,
    typeDoctor: DoctorTypesEntity,
    pricePerHour: number,
  ): ConsultationsEntity {
    return this.consultationsRepo.create({
      patient,
      country,
      doctorType: typeDoctor,
      pricePerHour: pricePerHour,
    });
  }
}
