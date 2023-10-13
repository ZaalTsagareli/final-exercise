import { DoctorEntity } from 'libs/entities';
import { BaseRepository } from '.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from '@app/doctor-lib/dtos';
import { HelperService } from '@app/common/utils/helper.service';

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
}
