import {
  ConsultationsEntity,
  DoctorEntity,
  HidesEntity,
  PatientEntity,
} from 'libs/database/entities';
import { BaseRepository } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from '@app/doctor-lib/dtos';
import { HelperService } from '@app/common/utils/helper.service';
import { PatientRequestInterface } from '@app/common/interfaces';

export class DoctorRepository extends BaseRepository<DoctorEntity> {
  private readonly doctorEntity: Repository<DoctorEntity>;

  public constructor(
    private readonly helperService: HelperService,
    @InjectRepository(DoctorEntity) doctorRepo: Repository<DoctorEntity>,
  ) {
    super(doctorRepo);
    this.doctorEntity = doctorRepo;
  }

  public create(data: CreateDoctorDto): DoctorEntity {
    const obj = this.doctorEntity.create(data);
    obj.createdAt = this.helperService.datetime();
    obj.updatedAt = this.helperService.datetime();
    obj.verified = true;
    return obj;
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

  public async getTheMostRelevantDoctors(
    consultation: ConsultationsEntity,
  ): Promise<DoctorEntity[]> {
    const relevantDoctors = await this.doctorEntity
      .createQueryBuilder('doctor')
      .select([
        'doctor.id',
        'doctor.firstName',
        'doctor.lastName',
        'doctor.gender',
        'doctor.email',
        'doctor.pricePerHour',
        'doctor.createdAt',
      ])
      .leftJoinAndSelect('doctor.country', 'country')
      .leftJoinAndSelect('doctor.type', 'type')

      .where('doctor.type_id = :type', { type: consultation.doctorType.id })
      .andWhere('doctor.country_id = :country', {
        country: consultation.country.id,
      })
      .andWhere('doctor.price_per_hour >= :minPrice', {
        minPrice: consultation.pricePerHour - 100,
      })
      .orWhere('doctor.price_per_hour <= :maxPrice', {
        maxPrice: consultation.pricePerHour + 100,
      })
      .take(10)
      .getMany();

    return relevantDoctors;
  }
}
