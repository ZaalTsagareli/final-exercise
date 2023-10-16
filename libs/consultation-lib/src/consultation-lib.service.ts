import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dtos/create-consultation.dto';
import {
  ConsultationsRepository,
  CountryRepository,
  DoctorTypeRepository,
} from 'libs/repositories';
import { ConsultationsEntity, PatientEntity } from 'libs/database/entities';

@Injectable()
export class ConsultationLibService {
  public constructor(
    private readonly consultationsRepository: ConsultationsRepository,
    private readonly countryRepository: CountryRepository,
    private readonly doctorTypeRepository: DoctorTypeRepository,
  ) {}
  public async createConsultation(
    data: CreateConsultationDto,
    auth: PatientEntity,
  ): Promise<ConsultationsEntity> {
    try {
      const countryExsists = await this.countryRepository.findOneById(
        data.countryId,
      );
      const doctorTypeExsists = await this.doctorTypeRepository.findOneById(
        data.doctorTypeId,
      );
      if (!countryExsists || !doctorTypeExsists) {
        throw new ConflictException(
          'wrong creditionals with country or doctor type',
        );
      }

      const dbObject = this.consultationsRepository.createDatabaseObject(
        auth,
        countryExsists,
        doctorTypeExsists,
        data.pricePerHour,
      );

      return await this.consultationsRepository.save(dbObject);
    } catch (err) {
      throw err;
    }
  }

  public async consultationExsists(
    consultationId: number,
  ): Promise<ConsultationsEntity> {
    return await this.consultationsRepository.findOneById(consultationId);
  }
}
