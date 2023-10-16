import { PatientEntity } from 'libs/database/entities';
import { BaseRepository } from './abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from '@app/patient-lib/dtos';

export class PatientRepository extends BaseRepository<PatientEntity> {
  private readonly patientRepo: Repository<PatientEntity>;
  public constructor(
    @InjectRepository(PatientEntity)
    doctorRepo: Repository<PatientEntity>,
  ) {
    super(doctorRepo);
    this.patientRepo = doctorRepo;
  }

  public async findOneByEmail(email: string): Promise<PatientEntity> {
    return await this.patientRepo.findOne({ where: { email: email } });
  }
  public createDatabaseObject(data: CreatePatientDto): PatientEntity {
    return this.patientRepo.create(data);
  }

  public async getUserById(id: number): Promise<PatientEntity> {
    return await this.patientRepo.findOne({ where: { id: id } });
  }
}
